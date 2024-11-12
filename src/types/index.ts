export interface DatePickerContextType {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | string | null) => void;
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
  daysName: string[];
  primaryColor: string;
  secondaryColor: string;
  navigateTo: (direction: string) => void; // Add the navigateTo function here
}

export interface PickerProps {
  children: React.ReactNode;
  date: Date | string | null;
  setDate: (date: Date | string | null) => void;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  daysName?: string[];
  theme?: object;
  onDateChange?: (date: Date | string | null) => void;
  primaryColor?: string;
  secondaryColor?: string;
}

export type Variation = "primary" | "secondary";
