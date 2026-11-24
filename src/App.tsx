import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { categories, filterProducts, formatPrice, products, type Category } from './data';
import { ProductCard } from './ProductCard';
import { Badge, Button, Card, Grid, Input, Skeleton } from './ui';
import { dark, light } from './theme';
import { useTheme } from './useTheme';
import { GlobalStyle } from './GlobalStyle';

const Page = styled.div`
  max-width: 1280px;
  padding: 0 24px;
  margin: auto;
  @media (max-width: 599px) { padding: 0 16px; }
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Brand = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin: 24px 0;
  label { display: grid; gap: 6px; width: 360px; max-width: 100%; font-size: 0.875rem; }
`;

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  h2 { font-size: 1.125rem; }
  span { color: ${({ theme }) => theme.colors.muted}; font-size: 0.875rem; }
`;

const Empty = styled(Card)`
  text-align: center;
  padding: 64px 20px;
  p { color: ${({ theme }) => theme.colors.muted}; margin: 8px 0 24px; }
`;

const LoadingCard = styled(Card)`
  display: grid;
  gap: 18px;
`;

const Announcement = styled.p`
  min-height: 24px;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.accent};
`;

export default function App() {
  const { mode, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Все');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [pending, setPending] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    const addTimers = timers.current;
    return () => {
      clearTimeout(timer);
      addTimers.forEach(clearTimeout);
      addTimers.clear();
    };
  }, []);

  function addToCart(id: number) {
    if (timers.current.has(id)) return;
    setPending(items => [...items, id]);
    const timer = setTimeout(() => {
      setCart(items => ({ ...items, [id]: (items[id] ?? 0) + 1 }));
      setPending(items => items.filter(item => item !== id));
      setMessage(`Добавлено: ${products.find(product => product.id === id)?.title}`);
      timers.current.delete(id);
    }, 600);
    timers.current.set(id, timer);
  }

  function clearCart() {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setPending([]);
    setCart({});
    setMessage('Корзина очищена');
  }

  function resetFilters() {
    setQuery('');
    setCategory('Все');
  }

  const visible = filterProducts(products, query, category);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);

  return (
    <ThemeProvider theme={mode === 'light' ? light : dark}>
      <GlobalStyle />
      <Page>
        <Header>
          <Brand>mini-market</Brand>
          <Row>
            <Button $variant="outline" $size="sm" onClick={toggleTheme}
              aria-label="Тёмная тема" aria-pressed={mode === 'dark'}>
              {mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            </Button>
            <Badge>Корзина: {count} · {formatPrice(total)}</Badge>
            {(count > 0 || pending.length > 0) && <Button $variant="danger" $size="sm" onClick={clearCart}>Очистить</Button>}
          </Row>
        </Header>
        <main>
          <Controls>
            <label htmlFor="search">Поиск по каталогу
              <Input id="search" type="search" placeholder="Например, блокнот" value={query}
                onChange={event => setQuery(event.target.value)} />
            </label>
            <Row role="group" aria-label="Категории">
              {categories.map(item => (
                <Button key={item} $variant={category === item ? 'primary' : 'ghost'}
                  aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>
              ))}
            </Row>
          </Controls>
          <section aria-labelledby="catalog-title" aria-busy={loading}>
            <Results>
              <h2 id="catalog-title">Каталог</h2>
              <span role="status">{loading ? 'Загружаем товары…' : `Найдено: ${visible.length}`}</span>
            </Results>
            {loading ? (
              <Grid aria-hidden="true">
                {Array.from({ length: 8 }, (_, id) => (
                  <LoadingCard key={id}>
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton $height="36px" />
                  </LoadingCard>
                ))}
              </Grid>
            ) : visible.length > 0 ? (
              <Grid>
                {visible.map(product => (
                  <ProductCard key={product.id} product={product} qty={cart[product.id] ?? 0}
                    loading={pending.includes(product.id)} onAdd={addToCart} />
                ))}
              </Grid>
            ) : (
              <Empty>
                <h3>Ничего не нашлось</h3>
                <p>Попробуйте другой запрос или выберите все категории.</p>
                <Button $size="lg" $variant="outline" onClick={resetFilters}>Сбросить фильтры</Button>
              </Empty>
            )}
          </section>
          <Announcement role="status">{message}</Announcement>
        </main>
      </Page>
    </ThemeProvider>
  );
}
