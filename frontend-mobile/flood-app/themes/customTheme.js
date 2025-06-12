export const buildCustomTheme = (baseTheme, isDark) => ({
    dark: isDark, 
    colors: {
        background: baseTheme.background,
        card: baseTheme.card,
        textLight: baseTheme.textLight,
        textDark: baseTheme.textDark,
        primary: baseTheme.primary,
        secondary: baseTheme.secondary,
        accet: baseTheme.accent,
        tabBar: baseTheme.tabBackground
    },
    fonts:{
        regular: { fontFamily: "System", fontWeight: "normal"},
        medium: { fontFamilt: "System", fontWeight: "500"}
    },
})