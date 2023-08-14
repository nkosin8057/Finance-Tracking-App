import { BarChart } from "react-native-chart-kit";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Title } from "react-native-paper";

export const Bar_Chart = (props) => {
  let hideLabels = [];

  for (let index = 0; index < props.xValues.length; index++) {
    if (index % 2 === 0) {
      hideLabels.push(index);
    }
  }

  let setColours = [];
  props.yValues.forEach((num) => {
    if (num >= 0 && props.customBarColours === true) {
      setColours.push((opacity = 1) => `rgba(0, 255, 0, ${opacity})`);
    }
    if (num < 0 && props.customBarColours === true) {
      setColours.push((opacity = 1) => `rgba(255, 0, 0, ${opacity})`);
    }
    if (props.customBarColours === false) {
      setColours.push((opacity = 1) => `rgba(255, 255, 255, ${opacity})`);
    }
  });

  const data = {
    labels: props.xValues,
    datasets: [
      {
        data: props.yValues,
        colors: setColours,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{props.title}</Title>
      <BarChart
        data={data}
        width={0.95 * Dimensions.get("window").width}
        height={220}
        showBarTops={false}
        withCustomBarColorFromData={true}
        hidePointsAtIndex={hideLabels}
        fromZero={true}
        chartConfig={{
          backgroundGradientFrom: "#048ce9",
          backgroundGradientTo: "#3e6e83",
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientToOpacity: 0.9,
          barPercentage: 0.2,

          labelColor: (opacity = 1) => `#fff`,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
