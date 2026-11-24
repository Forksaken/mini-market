import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { filterProducts, products } from './data';
import { light, type ButtonVariant } from './theme';
import { Button } from './ui';

function loadCatalog() {
  vi.useFakeTimers();
  render(<App />);
  act(() => vi.advanceTimersByTime(700));
}

describe('Каталог', () => {
  it('ищет без учёта регистра и пробелов и учитывает категорию', () => {
    expect(filterProducts(products, '  БЛОКНОТ  ', 'Канцелярия').map(product => product.id)).toEqual([1]);
    expect(filterProducts(products, 'блокнот', 'Для дома')).toEqual([]);
  });

  it('показывает загрузку, пустое состояние и сбрасывает оба фильтра', () => {
    vi.useFakeTimers();
    render(<App />);
    expect(screen.getByText('Загружаем товары…')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'В корзину: Блокнот в точку' })).toBeNull();
    act(() => vi.advanceTimersByTime(700));
    fireEvent.click(screen.getByRole('button', { name: 'Для дома' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'блокнот' } });
    expect(screen.getByText('Ничего не нашлось')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Сбросить фильтры' }));
    expect(screen.getAllByRole('button', { name: /^В корзину:/ })).toHaveLength(8);
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('');
  });

  it('блокирует повторное добавление при loading, считает количество и сумму', () => {
    loadCatalog();
    const button = screen.getByRole('button', { name: 'В корзину: Блокнот в точку' }) as HTMLButtonElement;
    fireEvent.click(button);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(button);
    act(() => vi.advanceTimersByTime(600));
    expect(screen.getByText('Корзина: 1 · 490 ₽')).toBeTruthy();
    fireEvent.click(button);
    act(() => vi.advanceTimersByTime(600));
    expect(screen.getByText('Корзина: 2 · 980 ₽')).toBeTruthy();
  });

  it('очистка отменяет незавершённые добавления', () => {
    loadCatalog();
    fireEvent.click(screen.getByRole('button', { name: 'В корзину: Блокнот в точку' }));
    fireEvent.click(screen.getByRole('button', { name: 'Очистить' }));
    act(() => vi.advanceTimersByTime(600));
    expect(screen.getByText('Корзина: 0 · 0 ₽')).toBeTruthy();
  });
});

describe('Button', () => {
  it.each<ButtonVariant>(['primary', 'outline', 'ghost', 'danger'])('%s: поддерживает три размера без служебных атрибутов в DOM', variant => {
    render(<ThemeProvider theme={light}>
      {(['sm', 'md', 'lg'] as const).map(size => <Button key={size} $variant={variant} $size={size}>{size}</Button>)}
    </ThemeProvider>);
    screen.getAllByRole('button').forEach(button => {
      expect(button.getAttributeNames()).not.toContain('variant');
      expect(button.getAttributeNames()).not.toContain('size');
      expect(button.getAttributeNames().some(name => name.startsWith('$'))).toBe(false);
    });
  });
});
