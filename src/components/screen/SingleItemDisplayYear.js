import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { StyleSheet, View, Text } from "react-native";
import { MonthContext } from "../../store/MonthProvider";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import { candleStickData } from "../computations/CandleStickData";
import { BarCandleChart } from "../elementaries/charts/BarCandle-Chart";
import { Title } from "react-native-paper";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { toCurrency } from "../computations/ToCurrency";
import { monthName } from "../computations/MonthName";
import dateFormat from "dateformat";
import { db } from "../../../firebaseConfig";
import {
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

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

export const SingleItemDisplayYear = (props) => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [expenses, setExpenses] = useState([]);

  const dbRef = collection(db, "financeData");

  const fetchDataHandler = async (mnth) => {
    const mStart = new Date(mnth.getFullYear(), mnth.getMonth() - 11, 1);
    const mEnd = new Date(mnth.getFullYear(), mnth.getMonth() + 1, 0);
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(mStart))),
      where("date", "<=", Timestamp.fromDate(new Date(mEnd))),
      where("item", "==", props.props.toString())
    );
    onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map((doc) => {
        return { ...doc.data(), date: doc.data().date.toDate() };
      });
      setExpenses(res);
    });
  };

  useEffect(() => {
    fetchDataHandler(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  const expenseSum = expenses.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  let xVals = [];
  let yVals = [];
  let budget = [];

  expenses.forEach((element) => {
    const mnth = monthName(element.date);
    const yr = dateFormat(element.date, "yy");
    xVals.push(`${mnth} ${yr}`);
    yVals.push(element.amount);
    budget.push(element.budget);
  });

  const barValues1 = xyData(xVals, yVals);
  const budgetValues = xyData(xVals, budget);

  const findMax = Math.max(...yVals.concat(budget));
  const yMax = findMax + findMax * 0.1;

  const showValues = xVals;

  const csData = expenses.map((element) => {
    return {
      date: new Date(element.date),
      amount: element.amount,
      budget: element.budget,
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
        {expenses.length > 0 && (
          <View style={styles.secondContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{expenses[0].item}</Title>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.text}>
                Total Spent:
                {toCurrency(expenseSum, currencyCtx.getCurrencyCode)}
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
                title={"Monthly Spend vs. Budget"}
                legendTitles={["Budget", "Monthly"]}
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
