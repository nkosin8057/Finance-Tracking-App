import { Text, View, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

export const ItemsProgressBar = (props) => {
  const progressPercentageText = props.ratio;
  const progressPercentageDisplay =
    progressPercentageText < 1 ? progressPercentageText : 1;
  const progressColour = props.colour;

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
