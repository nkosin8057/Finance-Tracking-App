import { StyleSheet, View, Dimensions } from "react-native";
import { Title } from "react-native-paper";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

export const LineBarChart = (props) => {
  const windowWidth = Math.round(Dimensions.get("window").width);
  let legendText = [];
  let legendColours = [];
  let legendPosition = 100;

  if (props.showCumulative) {
    legendColours = ["red", "blue", "silver"];
    legendText = [
      {
        name: props.legendTitles[0],
        labels: { fill: "red", fontWeight: "bold" },
      },
      {
        name: props.legendTitles[1],
        labels: { fill: "blue", fontWeight: "bold" },
      },
      {
        name: props.legendTitles[2],
        labels: { fill: "silver", fontWeight: "bold" },
      },
    ];
  } else {
    legendPosition = 130;
    legendColours = ["red", "silver"];
    legendText = [
      {
        name: props.legendTitles[0],
        labels: { fill: "red", fontWeight: "bold" },
      },
      {
        name: props.legendTitles[1],
        labels: { fill: "silver", fontWeight: "bold" },
      },
    ];
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{props.title}</Title>
      </View>
      <View style={styles.chartContainer}>
        <VictoryChart
          //minDomain={{ x: 0, y: 0 }}
          maxDomain={{ y: +props.maxValue }}
          width={windowWidth}
          height={300} //250
          padding={{ top: 10, bottom: 100, left: 50, right: 20 }}
        >
          <VictoryLegend
            x={legendPosition}
            y={250}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" } }}
            colorScale={legendColours}
            data={legendText}
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
            label={props.axisName}
            tickValues={props.showValues}
            //padding={{ top: 20, bottom: 60 }}
            style={{
              tickLabels: {
                fontWeight: "bold",
                fontSize: 11,
                fill: "white",
                angle: props.orientation,
              },
              axisLabel: {
                fontWeight: "bold",
                fontSize: 13,
                fill: "white",
                padding: 33,
              },
              axis: {
                stroke: "white",
              },
            }}
          />
          <VictoryGroup>
            <VictoryLine
              style={{
                data: {
                  stroke: "#c43a31",
                  strokeWidth: 4,
                  strokeLinecap: "round",
                },
              }}
              data={props.budgetValues}
              name={props.legendTitles[0]}
            />
            {props.showCumulative && (
              <VictoryLine
                style={{
                  data: {
                    stroke: "blue",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                  },
                }}
                interpolation="step"
                data={props.cumulative}
                name={props.legendTitles[1]}
                animate={{
                  duration: 3000,
                  easing: "bounce",
                  //onLoad: { duration: 3000 },
                }}
              />
            )}
            <VictoryBar
              data={props.barValues1}
              name={props.legendTitles[2]}
              barWidth={5}
              style={{ data: { fill: "silver" } }}
              animate={{
                duration: 3000,
                easing: "bounce",
                //onLoad: { duration: 3000 },
              }}
            />
          </VictoryGroup>
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
    justifyContent: "center",
  },
  chartContainer: {
    justifyContent: "center",
    width: "100%",
  },
});
