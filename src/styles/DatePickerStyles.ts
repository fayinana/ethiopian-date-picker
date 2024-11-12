import styled, { css } from "styled-components";

type Variation = "primary" | "secondary";

export const StyledContainer = styled.div<{
  width: string;
  height: string;
  position: { x: number; y: number };
}>`
  position: absolute;
  min-width: ${(props) => props.width};
  max-width: 30em;
  min-height: ${(props) => props.height};
  background: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-family);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0.75em;
  padding: 1em;
  scale: 0.65;
  display: flex;
  flex-direction: column;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 1rem;
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1em;
`;
const variations: Record<Variation, ReturnType<typeof css>> = {
  primary: css`
    color: var(--secondary-color);
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

export const FooterButton = styled.button<{ variation: Variation }>`
  cursor: pointer;
  border: none;
  max-width: 200px;
  padding: 01em 2em;
  border-radius: 0.3em;
  font-size: 0.75em;
  text-transform: capitalize;
  font-weight: 500;
  padding: 1em 2em;
  font-size: 1rem;
  font-weight: 500;
  background: ${(props) =>
    props.variation === "primary"
      ? "var(--primary-color)"
      : "var(--secondary-color)"};
  color: ${(props) =>
    props.variation === "primary" ? "var(--secondary-color)" : "var(--text-color)"};
  
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Adding hover effect */
  &:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${(props) =>
      props.variation === "primary"
        ? "var(--primary-color)"
        : "var(--secondary-color)"};
    background-color: #5050dc;
  }
  
  ${(props) => variations[props.variation]}
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 500;
`;
export const DateScroll = styled.span`
  margin: 0 20px;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 0.5px;
  word-break: break-word;
  white-space: nowrap;
  width: 150px;
`;

export const HeaderButton = styled.button`
background: none;
border: none;
font-size: 1.2em;
cursor: pointer;
border-radius: 10px;
color: var(--text-color);
padding: 10px;
margin: 5px;
transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

&:hover {
  background-color: var(--primary-color);
  color: white;
}
`;


export const DayButton = styled.span<{ active: boolean,isDay: boolean }>`

    width: 30px;
    height: 30px;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 15px;
    padding: 8px;
    margin: 5px;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

          background: ${(props) =>
            props.isDay ? props.active ? "var(--primary-color)" : "" : ""};
          color: ${(props) => (props.isDay ? props.active ? "white" : "var(--text-color)" : "var(--text-color)")};
      &:hover {
          background: ${(props) =>
      props.isDay ? "var(--primary-color)" : "var(--secondary-color)"};
        color: ${(props) => (props.isDay ? "white" : "var(--text-color)")};
      }
  
`;
