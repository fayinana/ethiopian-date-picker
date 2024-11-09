import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useEffect,
} from "react";
import DayButton from "../ui/Day";
import Button from "../ui/Button";
import styled from "styled-components";
import { useOutSideClick } from "../hooks/useOutSideClick";
import { createPortal } from "react-dom";

const StyledContainer = styled.div<{
  width: string;
  height: string;
  position: { x: number; y: number };
}>`
  position: absolute;
  min-width: ${(props) => props.width};
  max-width: 400px;
  min-height: ${(props) => props.height};
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 1rem;
`;

const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #4a90e2;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0066cc;
  }
`;

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
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
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
  width: string;
  height: string;
}

const Picker: FC<PickerProps> & {
  Header: FC;
  Calendar: FC;
  Day: FC<{ day: number | null }>;
  Footer: FC;
} = ({ children, date, setDate, width = "100%", height = "100%" }) => {
  const dateValue = new Date(date || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<Date>(dateValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const dateFormat = "MM/dd/yyyy"; // Can be constant as it doesn't change

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

  const { ref } = useOutSideClick(() => setIsOpen(false)); // This triggers when clicked outside

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
  };

  return (
    <DatePickerContext.Provider value={contextValue}>
      <Toggler />
      {isOpen &&
        createPortal(
          <StyledContainer
            height={height}
            width={width}
            ref={ref}
            position={position}
          >
            {children}
          </StyledContainer>,
          document.body
        )}
    </DatePickerContext.Provider>
  );
};

function Toggler() {
  const { togglePicker, setPosition } = useDatePickerContext();

  // Update position relative to the button, including scroll
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    togglePicker();
    setPosition({
      x: rect.left, // Position from the left of the viewport
      y: rect.top + rect.height + window.scrollY + 8, // Position below the button, accounting for scroll
    });
  }

  return (
    <button
      style={{ position: "absolute", top: "120px", left: "50%" }}
      onClick={handleClick}
    >
      toggle
    </button>
  );
}

const Header: FC = () => {
  const {
    displayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
  } = useDatePickerContext();

  return (
    <StyledHeader>
      <HeaderButton onClick={goToPrevYear}>&larr;</HeaderButton>
      <HeaderButton onClick={goToPrevMonth}>&larr;</HeaderButton>
      <span>
        {displayDate.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <HeaderButton onClick={goToNextMonth}>&rarr;</HeaderButton>
      <HeaderButton onClick={goToNextYear}>&rarr;</HeaderButton>
    </StyledHeader>
  );
};

const Calendar: FC = () => {
  const { displayDate } = useDatePickerContext();
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
    <WeekDays>
      {["እሁ", "ሰኝ", "ማክ", "እሮ", "ሃሙ", "አር", "ቅዳ"].map((d) => (
        <DayButton key={d} active={false} style={{ textAlign: "center" }}>
          {d}
        </DayButton>
      ))}
      {days.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </WeekDays>
  );
};

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

const Footer: FC = () => {
  const { selectedDate, togglePicker, setDate } = useDatePickerContext();

  return (
    <GroupButton>
      <Button variation="secondary" onClick={togglePicker}>
        Cancel
      </Button>
      <Button variation="primary" onClick={() => setDate(selectedDate)}>
        Submit
      </Button>
    </GroupButton>
  );
};

Picker.Calendar = Calendar;
Picker.Day = Day;
Picker.Footer = Footer;
Picker.Header = Header;

export default Picker;
