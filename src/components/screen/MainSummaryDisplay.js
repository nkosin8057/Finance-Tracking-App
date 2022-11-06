import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
} from "react-native";
import { ExpenseCard } from "../elementaries/cards/ExpenseCard";
import { mockExpenses, mockIncome } from "./MockData";
import { TotalSummaryCard } from "../elementaries/cards/TotalSummaryCard";
import { InfoCircularCard } from "../elementaries/cards/InfoCircularCard";
import { Title } from "react-native-paper";
import { WheelPickerDisplay } from "../modals/WheelPicker";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { useContext, useEffect, useState } from "react";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { MonthContext } from "../../store/MonthProvider";

export const MainSummaryDisplay = ({ navigation }) => {
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const monthCtx = useContext(MonthContext);
  const [name, setName] = useState("");

  useEffect(() => {
    incExpCtx.setGetByMonth(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  useEffect(() => {
    incExpCtx.setGetItemByMonth(name, monthCtx.monthDate);
  }, [name]);

  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  const renderItem = ({ item }) => (
    <ExpenseCard
      name={item.item}
      amount={item.amount}
      limit={item.limit}
      type={item.type}
      income={incExpCtx.getIncomeByMonth}
      onButtonSelected={onButtonSelected}
    />
  );

  const onButtonSelected = (selection) => {
    setName(selection);
    navigation.navigate("Single-Item");
  };

  //console.log(incExpCtx.getByMonthSummed);
  console.log(incExpCtx.getItemByMonth);

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <DateMenu />
        </View>
        <View style={styles.circularDisplayContainer}>
          <InfoCircularCard
            title={"Income"}
            value={formatter.format(incExpCtx.getIncomeByMonth)}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Fixed Expenses"}
            value={formatter.format(incExpCtx.getFixedTotalMonth)}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Variable Expenses"}
            value={formatter.format(incExpCtx.getVariableTotalMonth)}
            textColour={"#FFFFFF"}
          />
        </View>
        <View style={styles.totalSummaryContainer}>
          <TotalSummaryCard
            spent={incExpCtx.getTotalByMonth}
            total={incExpCtx.getIncomeByMonth}
          />
        </View>
        <View style={styles.listContainer}>
          <Title style={styles.titleText}>EXPENSES</Title>
          <FlatList
            data={incExpCtx.getByMonthSummed}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 5 }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
    // flexDirection: "column",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingLeft: 10,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  dateDisplayContainer: {
    flex: 0.05,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  circularDisplayContainer: {
    flexDirection: "row",
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  totalSummaryContainer: {
    width: "100%",
    flex: 0.2,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    flex: 0.55,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
});
