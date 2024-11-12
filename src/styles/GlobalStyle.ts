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
    --primary-color: ${(props) => props.primaryColor || "#ac5eba"};
    --secondary-color: ${(props) => props.secondaryColor || "#f5f5f5"};
    --text-color: ${(props) => props.textColor || "#000"};
    --background-color: ${(props) => props.bgColor || "#fff"};
  }
`;

export default GlobalStyles;
