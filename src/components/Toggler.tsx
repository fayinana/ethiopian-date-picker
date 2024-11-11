import { useEffect, useState } from "react";
import { useDatePickerContext } from "./../context/DatePickerProvider";

function Toggler() {
  const { togglePicker, setPosition, selectedDate, displayDate } =
    useDatePickerContext();
  const [{ day, month, year }, setInputDate] = useState(() => ({
    day: new Date(selectedDate)?.getDate(),
    month: new Date(displayDate)?.getMonth(),
    year: new Date(displayDate)?.getFullYear(),
  }));

  useEffect(() => {
    setInputDate({
      day: new Date(selectedDate)?.getDate(),
      month: new Date(displayDate)?.getMonth(),
      year: new Date(displayDate)?.getFullYear(),
    });
  }, [displayDate, selectedDate]);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    togglePicker();
    setPosition({
      x: rect.left,
      y: rect.top + rect.height + window.scrollY + 8,
    });
  }

  return (
    <button onClick={handleClick}>
      <span>{day}</span>/<span>{month + 1}</span>/<span>{year}</span>
    </button>
  );
}

export default Toggler;
