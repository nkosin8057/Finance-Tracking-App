import React from "react";
import { useReducer } from "react";

export const AppDataContext = React.createContext({
  appData: [],
  maxID: 0,
  dataStartYear: 0,
  monthData: [],
  yearData: [],
  singleItemByMonth: [],
  singleItemByYear: [],
  setAppData: (data) => {},
  setMonthYearData: (month) => {},
  setSingleItem: (item, month) => {},
});

const defaultState = {
  appData: [],
  maxID: 0,
  dataStartYear: 0,
  monthData: [],
  yearData: [],
  singleItemByMonth: [],
  singleItemByYear: [],
};

const appDataReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    let year = new Date().getFullYear();

    for (let index = 0; index < action.data.length; index++) {
      if (new Date(action.data[index].date).getFullYear() < year) {
        year = new Date(action.data[index].date).getFullYear();
      }
    }

    const maxValue = Math.max(...action.data.map((val) => val.id));

    return {
      appData: action.data,
      maxID: maxValue,
      dataStartYear: year,
      monthData: state.monthData,
      yearData: state.yearData,
      singleItemByMonth: state.singleItemByMonth,
      singleItemByYear: state.singleItemByYear,
    };
  }

  if (action.type === "SET_MONTH") {
    const d = new Date(action.month);
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const monthStartYear = new Date(d.getFullYear(), d.getMonth() - 11, 1);
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);

    const monthData = state.appData.filter((data) => {
      const d = new Date(data.date);
      return (
        d.getTime() >= monthStart.getTime() && d.getTime() <= monthEnd.getTime()
      );
    });

    const yearData = state.appData.filter((data) => {
      const d = new Date(data.date);
      return (
        d.getTime() >= monthStartYear.getTime() &&
        d.getTime() <= monthEnd.getTime()
      );
    });

    return {
      appData: state.appData,
      maxID: state.maxID,
      dataStartYear: state.dataStartYear,
      monthData: monthData,
      yearData: yearData,
      singleItemByMonth: state.singleItemByMonth,
      singleItemByYear: state.singleItemByYear,
    };
  }

  if (action.type === "SET_ITEM_MONTH") {
    const d = new Date(action.month);
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const monthStartYear = new Date(d.getFullYear(), d.getMonth() - 11, 1);
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);

    const itemDataMonth = state.appData.filter((data) => {
      const d = new Date(data.date);
      return (
        d.getTime() >= monthStart.getTime() &&
        d.getTime() <= monthEnd.getTime() &&
        data.item === action.item
      );
    });

    const itemDataYear = state.appData.filter((data) => {
      const d = new Date(data.date);
      return (
        d.getTime() >= monthStartYear.getTime() &&
        d.getTime() <= monthEnd.getTime() &&
        data.item === action.item
      );
    });

    return {
      appData: state.appData,
      maxID: state.maxID,
      dataStartYear: state.dataStartYear,
      monthData: state.monthData,
      yearData: state.yearData,
      singleItemByMonth: itemDataMonth,
      singleItemByYear: itemDataYear,
    };
  }

  return defaultState;
};

const AppDataProvider = (props) => {
  const [appDataState, dispatchAppDataAction] = useReducer(
    appDataReducer,
    defaultState
  );

  const setAppDataHandler = (data) => {
    dispatchAppDataAction({ type: "SET_DATA", data: data });
  };

  const setMonthYearDataHandler = (month) => {
    dispatchAppDataAction({ type: "SET_MONTH", month: month });
  };

  const setSingleItemHandler = (item, month) => {
    dispatchAppDataAction({ type: "SET_ITEM_MONTH", item: item, month: month });
  };

  const appDataContext = {
    appData: appDataState.appData,
    maxID: appDataState.maxID,
    monthData: appDataState.monthData,
    yearData: appDataState.yearData,
    dataStartYear: appDataState.dataStartYear,
    singleItemByMonth: appDataState.singleItemByMonth,
    singleItemByYear: appDataState.singleItemByYear,
    setAppData: setAppDataHandler,
    setMonthYearData: setMonthYearDataHandler,
    setSingleItem: setSingleItemHandler,
  };

  return (
    <AppDataContext.Provider value={appDataContext}>
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
