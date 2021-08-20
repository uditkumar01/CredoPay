// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
  background: "red",
  colors: {
    brand: {
      50: "#d6ffff",
      100: "#aafcff",
      200: "#7af9ff",
      300: "#47f4ff",
      400: "#1af2ff",
      500: "#00F0FF",
      600: "#00a8b4",
      700: "#007981",
      800: "#00494f",
      900: "#001a1e",
    },
    black: {
      50: "#8D9096",
      100: "#80838A",
      200: "#73777E",
      300: "#666A72",
      400: "#5A5E67",
      500: "#4D525B",
      600: "#40454F",
      700: "#333943",
      800: "#272C38",
      900: "#1A202C",
      1000: "#1a202c",
    },
  },
});

export default theme;
