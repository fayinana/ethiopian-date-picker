import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { HeaderButton, StyledHeader, DateScroll } from "../styles/DatePickerStyles";
import { LeftArrowSVG, RightArrowSVG } from "../styles/ArrowButton";

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
      <HeaderButton onClick={goToPrevYear}><LeftArrowSVG double/></HeaderButton>
      <HeaderButton onClick={goToPrevMonth}><LeftArrowSVG /></HeaderButton>
      <DateScroll>
        {displayDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </DateScroll>
      <HeaderButton onClick={goToNextMonth}><RightArrowSVG /></HeaderButton>
      <HeaderButton onClick={goToNextYear}><RightArrowSVG double/></HeaderButton>
    </StyledHeader>
  );
};

export default Header;
