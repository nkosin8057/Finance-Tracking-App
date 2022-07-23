import SemiCircleProgress from "../../../../assets/progress_semi_cirlce/src";
import { Text } from "react-native";

export const SemiCircleProgressDisplay = (props) => {
  const progressPercentageText = ((100 * props.spent) / props.total).toFixed(1);
  const progressPercentageDisplay =
    progressPercentageText < 100 ? progressPercentageText : 100;
  let progressColour = "#00cc33";

  if (progressPercentageText > 80 && progressPercentageText < 100) {
    progressColour = "#ECCD0E";
  }

  if (progressPercentageText >= 100) {
    progressColour = "#CE1717";
  }
  console.log(progressColour);
  return (
    <SemiCircleProgress
      percentage={progressPercentageDisplay}
      progressColor={progressColour}
      initialPercentage={0}
      animationSpeed={2}
      circleRadius={100}
      progressWidth={25}
    >
      <Text style={{ fontSize: 28, color: progressColour, fontWeight: "bold" }}>
        {progressPercentageText}%
      </Text>
    </SemiCircleProgress>
  );
};
