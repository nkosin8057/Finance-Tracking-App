import React from "react";
import { useReducer } from "react";

const tDay = new Date();

export const MonthContext = React.createContext({
  monthDate: "",
  endMonth: "",
  startMonth: "",
  startYear: "",
  setMonth: (month) => {},
  setYear: (year) => {},
});

const defaultState = {
  monthDate: tDay,
  endMonth: new Date(tDay.getFullYear(), tDay.getMonth() + 1, 0),
  startMonth: new Date(tDay.getFullYear(), tDay.getMonth(), 1),
  startYear: tDay.getFullYear(),
};

const monthReducer = (state, action) => {
  if (action.type === "SET_MONTH") {
    const d = new Date(action.month);
    return {
      monthDate: d,
      endMonth: new Date(d.getFullYear(), d.getMonth() + 1, 0),
      startMonth: new Date(d.getFullYear(), d.getMonth(), 1),
      startYear: state.startYear,
    };
  }

  if (action.type === "SET_YEAR") {
    return {
      monthDate: state.monthDate,
      endMonth: state.endMonth,
      startMonth: state.startMonth,
      startYear: action.year,
    };
  }

  return defaultState;
};

const MonthProvider = (props) => {
  const [monthState, dispatchMonthAction] = useReducer(
    monthReducer,
    defaultState
  );

  const setMonthHandler = (month) => {
    dispatchMonthAction({ type: "SET_MONTH", month: month });
  };

  const setYearHandler = (year) => {
    dispatchMonthAction({ type: "SET_YEAR", year: year });
  };

  const monthCotext = {
    monthDate: monthState.monthDate,
    startMonth: monthState.startMonth,
    endMonth: monthState.endMonth,
    startYear: monthState.startYear,
    setMonth: setMonthHandler,
    setYear: setYearHandler,
  };

  return (
    <MonthContext.Provider value={monthCotext}>
      {props.children}
    </MonthContext.Provider>
  );
};

export default MonthProvider;
