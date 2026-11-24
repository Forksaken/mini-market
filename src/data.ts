export const categories = ['Все', 'Канцелярия', 'Для дома', 'Аксессуары'] as const;
export type Category = typeof categories[number];

export type Product = {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, 'Все'>;
  price: number;
};

export const products: Product[] = [
  { id: 1, title: 'Блокнот в точку', description: 'A5 · 96 страниц', category: 'Канцелярия', price: 490 },
  { id: 2, title: 'Керамическая кружка', description: '350 мл · матовая глазурь', category: 'Для дома', price: 890 },
  { id: 3, title: 'Хлопковый шопер', description: 'Плотный хлопок · 38 × 42 см', category: 'Аксессуары', price: 690 },
  { id: 4, title: 'Набор карандашей', description: '6 штук · твёрдость HB', category: 'Канцелярия', price: 290 },
  { id: 5, title: 'Ежедневник без дат', description: 'A5 · 160 страниц', category: 'Канцелярия', price: 790 },
  { id: 6, title: 'Чашка для эспрессо', description: '90 мл · керамика', category: 'Для дома', price: 590 },
  { id: 7, title: 'Сумка для мелочей', description: 'Хлопок · 20 × 24 см', category: 'Аксессуары', price: 390 },
  { id: 8, title: 'Простой карандаш', description: 'Натуральное дерево · HB', category: 'Канцелярия', price: 90 },
];

export function filterProducts(items: Product[], query: string, category: Category) {
  const text = query.trim().toLowerCase();
  return items.filter(product => product.title.toLowerCase().includes(text)
    && (category === 'Все' || product.category === category));
}

export function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}
