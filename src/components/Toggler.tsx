import { useEffect, useState } from "react";
import { useDatePickerContext } from "./../context/DatePickerProvider";

function Toggler() {
  const { togglePicker, setPosition, selectedDate, displayDate } =
    useDatePickerContext();
  const [{ day, month, year }, setInputDate] = useState(() => ({
    day: new Date(displayDate)?.getDate(),
    month: new Date(displayDate)?.getMonth(),
    year: new Date(displayDate)?.getFullYear(),
  }));

  useEffect(() => {
    setInputDate({
      day: new Date(displayDate)?.getDate(),
      month: new Date(displayDate)?.getMonth(),
      year: new Date(displayDate)?.getFullYear(),
    });
  }, [displayDate, selectedDate]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    togglePicker();
    setPosition({
      x: rect.left,
      y: rect.top + rect.height + window.scrollY + 8,
    });
  }

  return (
    <button
      onClick={handleClick}
      style={{
        margin: "10px",
        padding: "0.5em 1.5em",
        background: "#3e3ec3",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        display: "block",
        width: "auto",
        maxWidth: "100%",
      }}
    >
      <span>{day}</span>/<span>{month + 1}</span>/<span>{year}</span>
    </button>
  );
}

export default Toggler;
