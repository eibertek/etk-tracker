import { theme } from "@chakra-ui/core";

const customIcons = {
  };


 export const customTheme = {
    ...theme,
    icons: {
      ...theme.icons,
      ...customIcons,
    }
  } 