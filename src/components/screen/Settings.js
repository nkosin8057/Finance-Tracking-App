import { getSupportedCurrencies } from "react-native-format-currency";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useContext } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";

export const Settings = () => {
  const currencyCtx = useContext(CurrencyFormatContext);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedDay, setSelectedDay] = useState();
  const currencyData = [];
  const dayData = [];
  let i = 0;

  for (let index = 1; index <= 31; index++) {
    let obj = {
      key: index,
      value: +index,
    };
    dayData.push(obj);
  }

  getSupportedCurrencies().forEach((element) => {
    let obj = {
      key: i,
      value: element.name,
      code: element.code,
    };

    currencyData.push(obj);
    i += 1;
  });

  const defaultOptionIndex = currencyData.findIndex((element) => {
    element.code === currencyCtx.getCurrencyCode;
  });

  const onSelectCurrencyHandler = (selection) => {
    currencyCtx.setCurrencyCode(currencyData[selection].code);
  };

  const onSelectDayHandler = (selection) => {
    //currencyCtx.setCurrencyCode(currencyData[selection].code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>SETTING</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Currency:</Text>
          <SelectList
            setSelected={(val) => setSelectedCurrency(val)}
            data={currencyData}
            save="key"
            onSelect={() => onSelectCurrencyHandler(selectedCurrency)}
            placeholder="Select Currency"
            defaultOption={currencyData[defaultOptionIndex]}
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
          <Text style={styles.itemText}>Start Period:</Text>
          <SelectList
            setSelected={(val) => setSelectedDay(val)}
            data={dayData}
            save="value"
            onSelect={() => onSelectDayHandler(selectedDay)}
            placeholder="Select Start Day"
            defaultOption={1}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(180, 194, 213, 0.9)",
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
    width: "90%",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "rgba(180, 194, 213, 0.9)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 20,
  },
});
