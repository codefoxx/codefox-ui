export const themeTokens = {
  color: {
    background: "--codefox-color-background",
    foreground: "--codefox-color-foreground",
    surface: "--codefox-color-surface",
    primary: "--codefox-color-primary",
    primaryForeground: "--codefox-color-primary-foreground",
    secondary: "--codefox-color-secondary",
    secondaryForeground: "--codefox-color-secondary-foreground",
    muted: "--codefox-color-muted",
    mutedForeground: "--codefox-color-muted-foreground",
    danger: "--codefox-color-danger",
    dangerForeground: "--codefox-color-danger-foreground",
    border: "--codefox-color-border",
    focus: "--codefox-color-focus",
  },
  space: {
    xs: "--codefox-space-xs",
    sm: "--codefox-space-sm",
    md: "--codefox-space-md",
    lg: "--codefox-space-lg",
    xl: "--codefox-space-xl",
  },
  radius: {
    sm: "--codefox-radius-sm",
    md: "--codefox-radius-md",
    lg: "--codefox-radius-lg",
    full: "--codefox-radius-full",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
