import styled from 'styled-components';
import { Button, Card } from './ui';
import { formatPrice, type Product } from './data';

const ProductContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h3 { font-size: 1.0625rem; }
  p { color: ${({ theme }) => theme.colors.muted}; font-size: 0.875rem; margin-top: 4px; }
`;

const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  strong { white-space: nowrap; }
`;

type ProductCardProps = {
  product: Product;
  qty: number;
  loading: boolean;
  onAdd: (id: number) => void;
};

export function ProductCard({ product, qty, loading, onAdd }: ProductCardProps) {
  return (
    <ProductContainer aria-labelledby={`product-${product.id}`}>
      <div>
        <h3 id={`product-${product.id}`}>{product.title}</h3>
        <p>{product.description}</p>
        <p>{qty > 0 ? `В корзине: ${qty}` : product.category}</p>
      </div>
      <Bottom>
        <strong>{formatPrice(product.price)}</strong>
        <Button $size="sm" $loading={loading} onClick={() => onAdd(product.id)}
          aria-label={`В корзину: ${product.title}`}>
          {loading ? 'Добавляем' : 'В корзину'}
        </Button>
      </Bottom>
    </ProductContainer>
  );
}
