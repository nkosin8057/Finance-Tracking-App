import { LineChart } from "react-native-chart-kit";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Title } from "react-native-paper";

export const Line_Chart = (props) => {
  let hideLabels = [];
  for (let index = 0; index < props.xValues.length; index++) {
    if (index % 2 === 0) {
      hideLabels.push(index);
    }
  }

  let cumSum = [];
  props.yValues.reduce((prev, curr, i) => (cumSum[i] = prev + curr), 0);

  const data = {
    labels: props.xValues,
    datasets: [
      {
        data: cumSum,
        color: () => "rgba(255, 255, 255, 1)",
        strokeWidth: 2,
      },
      {
        data: [
          1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
          1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
          1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        ],
        color: () => "rgba(255, 0, 0, 1)",
        strokeWidth: 6,
      },
    ],
    legend: ["Cumulative Expenses", "Budget"],
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{props.title}</Title>
      <LineChart
        data={data}
        width={0.95 * Dimensions.get("window").width}
        height={220}
        showBarTops={false}
        // withCustomBarColorFromData={true}
        hidePointsAtIndex={hideLabels}
        fromZero={true}
        withDots={false}
        chartConfig={{
          backgroundGradientFrom: "#048ce9",
          backgroundGradientTo: "#3e6e83",
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientToOpacity: 0.9,
          labelColor: (opacity = 1) => `#fff`,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 15,
          borderRadius: 26,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#3e6e83",
  },
});
