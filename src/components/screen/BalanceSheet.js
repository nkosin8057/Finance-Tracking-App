import DataTable from "react-native-paper";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
} from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import { MonthContext } from "../../store/MonthProvider";
import { toCurrency } from "../computations/ToCurrency";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const createTableData = (data, dt) => {
  const mnthDate = new Date(dt.getFullYear(), dt.getMonth() - 1, dt.getDate());
  const thrMnthDate = new Date(
    mnthDate.getFullYear(),
    mnthDate.getMonth() - 3,
    mnthDate.getDate()
  );
  const twlMnthDate = new Date(
    mnthDate.getFullYear(),
    mnthDate.getMonth() - 11,
    mnthDate.getDate()
  );
  const tableData = [];
  let idIndex = 1;

  for (let i = 0; i < data.length; i++) {
    let currMnth = 0;
    let thrMnthAve = 0;
    let yaSum = 0;
    let exist = tableData.findIndex((indexData) => {
      return indexData.item === data[i].item;
    });

    let iDate = new Date(data[i].date);

    if (exist === -1) {
      if (
        new Date(iDate).getTime() >= new Date(mnthDate).getTime() &&
        new Date(iDate).getTime() < new Date(dt).getTime()
      ) {
        currMnth = data[i].amount;
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(thrMnthDate).getTime()
      ) {
        thrMnthAve = Math.round(+data[i].amount / 3);
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
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
      if (
        new Date(iDate).getTime() >= new Date(mnthDate).getTime() &&
        new Date(iDate).getTime() < new Date(dt).getTime()
      ) {
        tableData[exist].curMnth += +data[i].amount;
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(thrMnthDate).getTime()
      ) {
        tableData[exist].thrMnthAv += +Math.round(data[i].amount / 3);
      }

      if (
        new Date(iDate).getTime() < new Date(dt).getTime() &&
        new Date(iDate).getTime() >= new Date(twlMnthDate).getTime()
      ) {
        tableData[exist].yearSum += +data[i].amount;
      }
    }

    idIndex += 1;
  }

  return tableData;
};

const sumTotal = (data, item) => {
  const curMonth = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return +prev + +curr.curMnth;
    }, 0);

  const threeMnthAv = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return +prev + +curr.thrMnthAv;
    }, 0);

  const twelveMnth = data
    .filter((type) => type.type === item)
    .reduce((prev, curr) => {
      return +prev + +curr.yearSum;
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

  const [appData, setAppData] = useState([]);
  const [noData, setNoData] = useState(true);

  const dbRef = collection(db, "financeData");
  const dt = new Date(monthCtx.periodEnd);

  const fetchDataHandler = async () => {
    onSnapshot(dbRef, (snapshot) => {
      const res = snapshot.docs.map((doc) => {
        return { ...doc.data(), date: doc.data().date.toDate(), id: doc.id };
      });
      if (res.length === 0) {
        setNoData(true);
      } else {
        setAppData(res);
        setNoData(false);
      }
    });
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const tableData = createTableData(appData, dt);

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
        {noData && (
          <View style={styles.noDataContainer}>
            <Text style={styles.titleText}>
              No data retrieved for the selected month. Populate new data or
              select a different month.
            </Text>
          </View>
        )}
        {!noData && (
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
                      (+incomeTotal.curMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+incomeTotal.thrMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+incomeTotal.twelveMnthSum).toFixed(2),
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
                      <DataTable.Row key={income.id}>
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
                            (+income.curMnth).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+income.thrMnthAv).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+income.yearSum).toFixed(2),
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
                      (+expVariableTotal.curMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+expVariableTotal.thrMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+expVariableTotal.twelveMnthSum).toFixed(2),
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
                      <DataTable.Row key={expense.id}>
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
                            (+expense.curMnth).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+expense.thrMnthAv).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+expense.yearSum).toFixed(2),
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
                      (+expFixedTotal.curMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+expFixedTotal.thrMnthSum).toFixed(2),
                      currencyCtx.getCurrencyCode
                    )}
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.secondHeaderText}
                    style={styles.secondHeader}
                  >
                    {toCurrency(
                      (+expFixedTotal.twelveMnthSum).toFixed(2),
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
                      <DataTable.Row key={expense.id}>
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
                            (+expense.curMnth).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+expense.thrMnthAv).toFixed(2),
                            currencyCtx.getCurrencyCode
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={oddEven % 2 == 0 ? styles.row1 : styles.row2}
                          textStyle={styles.rowText}
                        >
                          {toCurrency(
                            (+expense.yearSum).toFixed(2),
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
                  {toCurrency(
                    (+grandTotal.curMnthSum).toFixed(2),
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    (+grandTotal.thrMnthSum).toFixed(2),
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
                <DataTable.Title
                  textStyle={styles.secondHeaderText}
                  style={styles.secondHeader}
                >
                  {toCurrency(
                    (+grandTotal.twelveMnthSum).toFixed(2),
                    currencyCtx.getCurrencyCode
                  )}
                </DataTable.Title>
              </DataTable.Header>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: StatusBar.currentHeight,
  },
  dateMenu: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 1,
    flex: 0.2,
  },
  headerLeft: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 1,
    flex: 0.4,
  },
  headerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  secondHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.2,
  },
  secondHeaderLeft: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.4,
  },
  secondHeaderText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 11,
  },
  row1: {
    backgroundColor: "rgba(190, 194, 203, 0.8)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.2,
  },
  rowLeft1: {
    backgroundColor: "rgba(190, 194, 203, 0.8)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.4,
  },
  row2: {
    backgroundColor: "rgba(170, 169, 173, 0.8)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.2,
  },
  rowLeft2: {
    backgroundColor: "rgba(170, 169, 173, 0.8)",
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 1,
    flex: 0.4,
  },
  rowText: {
    fontWeight: "800",
    color: "black",
    fontSize: 10,
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
