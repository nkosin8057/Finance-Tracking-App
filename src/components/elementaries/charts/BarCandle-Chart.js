import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryAxis,
} from "victory-native";
import { StyleSheet, View, Dimensions } from "react-native";
import { Title } from "react-native-paper";

export const BarCandleChart = (props) => {
  const windowWidth = Math.round(Dimensions.get("window").width);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Profit / Loss</Title>
      </View>
      <View style={styles.chartContainer}>
        <VictoryChart
          width={windowWidth}
          height={300}
          padding={{ top: 40, bottom: 100, left: 50, right: 20 }}
          maxDomain={{ y: +props.maxValue }}
          minDomain={{ y: +props.minValue }}
        >
          <VictoryLegend
            x={150}
            y={250}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "white" } }}
            colorScale={["green", "red"]}
            data={[
              {
                name: "Profit",
                labels: { fill: "green", fontWeight: "bold" },
              },
              {
                name: "Loss",
                labels: { fill: "red", fontWeight: "bold" },
              },
            ]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => tick}
            style={{
              tickLabels: { fontWeight: "bold", fontSize: 11, fill: "white" },
              axis: {
                stroke: "transparent",
              },
            }}
          />
          <VictoryAxis
            //tickValues={props.showValues}
            style={{
              tickLabels: {
                fontWeight: "bold",
                fontSize: 11,
                fill: "white",
                angle: props.orientation,
              },
              axis: {
                stroke: "white",
              },
            }}
          />
          <VictoryBar
            data={props.data}
            style={{
              data: {
                fill: ({ datum }) => (datum.dir === 1 ? "green" : "red"),
                fillOpacity: 0.7,
              },
            }}
            animate={{
              duration: 3000,
              easing: "bounce",
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  chartContainer: {
    justifyContent: "center",
    width: "100%",
  },
});
