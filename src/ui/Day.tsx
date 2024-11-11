import styled from "styled-components";

const Day = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 0.4rem 0.5rem;
  border-radius: 3px;
  font-weight: 600;
  background: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--secondary-color)"};
  color: ${(props) => (props.active ? "var(--text-color)" : "black")};

  &:hover {
    background: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--secondary-color)"};
  }
`;

export default Day;
