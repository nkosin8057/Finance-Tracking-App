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
import { AppDataContext } from "../../store/AppDataProvider";
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

export const MainSummaryDisplay = ({ navigation }) => {
  const dataCtx = useContext(AppDataContext);
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [mnthData, setMnthData] = useState([]);
  const [noData, setNoData] = useState(true);

  const dbRef = collection(db, "financeData");

  const fetchDataHandler = async (mnth) => {
    const mStart = new Date(mnth.getFullYear(), mnth.getMonth(), 1);
    const mEnd = new Date(mnth.getFullYear(), mnth.getMonth() + 1, 0);
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(mStart))),
      where("date", "<=", Timestamp.fromDate(new Date(mEnd)))
    );
    onSnapshot(
      q,
      (snapshot) => {
        const res = snapshot.docs.map((doc) => {
          return { ...doc.data(), date: doc.data().date.toDate() };
        });
        if (res.length === 0) {
          setNoData(true);
        } else {
          setMnthData(res);
          setNoData(false);
        }
      },
      (error) => {
        Alert.alert("", error);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDataHandler(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  const incomeSum = sumData(mnthData, "income");
  const fExpensesSum = sumData(mnthData, "exp-fixed");
  const vExpensesSum = sumData(mnthData, "exp-variable");
  const aExpensesSum = sumData(mnthData, "expenses");
  let expenses = [];

  for (let index = 0; index < mnthData.length; index++) {
    if (
      mnthData[index].type === "exp-fixed" ||
      mnthData[index].type === "exp-variable"
    ) {
      expenses.push(mnthData[index]);
    }
  }

  const onButtonSelected = (selection) => {
    navigation.navigate("SingleItem", { item: selection });
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const onModalButtonSelected = () => {
    setShowModal(true);
    const obj = { item: "", amount: 1, limit: 0, type: "", description: "" };
    setModalData(obj);
  };

  const onDataSubmitted = async (data) => {
    await addDoc(dbRef, {
      id: +dataCtx.maxID + 1,
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
