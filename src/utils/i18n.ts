To transform your code into a React date picker library that's polished and ready for use in the React community, follow these steps and add the necessary functionality:

### Steps to Create a React Date Picker Library

1. **Project Structure**: Organize your project into a clean folder structure.
2. **Customizable Props**: Expose props for customizations like `primaryColor`, `secondaryColor`, `locale`, `showWeekNumbers`, and `headerFormat`.
3. **Context Management**: Ensure the context and provider are correctly set up.
4. **Accessibility**: Add ARIA roles and keyboard navigation.
5. **Internationalization**: Support different locales using libraries like `date-fns` or `moment`.
6. **Range Selection**: Add support for selecting date ranges.
7. **State Management**: Separate state management logic to keep components clean.
8. **Styling**: Use styled-components for consistent theming.
9. **Event Handlers**: Provide event handlers like `onChange`, `onOpen`, and `onClose`.
10. **Documentation**: Create thorough documentation and examples.
11. **Packaging**: Use Rollup or Vite for optimized builds.
12. **Testing**: Implement unit tests with Jest and visual tests with Cypress.

### Example Implementation of Components

Let's create the components based on your existing structure and additional functionalities.

### `DatePicker.tsx`
```typescript
// src/components/DatePicker/DatePicker.tsx
import React, { FC, useEffect, useState, useCallback } from "react";
import { StyledContainer } from "../styles";
import { DatePickerContextProvider } from "../context/DatePickerContext";
import { PickerProps } from "../types";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation"; // Import the keyboard navigation hook

const DatePicker: FC<PickerProps> & {
  Header: FC;
  Calendar: FC;
  Day: FC<{ day: number | null }>;
  Footer: FC;
} = ({
  children,
  date,
  setDate,
  width = "100%",
  height = "100%",
  style = {},
  className = '',
  daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  primaryColor = "#4a90e2",
  secondaryColor = "#0066cc",
  onDateChange,
}) => {
  const dateValue = new Date(date || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<Date>(dateValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dateFormat = "MM/dd/yyyy";

  const togglePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const contextValue = {
    selectedDate,
    setSelectedDate,
    displayDate,
    setDisplayDate,
    isOpen,
    togglePicker,
    dateFormat,
    date,
    setDate,
    position,
    setPosition,
    daysName,
    primaryColor,
    secondaryColor,
  };

  useEffect(() => {
    if (onDateChange && selectedDate) {
      onDateChange(selectedDate);
    }
  }, [selectedDate, onDateChange]);

  useKeyboardNavigation();

  return (
    <DatePickerContextProvider value={contextValue}>
      {isOpen && (
        <StyledContainer
          style={{ ...style }}
          height={height}
          width={width}
          position={position}
          className={className}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        >
          {children}
        </StyledContainer>
      )}
    </DatePickerContextProvider>
  );
};

export default DatePicker;
```

### `Header.tsx`
```typescript
// src/components/DatePicker/Header.tsx
import React, { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import { StyledHeader, HeaderButton } from "../styles";

const Header: FC = () => {
  const {
    displayDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    primaryColor,
    secondaryColor,
  } = useDatePickerContext();

  return (
    <StyledHeader>
      <HeaderButton onClick={goToPrevYear} primaryColor={primaryColor} secondaryColor={secondaryColor}>&larr;</HeaderButton>
      <HeaderButton onClick={goToPrevMonth} primaryColor={primaryColor} secondaryColor={secondaryColor}>&larr;</HeaderButton>
      <span>
        {displayDate.toLocaleDateString("default", { month: "long", year: "numeric" })}
      </span>
      <HeaderButton onClick={goToNextMonth} primaryColor={primaryColor} secondaryColor={secondaryColor}>&rarr;</HeaderButton>
      <HeaderButton onClick={goToNextYear} primaryColor={primaryColor} secondaryColor={secondaryColor}>&rarr;</HeaderButton>
    </StyledHeader>
  );
};

export default Header;
```

### `Calendar.tsx`
```typescript
// src/components/DatePicker/Calendar.tsx
import React, { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import { WeekDays } from "../styles";
import DayButton from "./DayButton";

const Calendar: FC = () => {
  const { displayDate, daysName } = useDatePickerContext();
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

  const days = Array.from({ length: 42 }, (_, index) => {
    const day = index - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <WeekDays>
      {daysName.map((d) => (
        <span key={d}>{d}</span>
      ))}
      {days.map((day, index) => (
        <DayButton key={index} day={day} />
      ))}
    </WeekDays>
  );
};

export default Calendar;
```

### `DayButton.tsx`
```typescript
// src/components/DatePicker/DayButton.tsx
import React, { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import { DayButtonStyled } from "../styles";

interface DayProps {
  day: number | null;
}

const DayButton: FC<DayProps> = ({ day }) => {
  const { displayDate, selectedDate, setSelectedDate, primaryColor, secondaryColor } = useDatePickerContext();
  const isActive =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === displayDate.getMonth() &&
    selectedDate?.getFullYear() === displayDate.getFullYear();

  return (
    <DayButtonStyled
      active={isActive}
      onClick={() =>
        day &&
        setSelectedDate(
          new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
        )
      }
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      {day || ""}
    </DayButtonStyled>
  );
};

export default DayButton;
```

### `Footer.tsx`
```typescript
// src/components/DatePicker/Footer.tsx
import React, { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import { GroupButton } from "../styles";
import Button from "../ui/Button"; // Assuming you have a Button component in the ui folder

const Footer: FC = () => {
  const { selectedDate, togglePicker, setDate, primaryColor, secondaryColor } = useDatePickerContext();

  function handleSubmit() {
    setDate(selectedDate);
    togglePicker();
  }

  return (
    <GroupButton primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <Button variation="secondary" onClick={togglePicker} color={secondaryColor}>
        Cancel
      </Button>
      <Button variation="primary" onClick={handleSubmit} color={primaryColor}>
        Submit
      </Button>
    </GroupButton>
  );
};

export default Footer;
```

### `ToggleButton.tsx`
```typescript
// src/components/DatePicker/ToggleButton.tsx
import React, { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerContext";

const ToggleButton: FC = () => {
  const { togglePicker, setPosition, selectedDate, displayDate } = useDatePickerContext();

  const [{ day, month, year }, setInputDate] = React.useState({
    day: new Date(selectedDate)?.getDay() || "",
    month: new Date(displayDate)?.getMonth() || "",
    year: new Date(displayDate)?.getFullYear() || "",
  });

  React.useEffect(() => {
    setInputDate({
      day: new Date(selectedDate)?.getDate(),
      month: new Date(displayDate)?.getMonth(),
      year: new Date(displayDate)?.getFullYear(),
    });
  }, [displayDate, selectedDate]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    togglePicker();
    setPosition({
      x: rect.left