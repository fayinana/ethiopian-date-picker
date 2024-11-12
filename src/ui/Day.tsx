import styled from "styled-components";

const Day = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  width: 1.5em;
  height: 1.5em;
  padding: 0.2em 0.3em;
  border-radius: 0.12em;
  font-weight: 600;
  background: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--secondary-color)"};

  &:hover {
    background: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--secondary-color)"};
  }
`;

export default Day;
