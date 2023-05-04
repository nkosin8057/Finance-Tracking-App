import { View, StyleSheet, Text } from "react-native";
import { SemiCircleProgressDisplay } from "../progress_displays/SemiCircleProgress";
import { CurrencyFormatContext } from "../../../store/CurrencyFormat";
import { toCurrency } from "../../computations/ToCurrency";
import { useContext } from "react";

export const TotalSummaryCard = (props) => {
  const currencyCtx = useContext(CurrencyFormatContext);
  const profitLoss = +props.total - +props.spent;
  const ratio = +props.spent / +props.total;
  let textColour = "#00cc33";

  if (ratio > 0.8 && ratio < 1) {
    textColour = "#ECCD0E";
  }

  if (ratio >= 1) {
    textColour = "#CE1717";
  }

  return (
    <View style={styles().cardContainer}>
      <View style={styles().cardViewContainer}>
        <SemiCircleProgressDisplay spent={+props.spent} total={+props.total} />
        <Text style={styles(textColour).profitLossText}>
          {profitLoss < 0 ? "Loss: " : "Profit: "}{" "}
          {toCurrency(profitLoss, currencyCtx.getCurrencyCode)}
        </Text>
      </View>
    </View>
  );
};
const styles = (colour) =>
  StyleSheet.create({
    cardContainer: {
      height: 180,
      width: "100%",
      marginBottom: 15,
    },
    cardViewContainer: {
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    },
    profitLossText: {
      fontSize: 18,
      fontWeight: "bold",
      paddingTop: 5,
      color: colour,
    },
  });
