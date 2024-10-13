import playIcon from "./play-button.svg";
import pauseIcon from "./pause-icon.svg";
import stopIcon from "./stop-icon.svg";
import { theme } from "@chakra-ui/core";

const customIcons = {
    playicon:playIcon,
    pauseIcon,
    stopIcon,    
  };


 export const customTheme = {
    ...theme,
    icons: {
      ...theme.icons,
      ...customIcons,
    }
  } 