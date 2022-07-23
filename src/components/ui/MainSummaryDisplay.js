import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { ItemsProgressBar } from "./progress_displays/ItemsProgressBar";

const mockExpenses = [
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  { name: "DSTV", date: "2022/07/01", total: 400, limit: 400, type: "single" },
  {
    name: "Petrol",
    date: "2022/07/03",
    total: 1437,
    limit: 3000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/09",
    total: 300,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
  {
    name: "Groceries",
    date: "2022/07/01",
    total: 236.51,
    limit: 2000,
    type: "multiple",
  },
];

export const MainSummaryDisplay = (props) => {
  const progressPercentageText = props.spent / props.total;
  const progressPercentageDisplay =
    progressPercentageText < 1 ? progressPercentageText : 1;
  let progressColour = "#00cc33";

  if (progressPercentageText > 0.8 && progressPercentageText < 1) {
    progressColour = "#ECCD0E";
  }

  if (progressPercentageText >= 1) {
    progressColour = "#CE1717";
  }
  return (
    <Card style={styles().cardContainer}>
      <View style={styles().cardViewContainer}>
        <View style={styles().cardLeftContainer}>
          <View style={styles().cardTitleContainer}>
            <Title style={styles().title}>Card Title</Title>
          </View>
          <View style={styles().cardProgressContainer}>
            <ItemsProgressBar spent={3100} total={30000} />
          </View>
          <View style={styles().cardFundsContainer}>
            <View style={styles().fundLeftContainer}>
              <Text style={styles(progressColour).textSpent}>
                Spent: R21 000.00
              </Text>
            </View>
            <View style={styles().fundRightContainer}>
              {/* <Text style={styles().textLimit}>Limit: R31 000.00</Text> */}
            </View>
          </View>
        </View>
        <View style={styles().cardRightContainer}>
          <View style={styles().cardCaptionContainer}>
            <Text style={styles().textContribution}>Contribution:</Text>
          </View>
          <View style={styles().cardContributionContainer}>
            <Text style={styles(progressColour).contribution}>24%</Text>
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
      width: "95%",
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
      color: "#3666e0",
    },
    textSpent: {
      fontSize: 13,
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
      color: "#3666e0",
    },
    contribution: {
      fontSize: 26,
      fontWeight: "bold",
      color: colour,
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: "#3666e0",
      borderRadius: 15,
    },
    buttonLabel: {
      color: "#3666e0",
      fontSize: 10,
      fontWeight: "bold",
    },
  });
//<ItemsProgressBar spent={25000} total={30000} />
