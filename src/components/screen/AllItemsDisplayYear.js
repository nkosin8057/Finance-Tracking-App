import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { StyleSheet, View, Text } from "react-native";
import { MonthContext } from "../../store/MonthProvider";
import { useContext, useState, useEffect } from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import { candleStickData } from "../computations/CandleStickData";
import { BarCandleChart } from "../elementaries/charts/BarCandle-Chart";
import dateFormat from "dateformat";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { toCurrency } from "../computations/ToCurrency";
import { objectItemSum, sumData } from "../computations/SumData";
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

const sumByMonth = (dStart, dEnd, sumValues) => {
  let summed = Array(12).fill(0);
  sumValues.forEach((element) => {
    for (let index = 0; index < dStart.length; index++) {
      let dt = new Date(
        new Date(element.date).getFullYear(),
        new Date(element.date).getMonth(),
        new Date(element.date).getDate()
      );

      if (
        dt.getTime() >= dStart[index].getTime() &&
        dt.getTime() <= dEnd[index].getTime()
      ) {
        summed[index] += +element.amount;
      }
    }
  });

  return summed;
};

export const AllItemsDisplayYear = () => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(true);

  const setDate = new Date(monthCtx.monthDate);
  const dbRef = collection(db, "financeData");

  const fetchDataHandler = async () => {
    const mnth = new Date(monthCtx.monthDate);
    const mStart = new Date(
      mnth.getFullYear(),
      mnth.getMonth() - 11,
      mnth.getDate()
    );
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(mStart))),
      where("date", "<", Timestamp.fromDate(new Date(mnth)))
    );
    onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map((doc) => {
        return { ...doc.data(), date: doc.data().date.toDate(), id: doc.id };
      });
      if (res.length === 0) {
        setNoData(true);
      } else {
        setData(res);
        setNoData(false);
      }
    });
  };

  useEffect(() => {
    fetchDataHandler();
  }, [monthCtx.monthDate]);

  const income = [];
  const expenses = [];
  for (let index = 0; index < data.length; index++) {
    if (data[index].type === "income") {
      income.push(data[index]);
    }

    if (
      data[index].type === "exp-fixed" ||
      data[index].type === "exp-variable"
    ) {
      expenses.push(data[index]);
    }
  }
  expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  income.sort((a, b) => new Date(a.date) - new Date(b.date));

  const expenseSum = sumData(expenses, "expenses");
  const incomeSum = sumData(income, "income");

  const yVals = Array(12).fill(0);

  let xVals = [];
  let dValsStart = [];
  let dValsEnd = [];

  for (let index = 0; index < 12; index++) {
    let d = new Date(
      setDate.getFullYear(),
      setDate.getMonth() - (11 - index),
      1
    );
    xVals.push(`${dateFormat(d, "mmm")} ${dateFormat(d, "yy")}`);
    dValsStart.push(
      new Date(
        new Date(monthCtx.periodStart).getFullYear(),
        new Date(monthCtx.periodStart).getMonth() - (11 - index),
        new Date(monthCtx.periodStart).getDate()
      )
    );
    dValsEnd.push(
      new Date(
        new Date(monthCtx.periodEnd).getFullYear(),
        new Date(monthCtx.periodEnd).getMonth() - (11 - index),
        new Date(monthCtx.periodEnd).getDate()
      )
    );
  }

  const summedExpenses = sumByMonth(dValsStart, dValsEnd, expenses);
  const incomeSummed = sumByMonth(dValsStart, dValsEnd, income);

  const barValues1 = xyData(xVals, summedExpenses);
  const budgetValues = xyData(xVals, incomeSummed);

  const findMax = Math.max(...summedExpenses.concat(incomeSummed));
  const yMax = findMax + findMax * 0.1;

  const showValues = xVals;
  const sumExp = objectItemSum(expenses);
  const csData = sumExp.map((element) => {
    return {
      date: new Date(element.date),
      amount: +element.amount,
      budget: +element.budget,
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

  const lossProfit = (incomeSum - expenseSum).toFixed(2);

  let lossProfitText = "Profit";
  if (lossProfit < 0) {
    lossProfitText = "Loss";
  }

  const image = require("../../../assets/images/money_plant2.jpg");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {!noData && (
          <View style={styles.secondContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.text}>
                Total Spent:{" "}
                {toCurrency(
                  +expenseSum.toFixed(2),
                  currencyCtx.getCurrencyCode
                )}
              </Text>
              {
                <Text
                  style={{
                    color: lossProfit < 0 ? "red" : "green",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {lossProfitText}:{" "}
                  {toCurrency(lossProfit, currencyCtx.getCurrencyCode)}
                </Text>
              }
            </View>
            <View style={styles.lineBarChart}>
              <LineBarChart
                title={"Monthly Spend vs. Income"}
                legendTitles={["Income", "Expenses"]}
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
        {noData && (
          <View style={styles.noDataContainer}>
            <Text style={styles.titleText}>
              No data retrieved for the selected month. Populate new data or
              select a different month.
            </Text>
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
  totalContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(190, 194, 203, 0.5)",
    marginTop: 15,
  },
  text: {
    fontSize: 20,
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
    flex: 0.43,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  barCandlehart: {
    flex: 0.425,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flexDirection: "row",
    width: "95%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
});
