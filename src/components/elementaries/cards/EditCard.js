import { Button } from "react-native-paper";
import { StyleSheet, View, Text, Alert } from "react-native";
import { ShowMoreText } from "../../modals/ShowMoreText";

export const EditCard = (props) => {
  const onButtonEditHandler = () => {
    props.onButtonEditSelected(props.id);
  };

  const onButtonDeleteHandler = () => {
    Alert.alert(
      "Delete Data",
      "Are you sure you want to delete the selected data?",
      [
        {
          text: "No",
          onPress: () => null,
        },
        { text: "Yes", onPress: () => deleteHandler() },
      ]
    );
  };

  const deleteHandler = () => {
    props.onButtonDeleteSelected(props.id);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardViewContainer}>
        <View style={styles.upperSectionContainer}>
          <View style={styles.horizontalSectionContainer}>
            <View style={styles.leftSectionContainer}>
              <Text style={styles.title}>Item:</Text>
              <Text style={styles.text}>{props.name}</Text>
            </View>
            <View style={styles.rightSectionContainer}>
              <Text style={styles.title}>Date:</Text>
              <Text style={styles.text}>{props.date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.middleSectionContainer}>
          <View style={styles.horizontalSectionContainer}>
            <View style={styles.leftSectionContainer}>
              <Text style={styles.title}>Amount:</Text>
              <Text style={styles.text}>{props.amount}</Text>
            </View>
            <View style={styles.rightSectionContainer}>
              <Text style={styles.title}>Budget:</Text>
              <Text style={styles.text}>{props.budget}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lowerSectionContainer}>
          <View style={styles.horizontalSectionContainer}>
            <View style={styles.leftSectionContainer}>
              <Text style={styles.title}>Type:</Text>
              <Text style={styles.text}>{props.type}</Text>
            </View>
            <View style={styles.rightSectionContainer}></View>
          </View>
        </View>
        <View style={styles.bottomSectionContainer}>
          <View style={styles.descriptionSectionContainer}>
            <Text style={styles.title}>Description:</Text>
            <ShowMoreText description={props.description} />
          </View>
        </View>
        <View style={styles.bottomButtonSectionContainer}>
          <View style={styles.buttonSectionContainer}>
            <Button
              labelStyle={styles.buttonLabel}
              style={styles.buttonStyle}
              icon="delete"
              mode="outlined"
              onPress={() => onButtonDeleteHandler()}
            >
              DELETE
            </Button>
          </View>
          <View style={styles.buttonSectionContainer}>
            <Button
              labelStyle={styles.buttonLabel}
              style={styles.buttonStyle}
              icon="pencil"
              mode="outlined"
              children={"EDIT"}
              onPress={() => onButtonEditHandler()}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    height: 280,
    width: "100%",
    marginBottom: 25,
    elevation: 3,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },
  cardViewContainer: {
    flexDirection: "column",
    flex: 1,
  },
  upperSectionContainer: {
    flex: 0.2,
    width: "100%",
  },
  middleSectionContainer: {
    flex: 0.2,
    width: "100%",
  },
  lowerSectionContainer: {
    flex: 0.2,
    width: "100%",
  },
  bottomSectionContainer: {
    flex: 0.3,
    width: "100%",
    flexDirection: "row",
  },
  bottomButtonSectionContainer: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
  },
  descriptionSectionContainer: {
    flex: 1,
    height: "100%",
  },
  buttonSectionContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 7,
    paddingTop: 1,
  },

  horizontalSectionContainer: {
    flexDirection: "row",
    flex: 1,
  },
  leftSectionContainer: {
    flex: 0.5,
    height: "100%",
  },
  rightSectionContainer: {
    flex: 0.5,
    height: "100%",
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    color: "white",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
  },
  descripText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
    paddingLeft: 5,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    width: 90,
    height: 33,
    alignSelf: "center",
  },
  buttonLabel: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "justify",
    lineHeight: 12,
  },
});
