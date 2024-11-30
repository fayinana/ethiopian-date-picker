//Day.tsx
import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { DayButton } from "../styles/DatePickerStyles";
import { toAmharicNumerals } from "../utils/convertToAmharic";

interface DayProps {
  day: number | null;
  isDay: boolean;
  isAmharic?: boolean;
}

const Day: FC<DayProps> = ({ day, isDay, isAmharic }) => {
  const { displayDate, selectedDate, setSelectedDate } = useDatePickerContext();

  // Get today's date for comparison
  const today = new Date();

  const isActive =
    (selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === displayDate.getMonth() &&
      selectedDate?.getFullYear() === displayDate.getFullYear()) ||
    (!selectedDate && // If no date is selected, highlight today
      day === today.getDate() &&
      displayDate.getMonth() === today.getMonth() &&
      displayDate.getFullYear() === today.getFullYear());

  // Automatically set the current date as the selected date if none is set
  if (!selectedDate && isActive && day) {
    setSelectedDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
    );
  }

  return (
    <DayButton
      active={isActive}
      isDay={isDay}
      onClick={() =>
        day &&
        setSelectedDate(
          new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
        )
      }
    >
      {day ? (isAmharic ? toAmharicNumerals(day) : day) : ""}
    </DayButton>
  );
};

export default Day;
