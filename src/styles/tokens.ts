export const themeTokens = {
  color: {
    background: "--cui-color-background",
    foreground: "--cui-color-foreground",
    surface: "--cui-color-surface",
    primary: "--cui-color-primary",
    primaryForeground: "--cui-color-primary-foreground",
    secondary: "--cui-color-secondary",
    secondaryForeground: "--cui-color-secondary-foreground",
    muted: "--cui-color-muted",
    mutedForeground: "--cui-color-muted-foreground",
    danger: "--cui-color-danger",
    dangerForeground: "--cui-color-danger-foreground",
    border: "--cui-color-border",
    focus: "--cui-color-focus",
  },
  space: {
    xs: "--cui-space-xs",
    sm: "--cui-space-sm",
    md: "--cui-space-md",
    lg: "--cui-space-lg",
    xl: "--cui-space-xl",
  },
  radius: {
    sm: "--cui-radius-sm",
    md: "--cui-radius-md",
    lg: "--cui-radius-lg",
    full: "--cui-radius-full",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
