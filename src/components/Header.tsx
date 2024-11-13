import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { HeaderButton, StyledHeader, DateScroll } from "../styles/DatePickerStyles";
import { LeftArrowSVG, RightArrowSVG } from "../styles/ArrowButton";
import { toAmharicNumerals } from "../utils/convertToAmharic";

// Amharic month names
const amharicMonths = [
  "መስከምት", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ግንቦት", 
  "ሰኔ", "ሐምሌ", "ነሐሴ", "መስከምት", "ጥቅምት", "ሕዳር", "ታሕሳስ"
];

const Header: FC = () => {
  const {
    displayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    isAmharic
  } = useDatePickerContext();

  // Get the month and year
  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();

  // If isAmharic is true, display in Amharic numerals and month names
  const formattedDate = isAmharic
    ? `${amharicMonths[month]} ${toAmharicNumerals(year)}`
    : displayDate.toLocaleDateString("default", { month: "long", year: "numeric" });

  return (
    <StyledHeader>
      <HeaderButton onClick={goToPrevYear}><LeftArrowSVG double /></HeaderButton>
      <HeaderButton onClick={goToPrevMonth}><LeftArrowSVG /></HeaderButton>
      <DateScroll>{formattedDate}</DateScroll>
      <HeaderButton onClick={goToNextMonth}><RightArrowSVG /></HeaderButton>
      <HeaderButton onClick={goToNextYear}><RightArrowSVG double /></HeaderButton>
    </StyledHeader>
  );
};

export default Header;
