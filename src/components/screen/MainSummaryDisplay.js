import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Alert,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { ExpenseCard } from "../elementaries/cards/ExpenseCard";
import { TotalSummaryCard } from "../elementaries/cards/TotalSummaryCard";
import { InfoCircularCard } from "../elementaries/cards/InfoCircularCard";
import { Title, FAB } from "react-native-paper";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../store/MonthProvider";
import { toCurrency } from "../computations/ToCurrency";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { AddEditDataModal } from "../modals/Add-EditDataModal";
import { sumData } from "../computations/SumData";
import { db } from "../../../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { objectSum } from "../computations/SumData";

export const MainSummaryDisplay = ({ navigation }) => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [mnthData, setMnthData] = useState([]);
  const [noData, setNoData] = useState(true);
  let maxId;
  const dbRef = collection(db, "financeData");

  const fetchSettingsHandler = () => {
    const settingsDbRef = collection(db, "settings");
    onSnapshot(
      settingsDbRef,
      (snapshot) => {
        const res = snapshot.docs.map((doc) => {
          return { ...doc.data() };
        });
        if (res.length > 0) {
          monthCtx.setDay(res[0].period);
          currencyCtx.setCurrencyCode(res[0].currency);
        }
      },
      (error) => {
        Alert.alert("", JSON.stringify(error));
      }
    );
    setLoading(false);
  };

  const fetchDataHandler = async () => {
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(monthCtx.periodStart))),
      where("date", "<=", Timestamp.fromDate(new Date(monthCtx.periodEnd)))
    );
    onSnapshot(
      q,
      (snapshot) => {
        const res = snapshot.docs.map((doc) => {
          return { ...doc.data(), date: doc.data().date.toDate(), id: doc.id };
        });
        if (res.length === 0) {
          setNoData(true);
        } else {
          maxId = Math.max(...res.map((val) => val.id));
          setMnthData(res);
          setNoData(false);
        }
      },
      (error) => {
        Alert.alert("", JSON.stringify(error));
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    setMnthData([]);
    setLoading(true);
    fetchSettingsHandler();
    fetchDataHandler();
  }, [monthCtx.monthDate]);

  const incomeSum = sumData(mnthData, "income").toFixed(2);
  const fExpensesSum = sumData(mnthData, "exp-fixed").toFixed(2);
  const vExpensesSum = sumData(mnthData, "exp-variable").toFixed(2);
  const aExpensesSum = sumData(mnthData, "expenses").toFixed(2);
  let expenses = [];

  for (let index = 0; index < mnthData.length; index++) {
    if (
      mnthData[index].type === "exp-fixed" ||
      mnthData[index].type === "exp-variable"
    ) {
      expenses.push(mnthData[index]);
    }
  }

  expenses = objectSum(expenses);

  const onButtonSelected = (selection) => {
    navigation.navigate("SingleItem", { item: selection });
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const onModalButtonSelected = () => {
    setShowModal(true);
    const obj = { item: "", amount: 1, budget: 0, type: "", description: "" };
    setModalData(obj);
  };

  const onDataSubmitted = async (data) => {
    await addDoc(dbRef, {
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      item: data.item,
      date: Timestamp.fromDate(new Date(data.date)),
      amount: +data.amount,
      budget: +data.budget,
      type: data.type,
      description: data.description,
    });
  };

  const renderItem = ({ item }) => (
    <ExpenseCard
      name={item.item}
      amount={item.amount}
      limit={item.budget}
      type={item.type}
      income={incomeSum}
      onButtonSelected={onButtonSelected}
    />
  );

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <DateMenu />
          <AddEditDataModal
            modalShow={showModal}
            modalClose={modalCloseHandler}
            new={true}
            onDataSubmitted={onDataSubmitted}
          />
        </View>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
          overlayColor={"rgba(0, 0, 0, 0.75)"}
        />
        <View style={styles.circularDisplayContainer}>
          <InfoCircularCard
            title={"Income"}
            value={toCurrency(+incomeSum, currencyCtx.getCurrencyCode)}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Fixed Expenses"}
            value={toCurrency(+fExpensesSum, currencyCtx.getCurrencyCode)}
            textColour={"#FFFFFF"}
          />
          <InfoCircularCard
            title={"Variable Expenses"}
            value={toCurrency(+vExpensesSum, currencyCtx.getCurrencyCode)}
            textColour={"#FFFFFF"}
          />
        </View>
        {!noData && (
          <View style={styles.totalSummaryContainer}>
            <TotalSummaryCard spent={aExpensesSum} total={incomeSum} />
          </View>
        )}
        {!noData && (
          <View style={styles.listContainer}>
            <Title style={styles.titleText}>EXPENSES</Title>
            <FlatList
              data={expenses}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 5 }}
            />
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
        <FAB
          icon="plus"
          style={styles.fab}
          color={"black"}
          small
          onPress={() => onModalButtonSelected()}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    backgroundColor: "white",
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  dateDisplayContainer: {
    flex: 0.05,
    marginTop: 25,
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
  noDataContainer: {
    flexDirection: "row",
    width: "95%",
    flex: 0.75,
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
