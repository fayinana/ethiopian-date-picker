// App.tsx
import { useState } from "react";
import DatePicker from "./components/DatePicker";

export default function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div>
      <DatePicker
        date={date}
        setDate={setDate}
        primaryColor = ""
        secondaryColor= ""
        textColor=""
        bgColor=""
        fontFamily=""
        isAmharic
        isDarkMode
        >
      
        <DatePicker.Header />
        <DatePicker.Calendar/>
        <DatePicker.Footer />
      </DatePicker>
    </div>
  );
}
