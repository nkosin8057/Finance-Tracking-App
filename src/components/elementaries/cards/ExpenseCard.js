import { Button, Title } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { ItemsProgressBar } from "../progress_displays/ItemsProgressBar";
import { CurrencyFormatContext } from "../../../store/CurrencyFormat";
import { toCurrency } from "../../computations/ToCurrency";
import { useContext } from "react";

export const ExpenseCard = (props) => {
  const currencyCtx = useContext(CurrencyFormatContext);
  const name = props.name;
  const expense = (+props.amount).toFixed(2);
  const income = (+props.income).toFixed(2);
  const limit = (+props.limit).toFixed(2);
  const type = props.type;

  const contrib = ((expense / income) * 100).toFixed(1);

  const progressPercentageText = expense / limit;
  const progressPercentageDisplay =
    progressPercentageText < 1 ? progressPercentageText : 1;
  let progressColour = "#00cc33";

  if (
    progressPercentageText > 0.8 &&
    progressPercentageText < 1 &&
    type !== "exp-fixed"
  ) {
    progressColour = "#ECCD0E";
  }

  if (progressPercentageText >= 1 && type !== "exp-fixed") {
    progressColour = "#CE1717";
  }

  const onButtonSelectedHandler = (selection) => {
    props.onButtonSelected(selection);
  };

  return (
    <View style={styles().cardContainer}>
      <View style={styles().cardViewContainer}>
        <View style={styles().cardLeftContainer}>
          <View style={styles().cardTitleContainer}>
            <Title style={styles().title}>{props.name}</Title>
          </View>
          <View style={styles().cardProgressContainer}>
            <ItemsProgressBar
              colour={progressColour}
              ratio={progressPercentageText}
            />
          </View>
          <View style={styles().cardFundsContainer}>
            <View style={styles().fundLeftContainer}>
              <Text style={styles(progressColour).textSpent}>
                Spent: {toCurrency(expense, currencyCtx.getCurrencyCode)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles().cardRightContainer}>
          <View style={styles().cardCaptionContainer}>
            <Text style={styles().textContribution}>Contribution:</Text>
          </View>
          <View style={styles().cardContributionContainer}>
            <Text style={styles(progressColour).contribution}>{contrib}%</Text>
          </View>
          <View style={styles().cardButtonContainer}>
            <Button
              labelStyle={styles().buttonLabel}
              style={styles().buttonStyle}
              icon="binoculars"
              mode="outlined"
              compact="true"
              onPress={() => onButtonSelectedHandler(name)}
            >
              View
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = (colour) =>
  StyleSheet.create({
    cardContainer: {
      padding: 10,
      height: 120,
      width: "100%",
      marginBottom: 25,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      borderColor: "black",
      shadowColor: "white",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    cardViewContainer: {
      flexDirection: "row",
      flex: 1,
    },
    cardLeftContainer: {
      flex: 0.7,
      height: "100%",
    },
    cardRightContainer: {
      flex: 0.3,
      height: "100%",
    },
    cardTitleContainer: {
      flex: 1,
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    cardProgressContainer: {
      flex: 1,
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    cardFundsContainer: {
      flexDirection: "row",
      flex: 1,
      width: "100%",
    },
    fundLeftContainer: {
      flex: 0.5,
      height: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    fundRightContainer: {
      flex: 0.5,
      height: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    cardCaptionContainer: {
      flex: 0.2,
      alignItems: "center",
      justifyContent: "center",
    },
    cardContributionContainer: {
      flex: 0.4,
      alignItems: "center",
      justifyContent: "center",
    },
    cardButtonContainer: {
      flex: 0.4,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      color: "white",
    },
    textSpent: {
      fontSize: 14,
      fontWeight: "bold",
      color: colour,
    },
    textLimit: {
      fontSize: 13,
      fontWeight: "bold",
    },
    textContribution: {
      fontSize: 13,
      fontWeight: "bold",
      color: "white",
    },
    contribution: {
      fontSize: 26,
      fontWeight: "bold",
      color: colour,
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 15,
    },
    buttonLabel: {
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
    },
  });
