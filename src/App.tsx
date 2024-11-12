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
        primaryColor="#e2544a"
        secondaryColor="#534b4b"
        bgColor="#1c6b8d"
        textColor="#a79ddb"
        width="1000px"
        height="1000px"
      >
        <DatePicker.Header />
        <DatePicker.Calendar />
        <DatePicker.Footer />
      </DatePicker>

      <DatePicker
        date={date}
        setDate={setDate}
        primaryColor="#46abc2"
        secondaryColor="#f5f5f5"
        bgColor="#f9f9f9"
        textColor="#3318b7"
        width="100px"
        height="100px"
      >
        <DatePicker.Header />
        <DatePicker.Calendar />
        <DatePicker.Footer />
      </DatePicker>
    </div>
  );
}
