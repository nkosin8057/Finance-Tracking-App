import React from "react";
import { useReducer } from "react";
import { mockData } from "../components/screen/MockData";

const maxDate = new Date(
  Math.max(
    ...mockData.map((element) => {
      return new Date(element.date);
    })
  )
);

const minDate = new Date(
  Math.min(
    ...mockData.map((element) => {
      return new Date(element.date);
    })
  )
);

export const MonthContext = React.createContext({
  monthDate: "",
  endMonth: "",
  startMonth: "",
  setMonth: (month) => {},
});

const defaultState = {
  monthDate: maxDate,
  endMonth: maxDate,
  startMonth: minDate,
};

const monthReducer = (state, action) => {
  if (action.type === "SET_MONTH") {
    return {
      monthDate: action.month,
      endMonth: maxDate,
      startMonth: minDate,
    };
  }

  return defaultSate;
};

const MonthProvider = (props) => {
  const [monthState, dispatchMonthAction] = useReducer(
    monthReducer,
    defaultState
  );

  const setMonthHandler = (month) => {
    dispatchMonthAction({ type: "SET_MONTH", month: month });
  };

  const monthCotext = {
    monthDate: monthState.monthDate,
    startMonth: monthState.startMonth,
    endMonth: monthState.endMonth,
    setMonth: setMonthHandler,
  };

  return (
    <MonthContext.Provider value={monthCotext}>
      {props.children}
    </MonthContext.Provider>
  );
};

export default MonthProvider;
