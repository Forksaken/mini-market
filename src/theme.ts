export type ThemeMode = 'light' | 'dark';
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

type ButtonColors = { background: string; text: string; border: string; hover: string };

export interface AppTheme {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    soft: string;
    skeleton: string;
    buttons: Record<ButtonVariant, ButtonColors>;
  };
}

export const light: AppTheme = {
  mode: 'light',
  colors: {
    background: '#f6f7f9', surface: '#ffffff', text: '#20272b', muted: '#58656c',
    border: '#d9dfe2', accent: '#235c49', soft: '#eaf1ed', skeleton: '#dce3df',
    buttons: {
      primary: { background: '#235c49', text: '#ffffff', border: '#235c49', hover: '#184534' },
      outline: { background: 'transparent', text: '#235c49', border: '#879b91', hover: '#eaf1ed' },
      ghost: { background: 'transparent', text: '#58656c', border: 'transparent', hover: '#eaf1ed' },
      danger: { background: '#a62e3c', text: '#ffffff', border: '#a62e3c', hover: '#862332' },
    },
  },
};

export const dark: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#141b19', surface: '#1d2723', text: '#eef3f0', muted: '#afbeb6',
    border: '#3c4e44', accent: '#a6ddbd', soft: '#2a3c32', skeleton: '#40574a',
    buttons: {
      primary: { background: '#a6ddbd', text: '#172b20', border: '#a6ddbd', hover: '#c2ebd2' },
      outline: { background: 'transparent', text: '#a6ddbd', border: '#6f9c80', hover: '#2a3c32' },
      ghost: { background: 'transparent', text: '#afbeb6', border: 'transparent', hover: '#2a3c32' },
      danger: { background: '#f4a5ae', text: '#45141c', border: '#f4a5ae', hover: '#ffc3ca' },
    },
  },
};
