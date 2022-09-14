import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
} from "react-native";
import { ExpenseCard } from "../cards/ExpenseCard";
import { mockExpenses, mockIncome } from "./MockData";
import { TotalSummaryCard } from "../cards/TotalSummaryCard";
import { CircularTextDisplay } from "../cards/CircularInfoDisplay";
import { Title } from "react-native-paper";
import { WheelPickerDisplay } from "./menus/WheelPicker";
import { DateCard } from "../cards/DateCard";

const expenseItemsSummed = () => {
  let summedExpenses = [];
  let i = 0;

  mockExpenses.map((expenseItem) => {
    let exist = summedExpenses.findIndex((expense) => {
      return expense.name === expenseItem.name;
    });

    if (exist != -1) {
      summedExpenses[exist].total += expenseItem.total;
    } else {
      let expObj = {
        id: i,
        name: expenseItem.name,
        total: expenseItem.total,
        limit: expenseItem.limit,
        type: expenseItem.type,
      };

      summedExpenses.push(expObj);
      i++;
    }
  });

  return summedExpenses;
};

const incomeDataSummed = () => {
  return mockIncome[0].total;
};

const variableExpensesSummed = () => {
  let sum = 0;

  sum = mockExpenses.reduce((prev, curr) => {
    if (curr.type === "multiple") {
      return prev + curr.total;
    } else {
      return prev;
    }
  }, 0);

  return sum;
};

const fixedExpensesSummed = () => {
  let sum = 0;

  sum = mockExpenses.reduce((prev, curr) => {
    if (curr.type === "single") {
      return prev + curr.total;
    } else {
      return prev;
    }
  }, 0);

  return sum;
};

export const MainSummaryDisplay = () => {
  const expenseData = expenseItemsSummed();
  const income = incomeDataSummed();
  const fixedExpenses = fixedExpensesSummed();
  const variableExpenses = variableExpensesSummed();

  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  const renderItem = ({ item }) => (
    <ExpenseCard
      name={item.name}
      total={item.total}
      limit={item.limit}
      type={item.type}
    />
  );

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <DateCard />
        </View>
        <View style={styles.circularDisplayContainer}>
          <CircularTextDisplay
            title={"Income"}
            value={formatter.format(income)}
            textColour={"#FFFFFF"}
          />
          <CircularTextDisplay
            title={"Fixed Expenses"}
            value={formatter.format(fixedExpenses)}
            textColour={"#FFFFFF"}
          />
          <CircularTextDisplay
            title={"Variable Expenses"}
            value={formatter.format(variableExpenses)}
            textColour={"#FFFFFF"}
          />
        </View>
        <View style={styles.totalSummaryContainer}>
          <TotalSummaryCard spent={21000} total={31000} />
        </View>
        <View style={styles.listContainer}>
          <Title style={styles.titleText}>EXPENSES</Title>
          <FlatList
            data={expenseData}
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
    marginTop: 5,
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
