import { useState } from "react";
import Picker from "./components/Picker";

export default function App() {
  const [date, setDate] = useState<Date | null>(new Date());
  console.log(date);

  return (
    <div>
      <Picker date={date} setDate={setDate}>
        <Picker.Header />
        <Picker.Calendar />
        <Picker.Footer />
      </Picker>
    </div>
  );
}
