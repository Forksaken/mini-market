import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html { color-scheme: ${({ theme }) => theme.mode}; }
  body {
    margin: 0;
    min-width: 320px;
    font-family: Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    transition: background 180ms, color 180ms;
  }
  button, input { font: inherit; }
  button { cursor: pointer; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.colors.accent}; outline-offset: 4px; }
  h1, h2, h3, p { margin: 0; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;
