// GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  bgColor?: string;
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  :root {
    --primary-color: ${(props) => props.primaryColor || "#f591fa"};
    --secondary-color: ${(props) => props.secondaryColor || "#ffffff"};
    --text-color:${(props) => props.textColor || "#000"}
    --background-color : ${(props) => props.bgColor || "#f5f5f5"}
  }
`;

export default GlobalStyles;
