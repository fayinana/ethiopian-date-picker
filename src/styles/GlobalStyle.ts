// GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  bgColor?: string;
  fontFamily?: string;
  isDarkMode?:boolean;
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  :root {
    --primary-color: ${(props) =>
      props.isDarkMode ? props.primaryColor || "rgba(62, 62, 195, 0.66)" : props.primaryColor || "rgba(62, 62, 195, 0.66)"};
    --secondary-color: ${(props) =>
      props.isDarkMode ? props.secondaryColor || "#3b3b3d" : props.secondaryColor || "#f5f5f5"};
    --text-color: ${(props) =>
      props.isDarkMode ? props.textColor || "#D4D4D4" : props.textColor || "#2d3f3f"};
    --background-color: ${(props) =>
      props.isDarkMode ? props.bgColor || "#313435" : props.bgColor || "#fff"};
    --font-family: ${(props) => props.fontFamily || "sans-serif"}; 
  }
`;

export default GlobalStyles;
