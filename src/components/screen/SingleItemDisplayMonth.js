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
import { useContext, useState, useEffect } from "react";
import { LineBarChart } from "../elementaries/charts/LineBar-Chart";
import { SingleItemExpenseCard } from "../elementaries/cards/SingleItemExpenseCard";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { toCurrency } from "../computations/ToCurrency";
import { db } from "../../../firebaseConfig";
import {
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import dateFormat from "dateformat";

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

export const SingleItemDisplayMonth = (props) => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [expenses, setExpenses] = useState([]);

  const dbRef = collection(db, "financeData");

  const fetchDataHandler = async (mnth) => {
    const mStart = new Date(mnth.getFullYear(), mnth.getMonth(), 1);
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

  const options = { year: "numeric", month: "short", day: "numeric" };

  const monthEndDay = new Date(
    monthCtx.monthDate.getFullYear(),
    monthCtx.monthDate.getMonth() + 1,
    0
  ).getDate();

  let xVals = [];
  for (let index = 1; index <= monthEndDay; index++) {
    xVals.push(index);
  }

  let yVals = [];
  let budget = [];
  xVals.forEach((xElement) => {
    yVals.push(0);
    if (expenses.length > 0) {
      budget.push(expenses[0].budget);
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
    profitLoss = expenses[0].budget - totalSpent;
  }

  let lossProfitText = "Profit";
  if (profitLoss < 0) {
    lossProfitText = "Loss";
  }

  const renderItem = ({ item }) => (
    <SingleItemExpenseCard
      item={item.item}
      date={dateFormat(new Date(item.date), "dd mmm yy")}
      amount={toCurrency(item.amount, currencyCtx.getCurrencyCode)}
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
        {expenses.length > 0 && (
          <View style={styles.secondContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{expenses[0].item}</Title>
            </View>
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
                title={"Daily Spend vs. Budget"}
                legendTitles={["Budget", "Cumulative", "Daily"]}
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
  titleContainer: {
    flex: 0.05,
    ustifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    paddingBottom: 10,
    color: "white",
  },
  totalSummaryContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(190, 194, 203, 0.5)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
  },
  chartContainer: {
    flex: 0.45,
    marginTop: 15,
  },
  listContainer: {
    flex: 0.4,
    width: "100%",
  },
});
