Here's the full set of files for the `react-date-picker-library` project, with each file included according to your specified structure:

---

### Project Structure

```
react-date-picker-library/
├── src/
│   ├── components/
│   │   ├── DatePicker.tsx
│   │   ├── Calendar.tsx
│   │   ├── DayButton.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ToggleButton.tsx
│   ├── context/
│   │   └── DatePickerContext.tsx
│   ├── styles/
│   │   └── index.ts
│   ├── utils/
│   │   ├── dateHelpers.ts
│   │   ├── localization.ts
│   │   └── constants.ts
│   ├── index.ts
│   └── types.ts
└── package.json
```

---

### File: `DatePicker.tsx`

```tsx
// src/components/DatePicker.tsx
import React, { FC } from "react";
import { DatePickerProvider, useDatePickerContext } from "../context/DatePickerContext";
import ToggleButton from "./ToggleButton";
import Header from "./Header";
import Calendar from "./Calendar";
import Footer from "./Footer";
import { DatePickerContainer } from "../styles";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  primaryColor?: string;
  locale?: string;
  dayNames?: string[];
  showWeekNumbers?: boolean;
  headerFormat?: string;
  rangeSelection?: boolean;
  width?: string;
  height?: string;
  customStyles?: React.CSSProperties;
}

const DatePicker: FC<DatePickerProps> = ({
  date,
  setDate,
  primaryColor = "#4a90e2",
  locale = "en-US",
  dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  showWeekNumbers = false,
  headerFormat = "MMM yyyy",
  rangeSelection = false,
  width = "300px",
  height = "auto",
  customStyles = {},
}) => {
  return (
    <DatePickerProvider
      date={date}
      setDate={setDate}
      primaryColor={primaryColor}
      locale={locale}
      dayNames={dayNames}
      showWeekNumbers={showWeekNumbers}
      headerFormat={headerFormat}
      rangeSelection={rangeSelection}
    >
      <ToggleButton />
      <DatePickerContainer style={{ width, height, ...customStyles }}>
        <Header />
        <Calendar />
        <Footer />
      </DatePickerContainer>
    </DatePickerProvider>
  );
};

export default DatePicker;
```

---

### File: `Calendar.tsx`

```tsx
// src/components/Calendar.tsx
import React from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import DayButton from "./DayButton";
import { CalendarGrid } from "../styles";
import { generateCalendarDays } from "../utils/dateHelpers";

const Calendar = () => {
  const { selectedDate, dayNames } = useDatePickerContext();
  const days = generateCalendarDays(selectedDate);

  return (
    <CalendarGrid>
      {dayNames.map((day) => (
        <div key={day}>{day}</div>
      ))}
      {days.map((day, index) => (
        <DayButton key={index} day={day} />
      ))}
    </CalendarGrid>
  );
};

export default Calendar;
```

---

### File: `DayButton.tsx`

```tsx
// src/components/DayButton.tsx
import React from "react";
import { useDatePickerContext } from "../context/DatePickerContext";
import { DayButtonStyled } from "../styles";

interface DayButtonProps {
  day: Date;
}

const DayButton: React.FC<DayButtonProps> = ({ day }) => {
  const { setDate, selectedDate } = useDatePickerContext();

  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

  return (
    <DayButtonStyled isSelected={isSelected} onClick={() => setDate(day)}>
      {day.getDate()}
    </DayButtonStyled>
  );
};

export default DayButton;
```

---

### File: `Header.tsx`

```tsx
// src/components/Header.tsx
import React from "react";
import { useDatePickerContext } from "../context/DatePickerContext";

const Header = () => {
  const { selectedDate, headerFormat } = useDatePickerContext();

  return <div>{selectedDate ? selectedDate.toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "Select Date"}</div>;
};

export default Header;
```

---

### File: `Footer.tsx`

```tsx
// src/components/Footer.tsx
import React from "react";
import { useDatePickerContext } from "../context/DatePickerContext";

const Footer = () => {
  const { togglePicker } = useDatePickerContext();

  return (
    <button onClick={togglePicker}>
      Close
    </button>
  );
};

export default Footer;
```

---

### File: `ToggleButton.tsx`

```tsx
// src/components/ToggleButton.tsx
import React from "react";
import { useDatePickerContext } from "../context/DatePickerContext";

const ToggleButton = () => {
  const { togglePicker, isOpen } = useDatePickerContext();

  return (
    <button onClick={togglePicker}>
      {isOpen ? "Close" : "Open"} DatePicker
    </button>
  );
};

export default ToggleButton;
```

---

### File: `DatePickerContext.tsx`

```tsx
// src/context/DatePickerContext.tsx
import React, { createContext, useContext, useState, FC, ReactNode } from "react";
import { DatePickerContextType } from "../types";

const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) throw new Error("Must be used within a DatePickerProvider");
  return context;
};

interface DatePickerProviderProps {
  children: ReactNode;
  date: Date | null;
  setDate: (date: Date | null) => void;
  locale: string;
  primaryColor: string;
  dayNames: string[];
  showWeekNumbers: boolean;
  headerFormat: string;
  rangeSelection: boolean;
}

export const DatePickerProvider: FC<DatePickerProviderProps> = ({
  children,
  date,
  setDate,
  locale,
  primaryColor,
  dayNames,
  showWeekNumbers,
  headerFormat,
  rangeSelection,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => setIsOpen((prev) => !prev);

  const value = {
    selectedDate,
    setSelectedDate,
    isOpen,
    togglePicker,
    locale,
    primaryColor,
    dayNames,
    showWeekNumbers,
    headerFormat,
    rangeSelection,
    setDate,
  };

  return <DatePickerContext.Provider value={value}>{children}</DatePickerContext.Provider>;
};
```

---

### File: `dateHelpers.ts`

```tsx
// src/utils/dateHelpers.ts
import { addDays, startOfMonth } from "date-fns";

export const generateCalendarDays = (currentDate: Date) => {
  const startDay = startOfMonth(currentDate);
  const days = Array.from({ length: 42 }, (_, i) => addDays(startDay, i));
  return days;
};
```

---

### File: `localization.ts`

```tsx
// src/utils/localization.ts
export const getDayNames = (locale: string): string[] => {
  const baseDate = new Date(Date.UTC(2021, 5, 5));
  const dayNames = Array.from({ length: 7 }).map((_, i) =>
    baseDate.toLocaleDateString(locale, { weekday: "short" })
  );
  return dayNames;
};
```

---

### File: `constants.ts`

```tsx
// src/utils/constants.ts
export const DEFAULT_PRIMARY_COLOR = "#4a90e2";
```

---

### File: `types.ts`

```tsx
// src/types.ts
export type LocalizationType = {
  locale: string;
  dayNames: string[];
};

export interface DatePickerContextType extends LocalizationType {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  isOpen: boolean;
  togglePicker: () => void;
  primaryColor: string;
  showWeekNumbers: boolean;
  headerFormat: string;
  rangeSelection: boolean;
  setDate: (date: Date | null) => void;
}
```

---

### File: `index.ts` (Main export for the library)

```tsx
// src/index.ts
export { default as DatePicker } from "./components/DatePicker";
```

---

### File: `index.ts` (Styled Components)

```tsx
// src/styles/index.ts
import styled from "styled-components";

export const DatePickerContainer = styled.div`
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(

0, 0, 0, 0.1);
  padding: 16px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const DayButtonStyled = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.primaryColor : "transparent"};
  border: none;
  border-radius: 50%;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")};
  cursor: pointer;
  padding: 8px;
`;
```

---

### File: `package.json`

```json
{
  "name": "react-date-picker-library",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "scripts": {
    "build": "tsc && rollup -c",
    "test": "jest",
    "start": "rollup -c -w"
  },
  "dependencies": {
    "date-fns": "^2.24.0",
    "react": "^17.0.2",
    "styled-components": "^5.3.1"
  },
  "devDependencies": {
    "typescript": "^4.3.5",
    "rollup": "^2.52.7",
    "jest": "^27.0.6"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "styled-components": "^5.3.1"
  }
}
```