import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import DayButton from "./../ui/Day";
const Day: FC<{ day: number | null }> = ({ day }) => {
  const { displayDate, selectedDate, setSelectedDate } = useDatePickerContext();
  const isActive =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === displayDate.getMonth();

  return (
    <DayButton
      active={isActive}
      onClick={() =>
        day &&
        setSelectedDate(
          new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
        )
      }
    >
      {day || ""}
    </DayButton>
  );
};

export default Day;
