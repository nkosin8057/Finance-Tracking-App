import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";

export const ItemsProgressBar = (props) => {
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
    <View style={styles().container}>
      <ProgressBar
        progress={+progressPercentageDisplay}
        color={progressColour}
        style={styles().progressBar}
      />
      <Text style={styles(progressColour).text}>
        {(100 * progressPercentageText).toFixed(1)}%
      </Text>
    </View>
  );
};

const styles = (colour) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    progressBar: { height: 10, width: 150, backgroundColor: "grey" },
    text: {
      fontSize: 18,
      color: colour,
      fontWeight: "bold",
      paddingLeft: 10,
    },
  });
