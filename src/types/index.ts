export interface DatePickerContextType {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToNextYear: () => void;
  goToPrevYear: () => void;
  isOpen: boolean;
  togglePicker: () => void;
  dateFormat: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  daysName: string[];
  navigateTo: (direction: string) => void;
  isAmharic?: boolean;
  primaryColor?: string; // Add primaryColor and other properties if missing
  secondaryColor?: string;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  isDarkMode?: boolean;
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
