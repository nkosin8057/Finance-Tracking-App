import Svg from "react-native-svg";
import { Text, Defs, Circle, TextPath, ClipPath } from "react-native-svg";

export const InfoCircularCard = (props) => {
  const itemTitle = props.title;
  const itemValue = props.value;

  return (
    <Svg height="140" width="32%">
      <Defs>
        <ClipPath id="clip">
          <Circle cx="70" cy="70" r="60" />
        </ClipPath>
      </Defs>
      <Circle
        id="path"
        cx="70"
        cy="70"
        r="60"
        stroke="silver"
        strokeWidth="1"
      />
      <Text fill="white" fontWeight="bold" fontSize="16">
        <TextPath href="#path" startOffset="50%">
          {itemTitle}
        </TextPath>
      </Text>
      <Text
        x="70"
        y="70"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="16"
        fill={props.textColour}
      >
        {itemValue}
      </Text>
    </Svg>
  );
};
