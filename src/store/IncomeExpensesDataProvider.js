import React from "react";
import { useReducer } from "react";
import { mockData } from "../components/screen/MockData";

const expenseItemsSummed = (expenseData) => {
  let summedExpenses = [];
  let i = 0;

  expenseData.map((expenseItem) => {
    let exist = summedExpenses.findIndex((expense) => {
      const d = new Date(expenseItem.date);
      return (
        expense.item === expenseItem.item &&
        new Date(
          expense.date.getFullYear(),
          expense.date.getMonth(),
          1
        ).getTime() === new Date(d.getFullYear(), d.getMonth(), 1).getTime()
      );
    });

    if (exist != -1) {
      summedExpenses[exist].amount += expenseItem.amount;
    } else {
      const d = new Date(expenseItem.date);
      const dt = new Date(d.getFullYear(), d.getMonth(), 1);
      let expObj = {
        id: i,
        item: expenseItem.item,
        amount: expenseItem.amount,
        limit: expenseItem.limit,
        type: expenseItem.type,
        date: dt,
      };

      summedExpenses.push(expObj);
      i++;
    }
  });
  summedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  return summedExpenses;
};

const SingleExpenseItemsSummed = (expenseData) => {
  let summedExpenses = [];
  let i = 0;

  expenseData.map((expenseItem) => {
    const d = new Date(expenseItem.date);

    let exist = summedExpenses.findIndex((expense) => {
      const dt = new Date(expense.date);
      //console.log(dt);
      return (
        new Date(dt.getFullYear(), dt.getMonth(), 1).getTime() ===
        new Date(d.getFullYear(), d.getMonth(), 1).getTime()
      );
    });

    if (exist != -1) {
      summedExpenses[exist].amount += expenseItem.amount;
    } else {
      const dt = new Date(d.getFullYear(), d.getMonth(), 1);
      let expObj = {
        id: i,
        item: expenseItem.item,
        amount: expenseItem.amount,
        limit: expenseItem.limit,
        type: expenseItem.type,
        date: dt,
      };

      summedExpenses.push(expObj);
      i++;
    }
  });

  summedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

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
  setGetByMonth: (month) => {},
  setGetTotalByMonth: (month) => {},
  setGetTotalByName: (name) => {},
  setGetSingleItem: (name, month) => {},
});

const defaultState = {
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

    const yearIncomes = mockData.filter((expenses) => {
      const expDate = new Date(expenses.date);
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
        expDate >= startDate && expDate < endDate && expenses.type === "income"
      );
    });

    const yearExpenses = mockData.filter((expenses) => {
      const expDate = new Date(expenses.date);
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
        expDate >= startDate &&
        expDate < endDate &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    nuExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    yearExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    //console.log(yearIncomes);
    return {
      getByMonthSummed: expenseItemsSummed(nuExpenses),
      getByMonthUnsummed: nuExpenses,
      getByYearSummed: expenseItemsSummed(yearExpenses),
      getByYearUnsummed: yearExpenses,
      getItemByMonth: state.getItemByMonth,
      getItemByYearSummed: state.getItemByYearSummed,
      getItemByYearUnsummed: state.getItemByYearUnsummed,
      getYearIncomeByMonth: yearIncomes,
      getIncomeByMonth: itemTotal(nuIncomes),
      getItemByYearTotal: state.getItemByYearTotal,
      getByYearTotal: itemTotal(yearExpenses),
      getTotalByMonth: itemTotal(nuExpenses),
      getTotalByName: state.getTotalByName,
      getIncomeAll: state.getIncomeAll,
      getFixedTotalMonth: itemTotal(nuFixed),
      getVariableTotalMonth: itemTotal(nuVariable),
    };
  }

  if (action.type === "SET_NAME_MONTH") {
    const monthExpenses = mockData.filter((expenses) => {
      const expDate = new Date(expenses.date);
      return (
        expDate.getMonth() === action.month.getMonth() &&
        expDate.getFullYear() === action.month.getFullYear() &&
        expenses.item === action.name &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    monthExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    const yearExpenses = mockData.filter((expenses) => {
      const expDate = new Date(expenses.date);
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
        expDate >= startDate &&
        expDate < endDate &&
        expenses.item === action.name &&
        (expenses.type === "exp-variable" || expenses.type === "exp-fixed")
      );
    });

    return {
      getByMonthSummed: state.getByMonthSummed,
      getByMonthUnsummed: state.getByMonthUnsummed,
      getByYearSummed: state.getByYearSummed,
      getByYearUnsummed: state.getByYearUnsummed,
      getItemByMonth: monthExpenses,
      getItemByYearSummed: SingleExpenseItemsSummed(yearExpenses),
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
