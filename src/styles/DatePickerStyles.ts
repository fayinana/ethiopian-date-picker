import styled from "styled-components";
import { Variation } from "../types";
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0.75em;
  padding: 1em;
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
  justify-content: space-between;
  gap: 1em;
  padding-top: 1em;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.5em;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--primary-color);
  }
`;

export const Button = styled.button<{ variation: Variation }>`
  cursor: pointer;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) =>
    props.variation === "primary"
      ? "var(--primary-color)"
      : "var(--secondary-color)"};
  color: ${(props) =>
    props.variation === "primary" ? "var(--text-color)" : "black"};

  &:hover {
    background: ${(props) =>
      props.variation === "primary"
        ? "var(--primary-color)"
        : "var(--secondary-color)"};
  }
`;

export const Day = styled.span<{ active: boolean }>`
  background: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--secondary-color)"};
  color: var(--text-color);

  &:hover {
    background: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--secondary-color)"};
  }
`;
