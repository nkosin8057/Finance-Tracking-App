import { Text } from "react-native-paper";
import { StyleSheet, View, Pressable } from "react-native";
import { MoreDescription } from "./MoreDescriptionModal";
import { useState } from "react";

export const ShowMoreText = (props) => {
  const [showModal, setShowModal] = useState(false);
  const slicedString = props.description.slice(0, 80);

  const onClickHandler = () => {
    setShowModal(true);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <View>
      <Text style={styles.text}>
        <Text style={styles.description}>{slicedString}</Text>
        <Pressable onPress={onClickHandler}>
          <Text style={styles.more}> ...More</Text>
        </Pressable>
      </Text>
      <MoreDescription
        modalShow={showModal}
        modalClose={modalCloseHandler}
        description={props.description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    paddingLeft: 5,
    //paddingRight: 2,
  },
  description: {
    fontSize: 13,
    color: "white",
  },
  more: {
    fontSize: 11,
    color: "yellow",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
