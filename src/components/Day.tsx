import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { DayButton } from "../styles/DatePickerStyles";
import { toAmharicNumerals } from "../utils/convertToAmharic";

interface DayProps {
  day: number | null;
  isDay: boolean;
  isAmharic: boolean;
}

const Day: FC<DayProps> = ({ day, isDay, isAmharic }) => {
  const { displayDate, selectedDate, setSelectedDate } = useDatePickerContext();
  const isActive =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === displayDate.getMonth();

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