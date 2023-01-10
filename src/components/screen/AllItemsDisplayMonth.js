import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Text,
} from "react-native";
import { Title } from "react-native-paper";
import { MonthContext } from "../../store/MonthProvider";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { useContext } from "react";
import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { TotalSummaryCard } from "../elementaries/cards/TotalSummaryCard";
import { SingleItemExpenseCard } from "../elementaries/cards/SingleItemExpenseCard";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { toCurrency } from "../computations/ToCurrency";

const xyData = (xData, yData) => {
  let element = [];

  for (let index = 0; index < xData.length; index++) {
    let obj = { x: 0, y: 0 };
    obj.x = xData[index];
    obj.y = yData[index];
    element.push(obj);
  }
  return element;
};

const mockDescription =
  "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description";

export const AllItemDisplayMonth = () => {
  const monthCtx = useContext(MonthContext);
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const currencyCtx = useContext(CurrencyFormatContext);
  let expenses = [];

  const monthEndDay = new Date(
    monthCtx.monthDate.getFullYear(),
    monthCtx.monthDate.getMonth() + 1,
    0
  ).getDate();

  let xVals = [];
  for (let index = 1; index <= monthEndDay; index++) {
    xVals.push(index);
  }

  expenses = incExpCtx.getByMonthUnsummed;

  let yVals = [];
  const budget = [];
  xVals.forEach((xElement) => {
    yVals.push(0);
    if (expenses.length > 0) {
      budget.push(incExpCtx.getIncomeByMonth);
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

  const totalSpent = expenses.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  let profitLoss = 0;

  if (expenses.length > 0) {
    profitLoss = incExpCtx.getIncomeByMonth - totalSpent;
  }

  let lossProfitText = "Profit";
  if (profitLoss < 0) {
    lossProfitText = "Loss";
  }

  const renderItem = ({ item }) => (
    <SingleItemExpenseCard
      item={item.item}
      date={item.date}
      amount={item.amount}
      description={mockDescription}
    />
  );

  const barValues1 = xyData(xVals, yVals);

  let cumSum = [];
  yVals.reduce((prev, curr, i) => (cumSum[i] = prev + curr), 0);
  const cumulative = xyData(xVals, cumSum);

  const budgetValues = xyData(xVals, budget);

  const findMax = Math.max(...cumSum.concat(yVals, budget));
  const yMax = findMax + findMax * 0.1;

  const image = require("../../../assets/images/money_jar.jpg");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {expenses.length > 0 && (
          <View style={styles.secondContainer}>
            <View style={styles.totalSummaryContainer}>
              <Text style={styles.text}>
                Total Spent:{" "}
                {toCurrency(totalSpent, currencyCtx.getCurrencyCode)}
              </Text>
              {
                <Text
                  style={{
                    color: profitLoss < 0 ? "red" : "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {lossProfitText}:{" "}
                  {toCurrency(profitLoss, currencyCtx.getCurrencyCode)}
                </Text>
              }
            </View>

            <View style={styles.chartContainer}>
              <LineBarChart
                title={"Daily Spend vs. Income"}
                legendTitles={["Income", "Cumulative", "Daily"]}
                barValues1={barValues1}
                secondaryBars={false}
                budgetValues={budgetValues}
                cumulative={cumulative}
                maxValue={yMax}
                showValues={showValues}
                orientation={0}
                showCumulative={true}
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
    //alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  totalSummaryContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "silver",
    opacity: 0.7,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
  },
  chartContainer: {
    flex: 0.45,
  },
  listContainer: {
    flex: 0.45,
    width: "100%",
  },
});
