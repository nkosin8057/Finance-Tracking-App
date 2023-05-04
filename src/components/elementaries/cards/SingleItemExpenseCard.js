import { Card } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { ShowMoreText } from "../../modals/ShowMoreText";

export const SingleItemExpenseCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardViewContainer}>
        <View style={styles.upperSectionContainer}>
          <View style={styles.horizontalSectionContainer}>
            <View style={styles.leftSectionContainer}>
              <Text style={styles.title}>Item:</Text>
              <Text style={styles.text}>{props.item}</Text>
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
          </View>
        </View>
        <View style={styles.bottomSectionContainer}>
          <View style={styles.descriptionSectionContainer}>
            <Text style={styles.title}>Description:</Text>
            <ShowMoreText description={props.description} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    height: 180,
    width: "100%",
    marginBottom: 25,
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  cardViewContainer: {
    flexDirection: "column",
    flex: 1,
  },
  upperSectionContainer: {
    flex: 0.3,
    width: "100%",
  },
  middleSectionContainer: {
    flex: 0.3,
    width: "100%",
  },
  bottomSectionContainer: {
    flex: 0.4,
    width: "100%",
    flexDirection: "row",
  },
  descriptionSectionContainer: {
    flex: 1,
    height: "100%",
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
});
