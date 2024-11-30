//Toggler.tsx
import { ReactNode, useEffect, useState } from "react";
import { useDatePickerContext } from "./../context/DatePickerProvider";

interface TogglerProps {
  children: ReactNode;
}

function Toggler({ children }: TogglerProps) {
  const { togglePicker, setPosition, selectedDate, displayDate } =
    useDatePickerContext();
  const [inputDate, setInputDate] = useState(() => ({
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

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const pickerHeight = 370; // Approximate height of the date picker
    const margin = 8; // Space between toggler and picker

    // Calculate x position to ensure it stays within the viewport
    let calculatedX = rect.left + window.scrollX;
    if (calculatedX < 0) {
      calculatedX = margin;
    }

    // Default Y position (below the toggler)
    let calculatedY = rect.top + window.scrollY + margin;

    // If there's not enough space at the bottom, place it above the toggler
    if (calculatedY + pickerHeight > viewportHeight + window.scrollY) {
      calculatedY = rect.top - pickerHeight - margin + window.scrollY;

      // Ensure it doesn't go too far up
      if (calculatedY < window.scrollY) {
        calculatedY = window.scrollY + margin;
      }
    }

    // Update position and toggle the picker
    setPosition({ x: calculatedX, y: calculatedY });
    togglePicker();
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5em",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "0.5em 1em",
        background: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "300px",
        margin:"30px 0 0 420px",
      }}
    >
      {children}
    </div>
  );
}

export default Toggler;
