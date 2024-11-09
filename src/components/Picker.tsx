import { createContext, useContext, ReactNode, FC, useState } from "react";

interface DatePickerContextType {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  displayDate: Date;
  setDisplayDate: (date: Date) => void;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToNextYear: () => void;
  goToPrevYear: () => void;
  isOpen: boolean;
  togglePicker: () => void;
  dateFormat: string;
  date: Date | null;
  setDate: (date: Date | string | null) => void;
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined
);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "useDatePickerContext must be used within a DatePickerProvider"
    );
  }
  return context;
};

interface PickerProps {
  children: ReactNode;
  date: Date | string | null;
  setDate: (date: Date | string | null) => void;
}

const Picker: FC<PickerProps> & {
  Header: FC;
  Calendar: FC;
  Day: FC<{ day: number | null }>;
  Footer: FC;
} = ({ children, date, setDate }) => {
  const dateValue = new Date(date || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<Date>(dateValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dateFormat = "MM/dd/yyyy";

  const goToNextMonth = () => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const goToPrevMonth = () => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const goToNextYear = () => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1)
    );
  };

  const goToPrevYear = () => {
    setDisplayDate(
      (prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1)
    );
  };

  const togglePicker = () => {
    setIsOpen((prev) => !prev);
  };

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
  };

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div style={{ width: "200px" }}>{children}</div>
    </DatePickerContext.Provider>
  );
};

// Components within Picker
function Header() {
  const {
    displayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
  } = useDatePickerContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <button onClick={goToPrevYear}>&larr;</button>
      <button onClick={goToPrevMonth}>&larr;</button>
      <span>
        {displayDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button onClick={goToNextMonth}>&rarr;</button>
      <button onClick={goToNextYear}>&rarr;</button>
    </div>
  );
}

function Calendar() {
  const { displayDate, selectedDate, setSelectedDate } = useDatePickerContext();
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
      }}
    >
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <span key={d} style={{ textAlign: "center" }}>
          {d}
        </span>
      ))}
      {days.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </div>
  );
}

function Day({ day }: { day: number | null }) {
  const { displayDate, selectedDate, setSelectedDate } = useDatePickerContext();
  const isActive =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === displayDate.getMonth();

  return (
    <div
      onClick={() =>
        day &&
        setSelectedDate(
          new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
        )
      }
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: isActive ? "#8692fa" : "#ffffff",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "3px",
      }}
    >
      {day || ""}
    </div>
  );
}

function Footer() {
  const { selectedDate, togglePicker, setDate } = useDatePickerContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <button onClick={togglePicker}>Cancel</button>
      <button onClick={() => setDate(selectedDate)}>Submit</button>
    </div>
  );
}

Picker.Calendar = Calendar;
Picker.Day = Day;
Picker.Footer = Footer;
Picker.Header = Header;

export default Picker;
