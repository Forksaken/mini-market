import type { ButtonHTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';
import type { ButtonVariant } from '../theme';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: ButtonVariant;
  $size?: 'sm' | 'md' | 'lg';
  $loading?: boolean;
};

const sizes = { sm: '6px 12px', md: '10px 16px', lg: '14px 22px' };
const spin = keyframes`to { transform: rotate(360deg); }`;

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $size = 'md' }) => sizes[$size]};
  min-height: 36px;
  border: 1px solid ${({ theme, $variant = 'primary' }) => theme.colors.buttons[$variant].border};
  border-radius: 8px;
  background: ${({ theme, $variant = 'primary' }) => theme.colors.buttons[$variant].background};
  color: ${({ theme, $variant = 'primary' }) => theme.colors.buttons[$variant].text};
  font-size: ${({ $size = 'md' }) => $size === 'sm' ? '0.875rem' : '1rem'};
  font-weight: 600;
  transition: background 150ms;
  &:hover:not(:disabled) {
    background: ${({ theme, $variant = 'primary' }) => theme.colors.buttons[$variant].hover};
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: ${({ theme }) => theme.colors.buttons.ghost.border};
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
`;

export function Button({ $loading = false, disabled, children, type = 'button', ...props }: ButtonProps) {
  return (
    <StyledButton {...props} type={type} disabled={disabled || $loading} aria-busy={$loading}>
      {$loading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  );
}
