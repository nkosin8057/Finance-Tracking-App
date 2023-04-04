import { getSupportedCurrencies } from "react-native-format-currency";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useContext } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";

export const Settings = () => {
  const currencyCtx = useContext(CurrencyFormatContext);
  const [selected, setSelected] = useState("");
  const data = [];
  let i = 0;

  getSupportedCurrencies().forEach((element) => {
    let obj = {
      key: i,
      value: element.name,
      code: element.code,
    };

    data.push(obj);
    i += 1;
  });

  const defaultOptionIndex = data.findIndex((element) => {
    element.code === currencyCtx.getCurrencyCode;
  });

  const onSelectHandler = (selection) => {
    currencyCtx.setCurrencyCode(data[selection].code);
    //console.log(data[selection].code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Currency:</Text>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="key"
            onSelect={() => onSelectHandler(selected)}
            placeholder="Select Currency"
            defaultOption={data[defaultOptionIndex]}
            boxStyles={{
              borderRadius: 20,
              borderColor: "grey",
              width: 200,
              justifyContent: "center",
            }}
            inputStyles={{ fontWeight: "bold" }}
            dropdownStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Month Period:</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "400",
  },
  secondContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
