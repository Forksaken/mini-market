import styled, { keyframes } from 'styled-components';

export { Button } from './Button';

export const Badge = styled.span`
  display: inline-block;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.875rem;
`;

export const Card = styled.article`
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1fr);
  @media (min-width: 600px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (min-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`;

const pulse = keyframes`50% { opacity: 0.45; }`;

export const Skeleton = styled.div<{ $height?: string }>`
  height: ${({ $height = '20px' }) => $height};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.skeleton};
  animation: ${pulse} 1.2s ease-in-out infinite;
`;
