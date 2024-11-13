import { FC } from "react";
import { useDatePickerContext } from "../context/DatePickerProvider";
import { GroupButton,FooterButton } from "../styles/DatePickerStyles";

const Footer: FC = () => {
  const { selectedDate, togglePicker, setDate } = useDatePickerContext();

  function handleSubmit() {
    setDate(selectedDate);
    togglePicker();
  }
  return (
    <GroupButton>
      <FooterButton variation="secondary" onClick={togglePicker}>
        Cancel
      </FooterButton>
      <FooterButton variation="primary" onClick={handleSubmit}>
        Set
      </FooterButton>
    </GroupButton>
  );
};

export default Footer;
