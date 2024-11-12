import styled, { css } from "styled-components";

type Variation = "primary" | "secondary";

const variations: Record<Variation, ReturnType<typeof css>> = {
  primary: css`
    color: var(--text-color);
    background: var(--primary-color);
    &:hover {
      background: var(--primary-color);
    }
  `,
  secondary: css`
    color: var(--text-color);
    background: var(--secondary-color);
    &:hover {
      background: var(--secondary-color);
    }
  `,
};

const Button = styled.button<{ variation: Variation }>`
  cursor: pointer;
  border: none;
  max-width: 10em;
  padding: 0.5em 2em;
  border-radius: 0.3em;
  font-size: 0.75em;
  text-transform: capitalize;
  font-weight: 500;

  ${(props) => variations[props.variation]}
`;

export default Button;
