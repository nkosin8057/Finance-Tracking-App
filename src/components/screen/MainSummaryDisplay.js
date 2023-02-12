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
import { Title, FAB } from "react-native-paper";
import { WheelPickerDisplay } from "../modals/WheelPicker";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { useContext, useEffect, useState } from "react";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { MonthContext } from "../../store/MonthProvider";
import { toCurrency } from "../computations/ToCurrency";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";

export const MainSummaryDisplay = ({ navigation }) => {
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);
  const [name, setName] = useState("");

  useEffect(() => {
    incExpCtx.setGetByMonth(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  useEffect(() => {
    incExpCtx.setGetSingleItem(name, monthCtx.monthDate);
  }, [name]);

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
    navigation.navigate("SingleItem");
  };

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <DateMenu />
        </View>
        <View style={styles.circularDisplayContainer}>
          <InfoCircularCard
            title={"Income"}
            value={toCurrency(
              incExpCtx.getIncomeByMonth,
              currencyCtx.getCurrencyCode
            )}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Fixed Expenses"}
            value={toCurrency(
              incExpCtx.getFixedTotalMonth,
              currencyCtx.getCurrencyCode
            )}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Variable Expenses"}
            value={toCurrency(
              incExpCtx.getVariableTotalMonth,
              currencyCtx.getCurrencyCode
            )}
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
        <FAB
          icon="plus"
          style={styles.fab}
          color={"black"}
          small
          onPress={() => console.log("Pressed")}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    backgroundColor: "white",
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
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
