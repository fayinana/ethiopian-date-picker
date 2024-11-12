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
        width="300px"
        height="300px"
        >
      
        <DatePicker.Header />
        <DatePicker.Calendar />
        <DatePicker.Footer />
      </DatePicker>
    </div>
  );
}
