import React from "react";
import { useReducer } from "react";
import * as Localization from "expo-localization";

export const CurrencyFormatContext = React.createContext({
  getCurrencyCode: "",
  setCurrencyCode: (code) => {},
});

const defaultState = {
  getCurrencyCode: Localization.getLocales()[0].currencyCode.toString(),
};

const currencyFormatReducer = (state, action) => {
  if (action.type === "SET_CODE") {
    return {
      getCurrencyCode: action.code,
    };
  }

  return defaultState;
};

const CurrencyFormatProvider = (props) => {
  const [currencyFormatState, dispatchCurrencyFormatAction] = useReducer(
    currencyFormatReducer,
    defaultState
  );

  const setCurrencyCodeHandler = (code) => {
    dispatchCurrencyFormatAction({ type: "SET_CODE", code: code });
  };

  const currencyFormatCotext = {
    getCurrencyCode: currencyFormatState.getCurrencyCode,
    setCurrencyCode: setCurrencyCodeHandler,
  };

  return (
    <CurrencyFormatContext.Provider value={currencyFormatCotext}>
      {props.children}
    </CurrencyFormatContext.Provider>
  );
};

export default CurrencyFormatProvider;
