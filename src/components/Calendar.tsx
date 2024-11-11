import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { WeekDays } from "../styles/DatePickerStyles";
import DayButton from "../ui/Day";
import Day from "./Day";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

const Calendar: FC = () => {
  useKeyboardNavigation();

  const { displayDate, daysName } = useDatePickerContext();
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
        <DayButton key={d} active={false} style={{ textAlign: "center" }}>
          {d}
        </DayButton>
      ))}
      {days.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </WeekDays>
  );
};

export default Calendar;
