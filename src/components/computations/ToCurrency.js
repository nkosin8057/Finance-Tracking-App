import { formatCurrency } from "react-native-format-currency";

export const toCurrency = (amount, code) => {
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: amount,
    code: code,
  });
  return valueFormattedWithSymbol;
};
