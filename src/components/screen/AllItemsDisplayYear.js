import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { StyleSheet, View, Text } from "react-native";
import { MonthContext } from "../../store/MonthProvider";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { useContext } from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import { candleStickData } from "../computations/CandleStickData";
import { BarCandleChart } from "../elementaries/charts/BarCandle-Chart";
import { Title } from "react-native-paper";
import dateFormat from "dateformat";
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

const findBudget = (data, date) => {
  const budget = Array(12).fill(0);
  const d = new Date(date);

  data.forEach((element) => {
    const dt = new Date(element.date);
    for (let index = 0; index < 12; index++) {
      if (
        new Date(d.getFullYear(), d.getMonth() - (11 - index), 1).getTime() ===
        new Date(dt.getFullYear(), dt.getMonth(), 1).getTime()
      ) {
        budget[index] += +element.limit;
      }
    }
  });

  return budget;
};

export const AllItemsDisplayYear = () => {
  const monthCtx = useContext(MonthContext);
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const currencyCtx = useContext(CurrencyFormatContext);
  const unsummedExpenses = incExpCtx.getByYearUnsummed;
  const summedExpenses = incExpCtx.getByYearSummed;

  //const summedBudget = findBudget(unsummedExpenses, monthCtx.monthDate);

  const income = incExpCtx.getYearIncomeByMonth.map((element) => {
    return element.amount;
  });

  //console.log(income);

  const xVals = Array(12).fill(0);
  const yVals = Array(12).fill(0);

  summedExpenses.forEach((element) => {
    const dt = new Date(element.date);
    const d = new Date(monthCtx.monthDate);
    for (let index = 0; index < 12; index++) {
      if (
        new Date(d.getFullYear(), d.getMonth() - (11 - index), 1).getTime() ===
        new Date(dt.getFullYear(), dt.getMonth(), 1).getTime()
      ) {
        xVals[index] = `${dateFormat(dt, "mmm")} ${dateFormat(dt, "yy")}`;
        yVals[index] += element.amount;
      }
    }
  });

  const barValues1 = xyData(xVals, yVals);
  const budgetValues = xyData(xVals, income);
  //console.log(barValues1);

  const findMax = Math.max(...yVals.concat(income));
  const yMax = findMax + findMax * 0.1;

  const showValues = xVals;

  const csData = incExpCtx.getByYearSummed.map((element) => {
    return {
      date: new Date(element.date),
      amount: element.amount,
      budget: element.limit,
    };
  });

  const candleData = candleStickData(csData, monthCtx.monthDate);
  candleData.forEach((element) => {
    const mnth = dateFormat(element.x, "mmm");
    const yr = dateFormat(element.x, "yy");
    element.x = `${mnth} ${yr}`;
  });
  const csMax = Math.max(...candleData.map((mValue) => mValue.y));
  const csMin = Math.min(...candleData.map((mValue) => mValue.y));

  const lossProfit = candleData[candleData.length - 1].y;

  let lossProfitText = "Profit";
  if (lossProfit < 0) {
    lossProfitText = "Loss";
  }

  const image = require("../../../assets/images/money_jar.jpg");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {summedExpenses.length > 0 && (
          <View style={styles.secondContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>All</Title>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.text}>
                Total Spent:
                {toCurrency(
                  incExpCtx.getByYearTotal,
                  currencyCtx.getCurrencyCode
                )}
              </Text>
              {
                <Text
                  style={{
                    color: lossProfit < 0 ? "red" : "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {lossProfitText}:
                  {toCurrency(lossProfit, currencyCtx.getCurrencyCode)}
                </Text>
              }
            </View>
            <View style={styles.lineBarChart}>
              <LineBarChart
                title={"Monthly Spend vs. Income"}
                legendTitles={["Income", "Monthly"]}
                barValues1={barValues1}
                secondaryBars={false}
                budgetValues={budgetValues}
                maxValue={yMax}
                showValues={showValues}
                orientation={-33}
                showCumulative={false}
                axisName={"months"}
              />
            </View>

            <View style={styles.barCandlehart}>
              <BarCandleChart
                data={candleData}
                orientation={-33}
                maxValue={Math.max(csMax) + 0.1 * Math.max(csMax)}
                minValue={Math.min(csMin) - 0.1 * Math.min(csMin)}
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
    alignItems: "center",
  },
  titleContainer: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  totalContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "silver",
    opacity: 0.7,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    color: "white",
  },
  lineBarChart: {
    flex: 0.425,
    justifyContent: "center",
    alignItems: "center",
  },
  barCandlehart: {
    flex: 0.425,
    justifyContent: "center",
    alignItems: "center",
  },
});
