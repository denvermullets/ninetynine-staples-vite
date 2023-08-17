export const globalStyles = {
  colors: {
    colorThemeName: {
      50: "#C8102E",
      100: "#ffffff",
    },
  },
  styles: {
    global: () => ({
      body: {
        overflowX: "hidden",
        bg: "gray.200",
        // bg: mode("darkMode.50", "darkMode.500")(props),
        letterSpacing: "-0.5px",
      },
    }),
  },
};
