import styled from "styled-components";

const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 18px;
  color: rgba(149, 165, 166, 0.8);
  border: 1px solid rgba(149, 165, 166, 0.8);
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(149, 165, 166, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LeftArrowButton = styled(ArrowButton)`
  &::before {
    content: "";
  }
`;

const RightArrowButton = styled(ArrowButton)`
  &::after {
    content: "";
  }
`;

const Scroll = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 0 20px;
  padding: 10px 0;
  width: 150px;
  height: 50px;
  display: inline-block;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export { LeftArrowButton, RightArrowButton, Scroll };
