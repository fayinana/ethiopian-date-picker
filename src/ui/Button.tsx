import styled, { css } from "styled-components";

type Variation = "primary" | "secondary";

const variations: Record<Variation, ReturnType<typeof css>> = {
  primary: css`
    color: whitesmoke;
    background: #8692fa;
    &:hover {
      background: #7885fa;
    }
  `,
  secondary: css`
    color: black;
    background: #ffffff;
    &:hover {
      background: #f5f5f5;
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
