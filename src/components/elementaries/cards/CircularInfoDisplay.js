import Svg from "react-native-svg";
import {
  Text,
  Defs,
  Circle,
  TextPath,
  ClipPath,
  Image,
} from "react-native-svg";

export const CircularTextDisplay = (props) => {
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
        {/* <Image
          x="10"
          y="10"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          opacity="1"
          href={require("../../../assets/images/money_jar.jpg")}
          clipPath="url(#clip)"
        /> */}
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
