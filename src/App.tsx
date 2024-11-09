import { useState } from "react";
import Picker from "./components/Picker";

export default function App() {
  const [date, setDate] = useState<Date | null>(new Date());
  console.log(date);

  return (
    <div style={{ height: "10000px" }}>
      <Picker date={date} setDate={setDate} width="330px" height="350px">
        <Picker.Header />
        <Picker.Calendar />
        <Picker.Footer />
      </Picker>
    </div>
  );
}
