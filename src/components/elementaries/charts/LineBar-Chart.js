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

const xyData = (xData, yData) => {
  let element = [];

  for (let index = 0; index < xData.length; index++) {
    let obj = { x: 0, y: 0 };
    obj.x = xData[index];
    obj.y = yData[index];
    element.push(obj);
  }
  return element;
};

export const LineBarChart = (props) => {
  const dailySpent = xyData(props.xValues, props.yValues);

  let cumSum = [];
  props.yValues.reduce((prev, curr, i) => (cumSum[i] = prev + curr), 0);
  const cumulative = xyData(props.xValues, cumSum);

  const budget = xyData(props.xValues, props.budgetValues);

  const findMax = Math.max(...cumSum.concat(props.yValues, props.budgetValues));
  const yMax = findMax + findMax * 0.1;

  const windowWidth = Math.round(Dimensions.get("window").width);

  return (
    <View style={styles.container}>
      <VictoryChart
        minDomain={{ x: 0, y: 0 }}
        maxDomain={{ y: +yMax }}
        width={windowWidth}
        height={250}
        padding={{ top: 50, bottom: 100, left: 50, right: 20 }}
      >
        <VictoryLabel
          text="Daily Spend vs. Budget"
          x={225}
          y={30}
          textAnchor="middle"
          style={[{ fontWeight: "bold", fontSize: 18, fill: "white" }]}
        />
        <VictoryLegend
          x={100}
          y={200}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" } }}
          colorScale={["red", "blue", "silver"]}
          data={[
            { name: "Budget", labels: { fill: "red", fontWeight: "bold" } },
            {
              name: "Cumulative",
              labels: { fill: "blue", fontWeight: "bold" },
            },
            { name: "Daily", labels: { fill: "silver", fontWeight: "bold" } },
          ]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          style={{
            tickLabels: { fontWeight: "bold", fontSize: 11, fill: "white" },
            axis: {
              stroke: "white",
            },
          }}
        />
        <VictoryAxis
          label="Day"
          tickValues={props.showValues}
          //padding={{ top: 20, bottom: 60 }}
          style={{
            tickLabels: { fontWeight: "bold", fontSize: 11, fill: "white" },
            axisLabel: { fontWeight: "bold", fontSize: 13, fill: "white" },
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
            data={budget}
            name="budget"
          />
          <VictoryLine
            style={{
              data: {
                stroke: "blue",
                strokeWidth: 2,
                strokeLinecap: "round",
              },
            }}
            interpolation="step"
            data={cumulative}
            name="cumulative"
            animate={{
              duration: 3000,
              easing: "bounce",
              //onLoad: { duration: 3000 },
            }}
          />
          <VictoryBar
            data={dailySpent}
            name="dailySpent"
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
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "grey",

    //width: "80%",
  },
});
