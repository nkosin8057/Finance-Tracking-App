import { Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export const SemiCircleProgressDisplay = (props) => {
  const progressPercentageText = ((100 * props.spent) / props.total).toFixed(1);
  const progressPercentageDisplay =
    progressPercentageText < 100 ? +progressPercentageText : 100;
  let progressColour = "#00cc33";

  if (progressPercentageText > 80 && progressPercentageText < 100) {
    progressColour = "#ECCD0E";
  }

  if (progressPercentageText >= 100) {
    progressColour = "#CE1717";
  }

  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={progressPercentageDisplay}
      tintColor={progressColour}
      backgroundColor="#3d5875"
      rotation={275}
      duration={1000}
      delay={500}
    >
      {(fill) => (
        <Text
          style={{
            fontSize: 20,
            color: progressColour,
            fontWeight: "bold",
          }}
        >
          {progressPercentageText}%
        </Text>
      )}
    </AnimatedCircularProgress>
  );
};
