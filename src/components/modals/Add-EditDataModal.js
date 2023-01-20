import { View, Modal, StyleSheet, Dimensions, Alert } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import dateFormat from "dateformat";
import { DatePicker } from "./DatePicker";

export const AddEditDataModal = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const [item, setItem] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  console.log(selectDate);

  const onSubmitHandler = () => {
    props.modalClose();
  };

  const onCancelHandler = () => {
    props.modalClose();
  };

  const itemMessage = "Insert type of expense or income";

  const onHelpPressed = (message) => {
    Alert.alert("Item", message);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.modalShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="ITEM"
                value={item}
                onChangeText={(item) => setItem(item)}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={false}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(itemMessage)}
              />
            </View>
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="DATE"
                value={dateFormat(selectDate, "fullDate")}
                editable={false}
                //onChangeText={(item) => setItem(item)}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={false}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="calendar-month"
                iconColor={"black"}
                size={20}
                onPress={() => <DatePicker date={new Date()} />}
              />
            </View>
            <View style={styles.rowFlex}>
              <Button
                mode="text"
                color="#2196F3"
                onPress={() => onSubmitHandler()}
              >
                SUBMIT
              </Button>
              <Button
                mode="text"
                color="#2196F3"
                onPress={() => onCancelHandler()}
              >
                CANCEL
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowFlex: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
