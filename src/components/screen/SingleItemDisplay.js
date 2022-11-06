import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import { Title } from "react-native-paper";
import { MonthContext } from "../../store/MonthProvider";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { useContext, useEffect } from "react";
import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { TotalSummaryCard } from "../elementaries/cards/TotalSummaryCard";
import { SingleItemExpenseCard } from "../elementaries/cards/SingleItemExpenseCard";

const mockDescription =
  "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description";

export const SingleItemDisplay = () => {
  const monthCtx = useContext(MonthContext);
  const incExpCtx = useContext(IncomeExpensesDataContext);
  let expenses = [];
  // useEffect(() => {
  //   incExpCtx.setGetByMonth(monthCtx.monthDate);
  // }, [monthCtx.monthDate]);

  const monthEndDay = new Date(
    monthCtx.monthDate.getFullYear(),
    monthCtx.monthDate.getMonth() + 1,
    0
  ).getDate();

  let xVals = [];
  for (let index = 1; index <= monthEndDay; index++) {
    xVals.push(index);
  }

  // const expenses = incExpCtx.getByMonthUnsummed.filter((item) => {
  //   return item.item === "Groceries";
  // });

  expenses = incExpCtx.getItemByMonth;

  let yVals = [];
  let budget = [];
  xVals.forEach((xElement) => {
    yVals.push(0);
    if (expenses.length > 0) {
      budget.push(expenses[0].limit);
    }

    expenses.forEach((yElement) => {
      if (new Date(yElement.date).getDate() === xElement) {
        yVals[xElement - 1] += yElement.amount;
      }
    });
  });

  const showValues = [];
  xVals.forEach((element) => {
    if (element % 2 !== 0) {
      showValues.push(element);
    }
  });

  const expenseTotal = expenses.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  const renderItem = ({ item }) => (
    <SingleItemExpenseCard
      date={item.date}
      amount={item.amount}
      description={mockDescription}
    />
  );

  const image = require("../../assets/images/money_jar.jpg");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {expenses.length > 0 && (
          <View style={styles.secondContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{expenses[0].item}</Title>
            </View>
            <View style={styles.totalSummaryContainer}>
              <TotalSummaryCard
                spent={expenseTotal}
                total={expenses[0].limit}
              />
            </View>

            <View style={styles.chartContainer}>
              <LineBarChart
                xValues={xVals}
                yValues={yVals}
                budgetValues={budget}
                showValues={showValues}
              />
            </View>

            <View style={styles.listContainer}>
              <FlatList
                data={expenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID}
                contentContainerStyle={{ padding: 5 }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  secondContainer: {
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    flex: 0.1,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    paddingTop: 40,
    paddingBottom: 10,
    color: "white",
  },
  totalSummaryContainer: {
    width: "100%",
    flex: 0.2,
    marginBottom: 10,
    alignSelf: "center",
  },
  chartContainer: {
    flex: 0.3,
  },
  listContainer: {
    flex: 0.4,
  },
});
