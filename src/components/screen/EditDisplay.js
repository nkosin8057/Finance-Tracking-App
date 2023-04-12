import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import { EditCard } from "../elementaries/cards/EditCard";
import { MonthContext } from "../../store/MonthProvider";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { useContext, useEffect, useState } from "react";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { toCurrency } from "../computations/ToCurrency";
import dateFormat from "dateformat";
import { AddEditDataModal } from "../modals/Add-EditDataModal";
import { StatusBar } from "react-native";
import { db } from "../../../firebaseConfig";
import {
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const EditDisplay = () => {
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

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
    onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map((doc) => {
        return { ...doc.data(), date: doc.data().date.toDate(), _id: doc.id };
      });
      if (res.length === 0) {
        setNoData(true);
      } else {
        setMnthData(res);
        setNoData(false);
      }
    });
  };

  useEffect(() => {
    fetchDataHandler(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const onButtonEditSelected = (id) => {
    setShowModal(true);
    const d = mnthData.find(({ _id }) => _id === id);
    setModalData(d);
  };

  const onButtonDeleteSelected = (id) => {
    deleteDataHandler(id);
  };

  const deleteDataHandler = async (id) => {
    const docRef = doc(db, "financeData", id);
    await deleteDoc(docRef);
  };

  const updateDataHandler = async (data) => {
    const docRef = doc(db, "financeData", data.id);
    const d = {
      item: data.item,
      date: Timestamp.fromDate(new Date(data.date)),
      amount: +data.amount,
      budget: +data.limit,
      type: data.type,
      description: data.description,
    };
    await updateDoc(docRef, data);
  };

  const onDataSubmitted = (data) => {
    updateDataHandler(data);
  };

  const renderItem = ({ item }) => (
    <EditCard
      id={item._id}
      name={item.item}
      date={dateFormat(new Date(item.date), "dd mmm yy")}
      amount={toCurrency(item.amount, currencyCtx.getCurrencyCode)}
      budget={toCurrency(item.budget, currencyCtx.getCurrencyCode)}
      type={item.type}
      description={item.description}
      onButtonEditSelected={onButtonEditSelected}
      onButtonDeleteSelected={onButtonDeleteSelected}
    />
  );

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {!noData && (
          <View style={styles.dateDisplayContainer}>
            <View style={styles.modalContainer}>
              {Object.keys(modalData).length !== 0 && (
                <AddEditDataModal
                  modalShow={showModal}
                  new={false}
                  modalClose={modalCloseHandler}
                  data={modalData}
                  onDataSubmitted={onDataSubmitted}
                />
              )}
            </View>
            <DateMenu />
          </View>
        )}
        {!noData && (
          <View style={styles.listContainer}>
            <FlatList
              data={mnthData}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  modalContainer: {
    marginTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  dateDisplayContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },

  listContainer: {
    width: "100%",
    flex: 0.9,
    marginTop: 35,
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
