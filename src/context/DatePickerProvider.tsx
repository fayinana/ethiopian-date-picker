// src/components/DatePicker/DatePickerContext/DatePickerProvider.tsx
import React, { FC, ReactNode } from "react";
import { DatePickerContextType } from "./../types/index";
import { createContext } from "react";

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined
);

interface DatePickerProviderProps {
  children: ReactNode;
  value: DatePickerContextType;
}

export const DatePickerContextProvider: FC<DatePickerProviderProps> = ({
  children,
  value,
}) => {
  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "useDatePickerContext must be used within a DatePickerProvider"
    );
  }
  return context;
};
