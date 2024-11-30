//Calendar.tsx
import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { WeekDays,DayButton } from "../styles/DatePickerStyles";
import Day from "./Day";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
const Calendar: FC = () => {
  useKeyboardNavigation();

  const { displayDate, daysName, isAmharic } = useDatePickerContext(); // Access isAmharic from context
  const daysInMonth = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth() + 1,
    0
  ).getDate();
  const startDay = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: 42 }, (_, index) => {
    const day = index - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <WeekDays>
      {daysName.map((d) => (
        <DayButton
          key={d}
          isDay={d == null}
          active={false}
          style={{ textAlign: "center" }}
        >
          {d}
        </DayButton>
      ))}
      {days.map((day, index) => (
        <Day key={index} day={day} isDay={day !== null} isAmharic={isAmharic} /> 
      ))}
    </WeekDays>
  );
};

export default Calendar;
