import React from "react";
import { useReducer } from "react";

const itemsSummed = (data) => {
  let summedItems = [];
  let i = 0;

  data.map((item) => {
    let exist = summedItems.findIndex((indexData) => {
      const d = new Date(item.date);
      return (
        indexData.item === item.item &&
        new Date(
          indexData.date.getFullYear(),
          indexData.date.getMonth(),
          1
        ).getTime() === new Date(d.getFullYear(), d.getMonth(), 1).getTime()
      );
    });

    if (exist !== -1) {
      summedItems[exist].id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
      summedItems[exist].amount += item.amount;
    } else {
      const d = new Date(item.date);
      let expObj = {
        id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        item: item.item,
        amount: item.amount,
        limit: item.limit,
        type: item.type,
        date: new Date(d.getFullYear(), d.getMonth(), 1),
      };

      summedItems.push(expObj);
      i++;
    }
  });

  summedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
  return summedItems;
};

const itemTotal = (items) => {
  let sum = 0;

  sum = items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  return sum;
};

export const IncomeExpensesDataContext = React.createContext({
  appDataAll: [],
  appDataMonth: [],
  appDataThreeMonths: [],
  appDataYear: [],
  getByMonthSummed: [],
  getByMonthUnsummed: [],
  getByYearSummed: [],
  getByYearUnsummed: [],
  getItemByMonth: [],
  getItemByYearSummed: [],
  getItemByYearUnsummed: [],
  getYearIncomeByMonth: [],
  getIncomeByMonth: 0,
  getItemByYearTotal: 0,
  getByYearTotal: 0,
  getTotalByMonth: 0,
  getTotalByName: 0,
  getIncomeAll: 0,
  getFixedTotalMonth: 0,
  getVariableTotalMonth: 0,
  getAppData: (data) => {},
  setGetByMonth: (month) => {},
  setGetTotalByMonth: (month) => {},
  setGetTotalByName: (name) => {},
  setGetSingleItem: (name, month) => {},
});

const defaultState = {
  appDataAll: [],
  // appDataMonth: [],
  // appDataThreeMonths: [],
  // appDataYear: [],
  getByMonthSummed: [],
  getByMonthUnsummed: [],
  getByYearSummed: [],
  getByYearUnsummed: [],
  getItemByMonth: [],
  getItemByYearSummed: [],
  getItemByYearUnsummed: [],
  getYearIncomeByMonth: [],
  getIncomeByMonth: 0,
  getItemByYearTotal: 0,
  getByYearTotal: 0,
  getTotalByMonth: 0,
  getTotalByName: 0,
  getFixedTotalMonth: 0,
  getVariableTotalMonth: 0,
};

const incomeExpensesDataReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      appDataAll: action.data,
      getByMonthSummed: itemsSummed(nExpenses),
      getByMonthUnsummed: nExpenses,
      getByYearSummed: itemsSummed(expensesYear),
      getByYearUnsummed: expensesYear,
      getItemByMonth: state.getItemByMonth,
      getItemByYearSummed: state.getItemByYearSummed,
      getItemByYearUnsummed: state.getItemByYearUnsummed,
      getYearIncomeByMonth: incomesYear,
      getIncomeByMonth: itemTotal(nIncomes),
      getItemByYearTotal: state.getItemByYearTotal,
      getByYearTotal: itemTotal(expensesYear),
      getTotalByMonth: itemTotal(nExpenses),
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getFixedTotalMonth: itemTotal(fExpenses),
      getVariableTotalMonth: itemTotal(vExpenses),
    };
  }

  if (action.type === "SET_MONTH") {
    const nExpenses = action.appDataAll.filter((expense) => {
      const d = new Date(expense.date);
      return (
        d.getMonth() === action.month.getMonth() &&
        d.getFullYear() === action.month.getFullYear() &&
        (expense.type === "exp-variable" || expense.type === "exp-fixed")
      );
    });

    const nIncomes = action.appDataAll.filter((income) => {
      const d = new Date(income.date);
      return (
        d.getMonth() === action.month.getMonth() &&
        d.getFullYear() === action.month.getFullYear() &&
        income.type === "income"
      );
    });

    const fExpenses = action.appDataAll.filter((expense) => {
      const d = new Date(expense.date);
      return (
        d.getMonth() === action.month.getMonth() &&
        d.getFullYear() === action.month.getFullYear() &&
        expense.type === "exp-fixed"
      );
    });

    const vExpenses = action.appDataAll.filter((expense) => {
      const d = new Date(expense.date);
      return (
        d.getMonth() === action.month.getMonth() &&
        d.getFullYear() === action.month.getFullYear() &&
        expense.type === "exp-variable"
      );
    });

    const incomesYear = action.appDataAll.filter((expense) => {
      const d = new Date(expense.date);
      const endDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() + 1,
        1
      );
      const startDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() - 11,
        1
      );

      return d >= startDate && d < endDate && expense.type === "income";
    });

    const expensesYear = action.appDataAll.filter((expense) => {
      const d = new Date(expense.date);
      const endDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() + 1,
        1
      );
      const startDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() - 11,
        1
      );

      return (
        d >= startDate &&
        d < endDate &&
        (expense.type === "exp-variable" || expense.type === "exp-fixed")
      );
    });

    nExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    expensesYear.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      appDataAll: state.appDataAll,
      getByMonthSummed: itemsSummed(nExpenses),
      getByMonthUnsummed: nExpenses,
      getByYearSummed: itemsSummed(expensesYear),
      getByYearUnsummed: expensesYear,
      getItemByMonth: state.getItemByMonth,
      getItemByYearSummed: state.getItemByYearSummed,
      getItemByYearUnsummed: state.getItemByYearUnsummed,
      getYearIncomeByMonth: incomesYear,
      getIncomeByMonth: itemTotal(nIncomes),
      getItemByYearTotal: state.getItemByYearTotal,
      getByYearTotal: itemTotal(expensesYear),
      getTotalByMonth: itemTotal(nExpenses),
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getFixedTotalMonth: itemTotal(fExpenses),
      getVariableTotalMonth: itemTotal(vExpenses),
    };
  }

  if (action.type === "SET_NAME_MONTH") {
    const monthExpenses = action.appDataAll.filter((expenses) => {
      const d = new Date(expenses.date);
      return (
        d.getMonth() === action.month.getMonth() &&
        d.getFullYear() === action.month.getFullYear() &&
        expenses.item === action.name &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    monthExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    const yearExpenses = mockData.filter((expenses) => {
      const d = new Date(expenses.date);
      const endDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() + 1,
        1
      );
      const startDate = new Date(
        action.month.getFullYear(),
        action.month.getMonth() - 11,
        1
      );

      return (
        d >= startDate &&
        d < endDate &&
        expenses.item === action.name &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    return {
      appDataAll: state.appDataAll,
      getByMonthSummed: state.getByMonthSummed,
      getByMonthUnsummed: state.getByMonthUnsummed,
      getByYearSummed: state.getByYearSummed,
      getByYearUnsummed: state.getByYearUnsummed,
      getItemByMonth: monthExpenses,
      getItemByYearSummed: itemsSummed(yearExpenses),
      getItemByYearTotal: itemTotal(yearExpenses),
      getYearIncomeByMonth: state.getYearIncomeByMonth,
      getIncomeByMonth: state.getIncomeByMonth,
      getByYearTotal: state.getByYearTotal,
      getItemByYearUnsummed: yearExpenses,
      getTotalByMonth: state.getTotalByMonth,
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getFixedTotalMonth: state.getFixedTotalMonth,
      getVariableTotalMonth: state.getVariableTotalMonth,
    };
  }

  return defaultState;
};

const IncomeExpensesDataProvider = (props) => {
  const [incExpState, dispatchIncExpAction] = useReducer(
    incomeExpensesDataReducer,
    defaultState
  );

  const getAppDataHandler = (data) => {
    dispatchIncExpAction({ type: "SET_DATA", data: data });
  };

  const setGetByMonthHandler = (month) => {
    dispatchIncExpAction({ type: "SET_MONTH", month: month });
  };
  const setGetTotalByNameHandler = (name) => {
    dispatchIncExpAction({ type: "SET_NAME_TOTAL", name: name });
  };
  const setSingleGetItemHandler = (name, month) => {
    dispatchIncExpAction({ type: "SET_NAME_MONTH", name: name, month: month });
  };

  const incExpContext = {
    getByMonthSummed: incExpState.getByMonthSummed,
    getByMonthUnsummed: incExpState.getByMonthUnsummed,
    getByYearSummed: incExpState.getByYearSummed,
    getByYearUnsummed: incExpState.getByYearUnsummed,
    getItemByMonth: incExpState.getItemByMonth,
    getItemByYearUnsummed: incExpState.getItemByYearUnsummed,
    getItemByYearSummed: incExpState.getItemByYearSummed,
    getYearIncomeByMonth: incExpState.getYearIncomeByMonth,
    getItemByYearTotal: incExpState.getItemByYearTotal,
    getByYearTotal: incExpState.getByYearTotal,
    getByName: incExpState.getByName,
    getTotalByMonth: incExpState.getTotalByMonth,
    getTotalByName: incExpState.getTotalByName,
    getIncomeAll: incExpState.getIncomeAll,
    getIncomeByMonth: incExpState.getIncomeByMonth,
    getFixedTotalMonth: incExpState.getFixedTotalMonth,
    getVariableTotalMonth: incExpState.getVariableTotalMonth,
    appDataAll: incExpState.appDataAll,
    getAppData: getAppDataHandler,
    setGetByMonth: setGetByMonthHandler,
    setGetTotalByName: setGetTotalByNameHandler,
    setGetSingleItem: setSingleGetItemHandler,
  };

  return (
    <IncomeExpensesDataContext.Provider value={incExpContext}>
      {props.children}
    </IncomeExpensesDataContext.Provider>
  );
};

export default IncomeExpensesDataProvider;
