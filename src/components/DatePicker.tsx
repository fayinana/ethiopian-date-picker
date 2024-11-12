// DatePicker.tsx
import { createPortal } from "react-dom";
import { DatePickerContextProvider } from "../context/DatePickerProvider";
import { StyledContainer } from "../styles/DatePickerStyles";
import { FC, useCallback, useState } from "react";
import { useOutSideClick } from "../hooks/useOutSideClick";
import Header from "./Header";
import Calendar from "./Calendar";
import Footer from "./Footer";
import Toggler from "./Toggler";
import GlobalStyles from "./../styles/GlobalStyle";

interface DatePickerProps {
  children: React.ReactNode;
  date: Date | null;
  setDate: (date: Date | null) => void;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  daysName?: string[];
  primaryColor?: string;
  secondaryColor?: string;
  bgColor?: string;
  textColor?: string;
}

const DatePicker: FC<DatePickerProps> & {
  Header: FC;
  Calendar: FC;
  Footer: FC;
} = ({
  children,
  date,
  setDate,
  width = "100%",
  height = "100%",
  style = {},
  daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  primaryColor = "#05082a",
  secondaryColor = "#ffffff",
  textColor = "#b92626",
  bgColor = "#f5f5f5",
}) => {
  const dateValue = new Date(date || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<Date>(dateValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const dateFormat = "MM/dd/yyyy";

  const goToNextMonth = useCallback(() => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  }, []);
  const goToPrevMonth = useCallback(() => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  }, []);

  const goToNextYear = useCallback(() => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1)
    );
  }, []);

  const goToPrevYear = useCallback(() => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1)
    );
  }, []);

  const togglePicker = () => {
    setIsOpen((prev) => !prev);
  };

  // Inside your DatePickerProvider
  const navigateTo = (direction: string) => {
    setSelectedDate((currentDate) => {
      if (!currentDate) return currentDate;

      const newDate = new Date(currentDate);

      switch (direction) {
        case "nextDay":
          newDate.setDate(newDate.getDate() + 1);
          break;
        case "prevDay":
          newDate.setDate(newDate.getDate() - 1);
          break;
        case "nextWeek":
          newDate.setDate(newDate.getDate() + 7);
          break;
        case "prevWeek":
          newDate.setDate(newDate.getDate() - 7);
          break;
        default:
          return currentDate;
      }

      // Check if the month changed and update displayDate accordingly
      if (newDate.getMonth() !== displayDate.getMonth()) {
        setDisplayDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }

      return newDate;
    });
  };

  const { ref } = useOutSideClick(() => setIsOpen(false));
  const contextValue = {
    selectedDate,
    setSelectedDate,
    displayDate,
    setDisplayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    isOpen,
    togglePicker,
    dateFormat,
    date,
    setDate,
    position,
    setPosition,
    daysName,
    navigateTo, // Make sure navigateTo is part of the context
  };

  return (
    <DatePickerContextProvider value={contextValue}>
      <GlobalStyles
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        textColor={textColor}
        bgColor={bgColor}
      />

      <Toggler />
      {isOpen &&
        createPortal(
          <StyledContainer
            style={{ ...style }}
            height={height}
            width={width}
            ref={ref}
            position={position}
          >
            {children}
          </StyledContainer>,
          document.body
        )}
    </DatePickerContextProvider>
  );
};

DatePicker.Header = Header;
DatePicker.Calendar = Calendar;
DatePicker.Footer = Footer;

export default DatePicker;
