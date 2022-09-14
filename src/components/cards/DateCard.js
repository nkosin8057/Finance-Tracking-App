import { Button, IconButton } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { MonthYearPicker } from "../ui/menus/MonthYearPicker";
import { useState, useContext } from "react";
import { MonthContext } from "../../store/MonthProvider";

export const DateCard = () => {
  const [showModal, setShowModal] = useState(false);
  const monthCtx = useContext(MonthContext);
  const monthName = monthCtx.monthDate.toLocaleString("default", {
    month: "long",
  });
  const year = monthCtx.monthDate.getFullYear();

  const modalCloseHandler = () => {
    setShowModal(false);
    //console.log("called");
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowFlex}>
        <Text style={styles.text}>{`${monthName} ${year}`}</Text>
        <IconButton
          icon="calendar-month"
          size={30}
          color={"white"}
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
      <MonthYearPicker modalShow={showModal} modalClose={modalCloseHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 40,
    width: "60%",
    elevation: 3,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  rowFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
});
