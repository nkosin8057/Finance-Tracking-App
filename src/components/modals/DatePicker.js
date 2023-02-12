import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View } from "react-native";

export const Date_Picker = (props) => {
  const onCancelHandler = () => {
    props.onCancellation();
  };

  const handleConfirm = (date) => {
    props.onConfirmation(date);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={props.show}
        mode="date"
        date={props.setDate}
        onConfirm={handleConfirm}
        onCancel={onCancelHandler}
      />
    </View>
  );
};
