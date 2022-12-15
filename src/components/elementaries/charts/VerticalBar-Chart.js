import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

const dataA = [
  { x: "Jan 22", y: 17 },
  { x: "Feb 22", y: 14 },
  { x: "Mar 22", y: 18 },
  { x: "Apr 22", y: 17 },
  { x: "May 22", y: 25 },
  { x: "Jun 22", y: 19 },
  { x: "Jul 22", y: 15 },
  { x: "Aug 22", y: 13 },
  { x: "Sep 22", y: 12 },
  { x: "Oct 22", y: 12 },
  { x: "Nov 22", y: 12 },
  { x: "Dec 22", y: 12 },
];

const dataB = [
  { x: "Jan 22", y: -10 },
  { x: "Feb 22", y: -11 },
  { x: "Mar 22", y: -12 },
  { x: "Apr 22", y: -13 },
  { x: "May 22", y: -14 },
  { x: "Jun 22", y: -15 },
  { x: "Jul 22", y: -16 },
  { x: "Aug 22", y: -17 },
  { x: "Sep 22", y: -18 },
  { x: "Oct 22", y: -19 },
  { x: "Nov 22", y: -20 },
  { x: "Dec 22", y: -21 },
];

// const dataB = dataA.map((point) => {
//   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
//   //return { ...point, y };
//   return { ...point, y };
// });

console.log(dataA);
console.log(dataB);

const width = 400;
const height = 400;

export const VerticalBarChart = () => {
  return (
    <VictoryChart horizontal height={height} width={width} padding={40}>
      <VictoryStack style={{ data: { width: 25 }, labels: { fontSize: 15 } }}>
        <VictoryBar
          style={{ data: { fill: "tomato" } }}
          data={dataA}
          //y={(data) => -Math.abs(data.y)}
          labels={({ datum }) => `${Math.abs(datum.y)}%`}
        />
        <VictoryBar
          style={{ data: { fill: "green" } }}
          data={dataB}
          labels={({ datum }) => `${Math.abs(datum.y)}%`}
        />
      </VictoryStack>

      <VictoryAxis
        style={{
          axis: { stroke: "white" },
          ticks: { stroke: "white" },
          tickLabels: { fontSize: 15, fill: "white" },
        }}
        tickLabelComponent={<VictoryLabel x={width / 3} textAnchor="start" />}
        tickValues={dataA.map((point) => point.x).reverse()}
      />
    </VictoryChart>
  );
};
