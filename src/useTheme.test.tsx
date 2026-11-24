import { act, renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { getSavedTheme, useTheme } from './useTheme';

it('использует системную тему, сохраняет выбор и восстанавливает его', () => {
  vi.mocked(window.matchMedia).mockReturnValue({
    matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
  const first = renderHook(useTheme);
  expect(first.result.current.mode).toBe('dark');
  act(() => first.result.current.toggleTheme());
  expect(localStorage.getItem('mini-market-theme')).toBe('light');
  first.unmount();
  expect(renderHook(useTheme).result.current.mode).toBe('light');
});

it('следует изменениям системы только до ручного выбора', () => {
  const media = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.mocked(window.matchMedia).mockReturnValue(media as unknown as MediaQueryList);
  const { result } = renderHook(useTheme);
  const change = media.addEventListener.mock.calls[0][1];
  act(() => { media.matches = true; change(); });
  expect(result.current.mode).toBe('dark');
  act(() => result.current.toggleTheme());
  act(() => { media.matches = false; change(); });
  act(() => { media.matches = true; change(); });
  expect(result.current.mode).toBe('light');
});

it('игнорирует неверное значение и работает при недоступном хранилище', () => {
  localStorage.setItem('mini-market-theme', 'broken');
  expect(getSavedTheme()).toBeNull();
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
  const { result } = renderHook(useTheme);
  act(() => result.current.toggleTheme());
  expect(result.current.mode).toBe('dark');
});
