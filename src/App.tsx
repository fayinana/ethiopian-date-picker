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
        primaryColor="#4ab2e2"
        secondaryColor="#f8f8f8"
        bgColor="#cdebf8"
        textColor="#0f0152"
        width="100px"
        height="200px"
      >
        <DatePicker.Header />
        <DatePicker.Calendar />
        <DatePicker.Footer />
      </DatePicker>
    </div>
  );
}
