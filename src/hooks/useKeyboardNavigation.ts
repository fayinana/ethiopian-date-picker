import { useEffect } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";

const useKeyboardNavigation = () => {
  const { navigateTo, togglePicker } = useDatePickerContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          navigateTo("prevDay");
          break;
        case "ArrowRight":
          navigateTo("nextDay");
          break;
        case "ArrowUp":
          navigateTo("prevWeek");
          break;
        case "ArrowDown":
          navigateTo("nextWeek");
          break;
        case "Enter":
          // You can define selectDate if needed, or make it part of context
          // selectDate();
          break;
        case "Escape":
          togglePicker();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateTo, togglePicker]); // Ensure dependencies are correct
};

export default useKeyboardNavigation;
