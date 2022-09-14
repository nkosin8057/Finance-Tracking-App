import { Button, Card, Title } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { mockIncome } from "../ui/MockData";
import { ItemsProgressBar } from "../ui/progress_displays/ItemsProgressBar";

export const ExpenseCard = (props) => {
  const expense = +props.total;
  const income = +mockIncome[0].total;
  const limit = +props.limit;
  const type = props.type;

  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  //console.log(expense);
  //console.log(mockIncome[0].total);

  const contrib = ((expense / income) * 100).toFixed(1);

  const progressPercentageText = expense / limit;
  const progressPercentageDisplay =
    progressPercentageText < 1 ? progressPercentageText : 1;
  let progressColour = "#00cc33";

  if (
    progressPercentageText > 0.8 &&
    progressPercentageText < 1 &&
    type !== "single"
  ) {
    progressColour = "#ECCD0E";
  }

  if (progressPercentageText >= 1 && type !== "single") {
    progressColour = "#CE1717";
  }

  return (
    <Card style={styles().cardContainer}>
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
                Spent: {formatter.format(expense)}
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
              onPress={() => console.log("Pressed")}
            >
              View
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = (colour) =>
  StyleSheet.create({
    cardContainer: {
      padding: 10,
      height: 120,
      width: "100%",
      marginBottom: 25,
      elevation: 3,
      backgroundColor: "transparent",
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
      fontSize: 16,
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
