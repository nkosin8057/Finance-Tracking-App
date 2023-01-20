import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
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
import { DayPicker } from "react-day-picker";

const mockDescription =
  "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description";

export const EditDisplay = () => {
  const incExpCtx = useContext(IncomeExpensesDataContext);
  const monthCtx = useContext(MonthContext);
  const currencyCtx = useContext(CurrencyFormatContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    incExpCtx.setGetByMonth(monthCtx.monthDate);
  }, [monthCtx.monthDate]);

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const getID_Handler = (id) => {
    console.log("ID = " + id);
  };

  const onButtonSelected = () => {
    setShowModal(true);
  };

  const renderItem = ({ item }) => (
    <EditCard
      id={item.ID}
      name={item.item}
      date={dateFormat(new Date(item.date), "dd mmm yy")}
      amount={toCurrency(item.amount, currencyCtx.getCurrencyCode)}
      budget={toCurrency(item.limit, currencyCtx.getCurrencyCode)}
      type={item.type}
      description={mockDescription}
      getID={getID_Handler}
      onButtonSelected={onButtonSelected}
    />
  );

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.dateDisplayContainer}>
          <AddEditDataModal
            modalShow={showModal}
            modalClose={modalCloseHandler}
          />
          <DateMenu />
          <DayPicker />
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
    </View>
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
    flex: 0.1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  listContainer: {
    width: "100%",
    flex: 0.9,
  },
});
