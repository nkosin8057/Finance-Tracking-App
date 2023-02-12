import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { EditCard } from "../elementaries/cards/EditCard";
import { IncomeExpensesDataContext } from "../../store/IncomeExpensesDataProvider";
import { MonthContext } from "../../store/MonthProvider";
import { CurrencyFormatContext } from "../../store/CurrencyFormat";
import { useContext, useEffect, useState } from "react";
import { DateMenu } from "../elementaries/menus/DateMenu";
import { toCurrency } from "../computations/ToCurrency";
import dateFormat from "dateformat";
import { AddEditDataModal } from "../modals/Add-EditDataModal";
import { Date_Picker } from "../modals/DatePicker";
import { IconButton } from "react-native-paper";
import { StatusBar } from "react-native";

const mockDescription =
  "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description";

export const EditDisplay = () => {
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    incExpCtx.setGetByMonth(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  let data = {};
  const onButtonSelected = (id) => {
    //console.log(id);
    //console.log(incExpCtx.getByMonthUnsummed);
    setShowModal(true);
    const d = incExpCtx.getByMonthUnsummed.find(({ ID }) => ID === id);
    setModalData(d);

    //console.log(dat);
  };

  const onDataSubmitted = (data) => {
    console.log(data);
  };
  //console.log("data= " + modalData.item);
  const renderItem = ({ item }) => (
    <EditCard
      id={item.ID}
      name={item.item}
      date={dateFormat(new Date(item.date), "dd mmm yy")}
      amount={toCurrency(item.amount, currencyCtx.getCurrencyCode)}
      budget={toCurrency(item.limit, currencyCtx.getCurrencyCode)}
      type={item.type}
      description={mockDescription}
      onButtonSelected={onButtonSelected}
    />
  );

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <View style={styles.modalContainer}>
            {Object.keys(modalData).length !== 0 && (
              <AddEditDataModal
                modalShow={showModal}
                modalClose={modalCloseHandler}
                data={modalData}
                onDataSubmitted={onDataSubmitted}
              />
            )}
          </View>
          <DateMenu />
        </View>
        <View style={styles.listContainer}>
          {/* <Title style={styles.titleText}></Title> */}
          <FlatList
            data={incExpCtx.getByMonthUnsummed}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
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
});
