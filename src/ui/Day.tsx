import styled from "styled-components";

const Day = styled.span<{ active: boolean }>`
  width: 30px;
  height: 30px;
  padding: 0.4rem 0.5rem;
  border-radius: 3px;
  font-weight: 600;
  background: ${(props) => (props.active ? "#8692fa" : "#ffffff")};

  &:hover {
    background: ${(props) => (props.active ? "#7885fa" : "#f5f5f5")};
  }
`;

export default Day;
