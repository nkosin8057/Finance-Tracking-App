import { View, Modal, StyleSheet } from "react-native";
import { WheelPickerDisplay } from "./WheelPicker";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { MonthContext } from "../../store/MonthProvider";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MonthYearPicker = (props) => {
  const monthCtx = useContext(MonthContext);

  let year = [];
  const yearDiff =
    monthCtx.endMonth.getFullYear() - monthCtx.startMonth.getFullYear() + 1;

  for (let index = 0; index < yearDiff; index++) {
    year.push(monthCtx.startMonth.getFullYear() + index);
  }

  let monthIndex = monthCtx.monthDate.getMonth();
  const getMonthHandler = (index) => {
    monthIndex = index;
    console.log(monthIndex);
  };

  let yearIndex = year.findIndex((yr) => {
    return yr === monthCtx.monthDate.getFullYear();
  });
  const getYearHandler = (index) => {
    yearIndex = index;
    console.log(monthIndex);
  };

  const onSubmitHandler = () => {
    monthCtx.setMonth(new Date(year[yearIndex], monthIndex));
    props.modalClose();
  };

  const onCancelHandler = () => {
    props.modalClose();
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.modalShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rowFlex}>
              <WheelPickerDisplay
                index={monthIndex}
                data={months}
                getSelectedValue={getMonthHandler}
              />
              <View style={styles.wheelPickerComp}>
                <WheelPickerDisplay
                  index={yearIndex}
                  data={year}
                  getSelectedValue={getYearHandler}
                />
              </View>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  },
  wheelPickerComp: {
    marginLeft: 15,
  },
});