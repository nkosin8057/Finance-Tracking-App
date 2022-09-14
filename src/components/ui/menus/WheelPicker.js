import React, { useState } from "react";
import WheelPicker from "react-native-wheely";
import { StyleSheet } from "react-native";

export const WheelPickerDisplay = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChangeHandler = (index) => {
    setSelectedIndex(index);
    props.getSelectedValue(index);
    // console.log(selectedValue);
  };

  return (
    <WheelPicker
      selectedIndex={selectedIndex}
      options={props.data}
      onChange={(index) => onChangeHandler(index)}
      containerStyle={styles.container}
      selectedIndicatorStyle={styles.item}
      itemTextStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  item: {
    backgroundColor: "white",
    borderBottomColor: "#2196F3",
    borderTopColor: "#2196F3",
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
});
