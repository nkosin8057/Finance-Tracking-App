import React from "react";
import { useReducer } from "react";

const tDay = new Date();

export const MonthContext = React.createContext({
  dayPeriodStart: "",
  monthDate: "",
  startYear: "",
  periodStart: "",
  periodEnd: "",
  setMonth: (month) => {},
  setYear: (year) => {},
  setDay: (day) => {},
});

const defaultState = {
  dayPeriodStart: 1,
  monthDate: tDay,
  startYear: tDay.getFullYear(),
  periodStart: new Date(tDay.getFullYear(), tDay.getMonth(), 1),
  periodEnd: new Date(tDay.getFullYear(), tDay.getMonth() + 1, 0),
};

const monthReducer = (state, action) => {
  if (action.type === "SET_MONTH") {
    const d = new Date(action.month);
    return {
      dayPeriodStart: state.dayPeriodStart,
      monthDate: d,
      startYear: state.startYear,
      periodStart: new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()),
      periodEnd: new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
    };
  }

  if (action.type === "SET_YEAR") {
    return {
      dayPeriodStart: state.dayPeriodStart,
      monthDate: state.monthDate,
      startYear: action.year,
      periodStart: state.periodStart,
      periodEnd: state.periodEnd,
    };
  }

  if (action.type === "SET_DAY") {
    return {
      dayPeriodStart: +action.day,
      monthDate: state.monthDate,
      startYear: state.startYear,
      periodStart: new Date(
        state.monthDate.getFullYear(),
        state.monthDate.getMonth() - 1,
        +action.day
      ),
      periodEnd: new Date(
        state.monthDate.getFullYear(),
        state.monthDate.getMonth(),
        +action.day - 1
      ),
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

  const setDayHandler = (day) => {
    dispatchMonthAction({ type: "SET_DAY", day: day });
  };

  const monthCotext = {
    monthDate: monthState.monthDate,
    dayPeriodStart: monthState.dayPeriodStart,
    startYear: monthState.startYear,
    periodStart: monthState.periodStart,
    periodEnd: monthState.periodEnd,
    setMonth: setMonthHandler,
    setYear: setYearHandler,
    setDay: setDayHandler,
  };

  return (
    <MonthContext.Provider value={monthCotext}>
      {props.children}
    </MonthContext.Provider>
  );
};

export default MonthProvider;
