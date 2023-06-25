import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Text,
} from "react-native";
import { MonthContext } from "../../store/MonthProvider";
import { useContext, useEffect, useState } from "react";
import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { SingleItemExpenseCard } from "../elementaries/cards/SingleItemExpenseCard";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { toCurrency } from "../computations/ToCurrency";
import { sumData } from "../computations/SumData";
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
    obj.x = xData[index].toString();
    obj.y = yData[index];
    element.push(obj);
  }
  return element;
};

export const AllItemDisplayMonth = () => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(true);

  const dbRef = collection(db, "financeData");

  const fetchDataHandler = async () => {
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(monthCtx.periodStart))),
      where("date", "<=", Timestamp.fromDate(new Date(monthCtx.periodEnd)))
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

  const expenses = [];

  for (let index = 0; index < data.length; index++) {
    if (
      data[index].type === "exp-fixed" ||
      data[index].type === "exp-variable"
    ) {
      expenses.push(data[index]);
    }
  }
  expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  let xVals = [];
  const days =
    1 +
    Math.ceil(
      (new Date(monthCtx.periodEnd).getTime() -
        new Date(monthCtx.periodStart).getTime()) /
        (1000 * 3600 * 24)
    );

  const dt = monthCtx.periodStart;
  for (let index = 0; index < days; index++) {
    xVals.push(
      new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + index).getDate()
    );
  }

  let yVals = [];
  const budget = [];
  const income = sumData(data, "income");

  xVals.forEach((xElement) => {
    yVals.push(0);
    if (expenses.length > 0) {
      budget.push(income);
    }

    expenses.forEach((yElement) => {
      if (new Date(yElement.date).getDate() === +xElement) {
        let i = xVals.findIndex((val) => val === +xElement);
        yVals[i] += +yElement.amount;
      }
    });
  });

  const showValues = [];
  xVals.forEach((element) => {
    if (monthCtx.dayPeriodStart % 2 === 0) {
      if (element % 2 === 0) {
        showValues.push(element);
      } else {
        showValues.push("");
      }
    } else {
      if (element % 2 !== 0) {
        showValues.push(element);
      } else {
        showValues.push("");
      }
    }
  });

  const totalSpent = expenses.reduce((prev, curr) => {
    return +prev + +curr.amount;
  }, 0);

  let profitLoss = 0;

  if (expenses.length > 0) {
    profitLoss = (+income - +totalSpent).toFixed(2);
  }

  let lossProfitText = "Profit";
  if (profitLoss < 0) {
    lossProfitText = "Loss";
  }

  const renderItem = ({ item }) => (
    <SingleItemExpenseCard
      item={item.item}
      date={dateFormat(new Date(item.date), "dd mmm yy")}
      amount={toCurrency(
        (+item.amount).toFixed(2),
        currencyCtx.getCurrencyCode
      )}
      description={item.description}
    />
  );

  const barValues1 = xyData(xVals, yVals);

  let cumSum = [];
  yVals.reduce((prev, curr, i) => (cumSum[i] = prev + curr), 0);
  const cumulative = xyData(xVals, cumSum);

  const budgetValues = xyData(xVals, budget);

  const findMax = Math.max(...cumSum.concat(yVals, budget));
  const yMax = findMax + findMax * 0.1;

  const image = require("../../../assets/images/money_plant2.jpg");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {!noData && (
          <View style={styles.secondContainer}>
            <View style={styles.totalSummaryContainer}>
              <Text style={styles.text}>
                Total Spent:{" "}
                {toCurrency(
                  +totalSpent.toFixed(2),
                  currencyCtx.getCurrencyCode
                )}
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
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 5 }}
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
    backgroundColor: "rgba(190, 194, 203, 0.5)",
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
