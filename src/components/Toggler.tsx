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
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    const pickerHeight = 410; // Approximate height of the date picker
    const pickerWidth = 310; // Approximate width of the date picker
    const margin = 8; // Space between toggler and picker
  
    // Calculate x position to ensure it stays within the viewport
    let calculatedX = rect.left;
    if (calculatedX + pickerWidth > viewportWidth) {
      calculatedX = viewportWidth - pickerWidth - margin - 22;
    }
    if (calculatedX < 0) {
      calculatedX = margin;
    }
    // Default Y position (below the toggler)
    let calculatedY = rect.top + rect.height + window.scrollY + margin;
  
    // If there's not enough space at the bottom, place it above the toggler
    if (calculatedY + pickerHeight > viewportHeight + window.scrollY) {
      calculatedY = rect.top - 300 - margin; // Adjust to place above the toggler
  
      // Ensure it doesn't go too far up
      if (calculatedY < window.scrollY) {
        calculatedY = window.scrollY + margin + 200; // Align to the visible screen top
      }
    }
  
    // Update position and toggle the picker
    setPosition({ x: calculatedX, y: calculatedY });
    togglePicker();
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
