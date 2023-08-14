import { View, Modal, StyleSheet, Dimensions, Alert, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useState, useContext, useEffect } from "react";
import dateFormat from "dateformat";
import { Date_Picker } from "./DatePicker";
import { SelectList } from "react-native-dropdown-select-list";
import { db } from "../../../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { MonthContext } from "../../store/MonthProvider";

export const AddEditDataModal = (props) => {
  const monthCtx = useContext(MonthContext);
  const screenWidth = Dimensions.get("window").width;

  const [showCalendar, setShowCalendar] = useState(false);
  const [item, setItem] = useState();
  const [itemError, setItemError] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [amountError, setAmountError] = useState(false);
  const [budget, setBudget] = useState();
  const [budgetError, setBudgetError] = useState(false);
  const [type, setType] = useState({});
  const [typeDefault, setTypeDefault] = useState({});
  const [typeError, setTypeError] = useState(false);
  const [description, setDescription] = useState("");

  const typeData = [
    { key: "0", value: "Select Type", disabled: true },
    { key: "1", value: "Fixed Expense" },
    { key: "2", value: "Variable Expense" },
    { key: "3", value: "Income" },
  ];

  const selectType = (selType) => {
    if (selType === "") {
      return typeData[0];
    }
    if (selType === "exp-fixed") {
      return typeData[1];
    }
    if (selType === "exp-variable") {
      return typeData[2];
    }
    if (selType === "income") {
      return typeData[3];
    }
  };

  const typeText = (typeKey) => {
    if (typeKey === 1) {
      return "exp-fixed";
    }

    if (typeKey === 2) {
      return "exp-variable";
    }

    if (typeKey === 3) {
      return "income";
    }
  };

  useEffect(() => {
    if (props.new === true) {
      setItem("");
      setTypeDefault(selectType(""));
    } else {
      setItem(props.data.item);
      setSelectDate(new Date(props.data.date));
      setAmount(props.data.amount.toString());
      setBudget(props.data.budget.toString());
      setTypeDefault(selectType(props.data.type));
      setDescription(props.data.description);
    }
  }, [props]);

  const clearAll = () => {
    setItem();
    setSelectDate(new Date());
    setAmount();
    setBudget();
    setDescription("");
  };

  const onSubmitHandler = () => {
    let error = false;

    if (item === "") {
      setItemError(true);
      error = true;
    } else {
      setItemError(false);
    }

    if (isNaN(amount) || amount === "") {
      setAmountError(true);
      error = true;
    } else {
      setAmountError(false);
    }

    if (isNaN(budget) || budget === "") {
      setBudgetError(true);
      error = true;
    } else {
      setBudgetError(false);
    }

    if (+type === 0) {
      setTypeError(true);
      error = true;
    } else {
      setTypeError(false);
    }

    if (!error) {
      let savedData = {};
      if (props.new) {
        savedData = {
          item: item,
          date: selectDate,
          amount: +amount,
          budget: +budget,
          type: typeText(+type),
          description: description,
        };
      } else {
        savedData = {
          id: props.data._id,
          item: item,
          date: selectDate,
          amount: +amount,
          budget: +budget,
          type: typeText(+type),
          description: description,
        };
      }

      props.onDataSubmitted(savedData);
      clearAll();
      props.modalClose();
    }
  };

  const onCancelHandler = () => {
    clearAll();
    props.modalClose();
  };

  const itemMessage = "Insert type of expense or income";
  const amountMessage = "Insert item amount";
  const budgetMessage = "Insert budget limit for the month";
  const typeMessage =
    "Fixed Expense: expense occurs once a month. \nVariable Expense: expense occurs mutliple times a month. \nIncome: all incomes for the month.";
  const descriptionMessage = "Insert description or additional information.";
  typeMessage.bold;
  const onHelpPressed = (message, type) => {
    Alert.alert(type, JSON.stringify(message));
  };

  const showCalendarHandler = () => {
    setShowCalendar(true);
  };

  const onConfirmationHandler = (date) => {
    setSelectDate(new Date(date));
    setShowCalendar(false);
  };

  const onCancellationHandler = () => {
    setShowCalendar(false);
  };

  const getBudgetHandler = async () => {
    const dbRef = collection(db, "financeData");
    const q = query(
      dbRef,
      where("date", ">=", Timestamp.fromDate(new Date(monthCtx.periodStart))),
      where("date", "<=", Timestamp.fromDate(new Date(monthCtx.periodEnd))),
      where("item", "==", item.toString()),
      limit(1)
    );

    const budgetData = await getDocs(q);
    budgetData.forEach((doc) => {
      if (!itemError && +doc.data().budget > 0) {
        setBudget(doc.data().budget.toString());
      }
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.modalShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Date_Picker
              show={showCalendar}
              onConfirmation={onConfirmationHandler}
              onCancellation={onCancellationHandler}
              setDate={selectDate}
            />
            {itemError && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>
                  Error: Item field must be populated.
                </Text>
              </View>
            )}
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="ITEM"
                value={item}
                onChangeText={(item) => setItem(item)}
                onBlur={getBudgetHandler}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={itemError}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(itemMessage, "ITEM")}
              />
            </View>
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="DATE"
                value={dateFormat(selectDate, "fullDate")}
                editable={false}
                //onChangeText={(item) => setItem(item)}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={false}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="calendar-month"
                iconColor={"black"}
                size={20}
                onPress={() => showCalendarHandler()}
              />
            </View>
            {amountError && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Error: Amount must be numeric.</Text>
              </View>
            )}
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="AMOUNT"
                value={amount}
                onChangeText={(value) => setAmount(value)}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={amountError}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(amountMessage, "AMOUNT")}
              />
            </View>
            {budgetError && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Error: Budget must be numeric.</Text>
              </View>
            )}
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="BUDGET"
                value={budget}
                onChangeText={(value) => setBudget(value)}
                style={{ height: 35, width: screenWidth * 0.6 }}
                error={budgetError}
                selectionColor={"blue"}
                outlineColor={"blue"}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(budgetMessage, "BUDGET")}
              />
            </View>
            {typeError && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Error: Select item type.</Text>
              </View>
            )}
            <View style={styles.rowFlex}>
              <SelectList
                setSelected={(val) => setType(val)}
                data={typeData}
                save="key"
                placeholder={"TYPE"}
                defaultOption={typeDefault}
                search={false}
                boxStyles={{
                  height: 45,
                  width: screenWidth * 0.6,
                  borderRadius: 5,
                  borderColor: typeError ? "red" : "blue",
                  backgroundColor: "#F5F5F5",
                }}
                inputStyles={{ fontSize: 14 }}
                dropdownStyles={{
                  borderColor: "blue",
                  backgroundColor: "#F5F5F5",
                }}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(typeMessage, "TYPE")}
              />
            </View>
            <View style={styles.rowFlex}>
              <TextInput
                mode={"outlined"}
                label="DESCRIPTION"
                value={description}
                onChangeText={(val) => setDescription(val)}
                style={{ height: 150, width: screenWidth * 0.6, fontSize: 14 }}
                error={false}
                selectionColor={"blue"}
                outlineColor={"blue"}
                multiline={true}
              />
              <IconButton
                icon="help-circle"
                iconColor={"black"}
                size={20}
                onPress={() => onHelpPressed(descriptionMessage, "DESCRIPTION")}
              />
            </View>
            <View style={styles.rowFlex}>
              <Button
                mode="text"
                color="#2196F3"
                onPress={() => onSubmitHandler()}
              >
                SUBMIT
              </Button>
              <Button
                mode="text"
                color="#2196F3"
                onPress={() => onCancelHandler()}
              >
                CANCEL
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowFlex: {
    flexDirection: "row",
    marginBottom: 10,
  },
  errorContainer: {
    alignSelf: "flex-start",
    paddingLeft: 25,
  },
  error: {
    fontWeight: "bold",
    fontSize: 12,
    color: "red",
  },
});
