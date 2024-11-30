// App.tsx
import { useState } from "react";
import DatePicker from "./components/DatePicker";

// Main App component
export default function App() {
  // State to store the selected date
  const [date, setDate] = useState<Date | null>(new Date());

  // Extracting day, month, and year from the selected date
  const day = date ? date.getDate() : "";
  const month = date ? date.getMonth() + 1 : ""; // Months are zero-indexed
  const year = date ? date.getFullYear() : "";

  return (
    <div>
      {/* Rendering the DatePicker component with the necessary props */}
      <DatePicker
        date={date} // The selected date
        setDate={setDate} // Function to update the selected date
        primaryColor="" // Primary color (optional)
        secondaryColor="" // Secondary color (optional)
        textColor="" // Text color (optional)
        bgColor="" // Background color (optional)
        fontFamily="" // Font family (optional)
        // isDarkMode // Dark Mode (optional)
        // isAmharic // Language Amahric (optional)
        input={ // Custom input component to display the selected date
          <>
            <input
              type="text"
              value={`${day}/${month}/${year}`} // Display the date in "DD/MM/YYYY" format
              readOnly
              style={{
                border: "none",
                outline: "none",
                fontSize: "1rem",
                width: "100%",
                background: "transparent",
                color: "#333",
                cursor: "default",
              }}
            />
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icon button for opening the date picker */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#25aba6"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V10h14v9zm0-11H5V5h14v3z" />
              </svg>
            </button>
          </>
        }
      >
        {/* Rendering the subcomponents for the DatePicker */}
        <DatePicker.Header />
        <DatePicker.Calendar />
        <DatePicker.Footer />
      </DatePicker>
    </div>
  );
}

