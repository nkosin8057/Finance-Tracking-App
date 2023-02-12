import { DataTable } from "react-native-paper";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { useContext } from "react";
import { mockData } from "./MockData";
import { MonthContext } from "../../store/MonthProvider";
import { toCurrency } from "../computations/ToCurrency";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { DateMenu } from "../elementaries/menus/DateMenu";

const createTableData = (data, dt) => {
  const thrMnthDate = new Date(dt.getFullYear(), dt.getMonth() - 3, 1);
  const twlMnthDate = new Date(dt.getFullYear(), dt.getMonth() - 11, 1);
  const tableData = [];
  let idIndex = 1;

  for (let i = 0; i < data.length; i++) {
    let currMnth = 0;
    let thrMnthAve = 0;
    let yaSum = 0;
    let exist = tableData.findIndex((indexData) => {
      return indexData.item === mockData[i].item;
    });

    let iDate = new Date(
      new Date(data[i].date).getFullYear(),
      new Date(data[i].date).getMonth(),
      1
    );

    if (exist === -1) {
      if (new Date(iDate).getTime() === new Date(dt).getTime()) {
        currMnth = data[i].amount;
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(thrMnthDate).getTime()
      ) {
        thrMnthAve = Math.round(data[i].amount / 3);
      }

      if (
        new Date(iDate).getTime() <= new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(twlMnthDate).getTime()
      ) {
        yaSum = data[i].amount;
      }

      let dataObj = {
        id: idIndex,
        item: data[i].item,
        curMnth: currMnth,
        thrMnthAv: thrMnthAve,
        yearSum: yaSum,
        type: data[i].type,
      };

      tableData.push(dataObj);
    } else {
      if (new Date(iDate).getTime() === new Date(dt).getTime()) {
        tableData[exist].curMnth += data[i].amount;
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(thrMnthDate).getTime()
      ) {
        tableData[exist].thrMnthAv += Math.round(data[i].amount / 3);
      }

      if (
        new Date(iDate).getTime() <= new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(twlMnthDate).getTime()
      ) {
        tableData[exist].yearSum += data[i].amount;
      }
    }

    idIndex += 1;
  }
  //console.log(tableData);
  return tableData;
};

const sumTotal = (data, item) => {
  const curMonth = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return prev + curr.curMnth;
    }, 0);

  const threeMnthAv = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return prev + curr.thrMnthAv;
    }, 0);

  const twelveMnth = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return prev + curr.yearSum;
    }, 0);

  const totalSum = {
    curMnthSum: curMonth,
    thrMnthSum: threeMnthAv,
    twelveMnthSum: twelveMnth,
  };

  return totalSum;
};

export const BalanceSheet = () => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);
  const dt = new Date(
    new Date(monthCtx.monthDate).getFullYear(),
    new Date(monthCtx.monthDate).getMonth(),
    1
  );
  const tableData = createTableData(mockData, dt);

  const incomeTotal = sumTotal(tableData, "income");
  const expVariableTotal = sumTotal(tableData, "exp-variable");
  const expFixedTotal = sumTotal(tableData, "exp-fixed");
  const grandTotal = {
    curMnthSum:
      incomeTotal.curMnthSum -
      expVariableTotal.curMnthSum -
      expFixedTotal.curMnthSum,
    thrMnthSum:
      incomeTotal.thrMnthSum -
      expVariableTotal.thrMnthSum -
      expFixedTotal.thrMnthSum,
    twelveMnthSum:
      incomeTotal.twelveMnthSum -
      expVariableTotal.twelveMnthSum -
      expFixedTotal.twelveMnthSum,
  };

  let oddEven = 0;

  const image = require("../../../assets/images/money_plant2.jpg");

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.dateMenu}>
          <DateMenu />
        </View>
        <View style={styles.table}>
          <ScrollView>
            <DataTable>
              <DataTable.Header style={{ height: 70 }}>
                <DataTable.Title
                  textStyle={styles.headerText}
                  style={styles.headerLeft}
                >
                  Item
                </DataTable.Title>
                <DataTable.Title
                  numberOfLines={2}
                  textStyle={styles.headerText}
                  style={styles.header}
                >
                  Current Month
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.headerText}
                  style={styles.header}
                  numberOfLines={2}
                >
                  3 months Average
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.headerText}
                  style={styles.header}
                  numberOfLines={2}
                >
                  Year Sum
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Header>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeaderLeft}
                >
                  Total Income
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    incomeTotal.curMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    incomeTotal.thrMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    incomeTotal.twelveMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
              </DataTable.Header>

              {tableData
                .filter((type) => type.type === "income")
                .map((income) => {
                  {
                    oddEven += 1;
                  }
                  return (
                    <DataTable.Row>
                      <DataTable.Cell
                        style={
                          oddEven % 2 == 0 ? styles.rowLeft1 : styles.rowLeft2
                        }
                        textStyle={styles.rowText}
                        key={income.id}
                      >
                        {income.item}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          income.curMnth,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          income.thrMnthAv,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          income.yearSum,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}

              <DataTable.Header>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeaderLeft}
                >
                  Variable Expenses
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expVariableTotal.curMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expVariableTotal.thrMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expVariableTotal.twelveMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
              </DataTable.Header>
              {tableData
                .filter((type) => type.type === "exp-variable")
                .map((expense) => {
                  {
                    oddEven += 1;
                  }
                  return (
                    <DataTable.Row>
                      <DataTable.Cell
                        style={
                          oddEven % 2 == 0 ? styles.rowLeft1 : styles.rowLeft2
                        }
                        textStyle={styles.rowText}
                        key={expense.id}
                      >
                        {expense.item}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.curMnth,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.thrMnthAv,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.yearSum,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              <DataTable.Header>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeaderLeft}
                >
                  Fixed Expenses
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expFixedTotal.curMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expFixedTotal.thrMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    expFixedTotal.twelveMnthSum,
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
              </DataTable.Header>
              {tableData
                .filter((type) => type.type === "exp-fixed")
                .map((expense) => {
                  {
                    oddEven += 1;
                  }
                  return (
                    <DataTable.Row>
                      <DataTable.Cell
                        style={
                          oddEven % 2 == 0 ? styles.rowLeft1 : styles.rowLeft2
                        }
                        textStyle={styles.rowText}
                        key={expense.id}
                      >
                        {expense.item}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.curMnth,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.thrMnthAv,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                        textStyle={styles.rowText}
                      >
                        {toCurrency(
                          expense.yearSum,
                          currencyCtx.getCurrencyCode
                        )}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
            </DataTable>

            <DataTable.Header>
              <DataTable.Title
                textStyle={styles.secondHeaderText}
                style={styles.secondHeaderLeft}
              >
                Grand Total
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.secondHeaderText}
                style={styles.secondHeader}
              >
                {toCurrency(grandTotal.curMnthSum, currencyCtx.getCurrencyCode)}
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.secondHeaderText}
                style={styles.secondHeader}
              >
                {toCurrency(grandTotal.thrMnthSum, currencyCtx.getCurrencyCode)}
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.secondHeaderText}
                style={styles.secondHeader}
              >
                {toCurrency(
                  grandTotal.twelveMnthSum,
                  currencyCtx.getCurrencyCode
                )}
              </DataTable.Title>
            </DataTable.Header>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  dateMenu: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    flex: 0.9,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#0A75AD",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    flex: 0.2,
  },
  headerLeft: {
    backgroundColor: "#0A75AD",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    flex: 0.4,
    //borderRadius: 15,
  },
  headerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  secondHeader: {
    backgroundColor: "#3399FF",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.2,
  },
  secondHeaderLeft: {
    backgroundColor: "#3399FF",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.4,
  },
  secondHeaderText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
  },
  row1: {
    backgroundColor: "#82f0de",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.2,
  },
  rowLeft1: {
    backgroundColor: "#82f0de",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.4,
  },
  row2: {
    backgroundColor: "#afeeee",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.2,
  },
  rowLeft2: {
    backgroundColor: "#afeeee",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    flex: 0.4,
  },
  rowText: {
    fontWeight: "800",
    color: "black",
    fontSize: 12,
  },
});
