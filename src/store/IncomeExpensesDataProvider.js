import React from "react";
import { useReducer } from "react";
import { mockData } from "../components/ui/MockData";

const expenseItemsSummed = (expenseData) => {
  let summedExpenses = [];
  let i = 0;

  expenseData.map((expenseItem) => {
    let exist = summedExpenses.findIndex((expense) => {
      return expense.item === expenseItem.item;
    });

    if (exist != -1) {
      summedExpenses[exist].amount += expenseItem.amount;
    } else {
      let expObj = {
        id: i,
        item: expenseItem.item,
        amount: expenseItem.amount,
        limit: expenseItem.limit,
        type: expenseItem.type,
        //date: expenseItem.date,
      };

      summedExpenses.push(expObj);
      i++;
    }
  });

  return summedExpenses;
};

const itemTotal = (items) => {
  let sum = 0;

  sum = items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  return sum;
};

export const IncomeExpensesDataContext = React.createContext({
  getByMonthSummed: [],
  getByMonthUnsummed: [],
  getByName: [],

  getTotalByMonth: 0,
  getTotalByName: 0,
  getIncomeAll: 0,
  getIncomeByMonth: 0,
  getFixedTotalMonth: 0,
  getVariableTotalMonth: 0,
  setGetByMonth: (month) => {},
  setGetByName: (name) => {},
  setGetTotalByMonth: (month) => {},
  setGetTotalByName: (name) => {},
});

const defaultState = {
  getByMonthSummed: [],
  getByMonthUnsummed: [],
  getByName: [],
  getTotalByMonth: 0,
  getTotalByName: 0,
  getIncomeByMonth: 0,
  getFixedTotalMonth: 0,
  getVariableTotalMonth: 0,
};

const incomeExpensesDataReducer = (state, action) => {
  if (action.type === "SET_MONTH") {
    const nuExpenses = mockData.filter((expenses) => {
      const expDate = new Date(expenses.date);
      return (
        expDate.getMonth() === action.month.getMonth() &&
        expDate.getFullYear() === action.month.getFullYear() &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    const nuIncomes = mockData.filter((incomes) => {
      const incDate = new Date(incomes.date);
      return (
        incDate.getMonth() === action.month.getMonth() &&
        incDate.getFullYear() === action.month.getFullYear() &&
        incomes.type === "income"
      );
    });

    const nuFixed = mockData.filter((expenses) => {
      const incDate = new Date(expenses.date);
      return (
        incDate.getMonth() === action.month.getMonth() &&
        incDate.getFullYear() === action.month.getFullYear() &&
        expenses.type === "exp-fixed"
      );
    });

    const nuVariable = mockData.filter((expenses) => {
      const incDate = new Date(expenses.date);
      return (
        incDate.getMonth() === action.month.getMonth() &&
        incDate.getFullYear() === action.month.getFullYear() &&
        expenses.type === "exp-variable"
      );
    });

    return {
      getByMonthSummed: expenseItemsSummed(nuExpenses),
      getByMonthUnsummed: nuExpenses,
      getByName: state.getByName,
      getTotalByMonth: itemTotal(nuExpenses),
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getIncomeByMonth: itemTotal(nuIncomes),
      getFixedTotalMonth: itemTotal(nuFixed),
      getVariableTotalMonth: itemTotal(nuVariable),
    };
  }

  if (action.type === "SET_NAME") {
    const nuExpenses = mockData.filter((expenses) => {
      return (
        expenses.item === action.name &&
        expenses.type === "exp-variable" &&
        expenses.type === "exp-fixed"
      );
    });

    return {
      getByMonthSummed: state.getByMonthSummed,
      getByMonthUnsummed: state.getByMonthUnsummed,
      getByName: expenseItemsSummed(nuExpenses),
      getTotalByMonth: state.getTotalByMonth,
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getIncomeByMonth: state.getIncomeByMonth,
    };
  }

  return defaultState;
};

const IncomeExpensesDataProvider = (props) => {
  const [incExpState, dispatchIncExpAction] = useReducer(
    incomeExpensesDataReducer,
    defaultState
  );

  const setGetByMonthHandler = (month) => {
    dispatchIncExpAction({ type: "SET_MONTH", month: month });
  };
  const setGetByNameHandler = (name) => {
    dispatchIncExpAction({ type: "SET_NAME", name: name });
  };
  const setGetTotalByNameHandler = (name) => {
    dispatchIncExpAction({ type: "SET_NAME_TOTAL", name: name });
  };

  const incExpContext = {
    getByMonthSummed: incExpState.getByMonthSummed,
    getByMonthUnsummed: incExpState.getByMonthUnsummed,
    getByName: incExpState.getByName,
    getTotalByMonth: incExpState.getTotalByMonth,
    getTotalByName: incExpState.getTotalByName,
    getIncomeAll: incExpState.getIncomeAll,
    getIncomeByMonth: incExpState.getIncomeByMonth,
    getFixedTotalMonth: incExpState.getFixedTotalMonth,
    getVariableTotalMonth: incExpState.getVariableTotalMonth,
    setGetByMonth: setGetByMonthHandler,
    setGetByName: setGetByNameHandler,
    setGetTotalByName: setGetTotalByNameHandler,
  };

  return (
    <IncomeExpensesDataContext.Provider value={incExpContext}>
      {props.children}
    </IncomeExpensesDataContext.Provider>
  );
};

export default IncomeExpensesDataProvider;
