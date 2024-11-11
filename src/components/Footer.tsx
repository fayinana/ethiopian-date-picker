import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { GroupButton } from "../styles/DatePickerStyles";
import Button from "../ui/Button";

const Footer: FC = () => {
  const { selectedDate, togglePicker, setDate } = useDatePickerContext();

  function handleSubmit() {
    setDate(selectedDate);
    togglePicker();
  }
  return (
    <GroupButton>
      <Button variation="secondary" onClick={togglePicker}>
        Cancel
      </Button>
      <Button variation="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </GroupButton>
  );
};

export default Footer;
