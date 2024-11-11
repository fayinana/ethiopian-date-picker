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
  max-width: 150px;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 500;

  ${(props) => variations[props.variation]}
`;

export default Button;
