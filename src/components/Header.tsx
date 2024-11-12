import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { HeaderButton, StyledHeader } from "../styles/DatePickerStyles";

const Header: FC = () => {
  const {
    displayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
  } = useDatePickerContext();

  return (
    <StyledHeader>
      <HeaderButton onClick={goToPrevYear}>&larr;</HeaderButton>
      <HeaderButton onClick={goToPrevMonth}>&larr;</HeaderButton>
      <span>
        {displayDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <HeaderButton onClick={goToNextMonth}>&rarr;</HeaderButton>
      <HeaderButton onClick={goToNextYear}>&rarr;</HeaderButton>
    </StyledHeader>
  );
};

export default Header;
