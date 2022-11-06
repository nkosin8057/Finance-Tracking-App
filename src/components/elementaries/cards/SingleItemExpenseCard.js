import { Card, Title } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ShowMoreText } from "../../modals/ShowMoreText";

export const SingleItemExpenseCard = (props) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  const date = new Date(props.date).toLocaleDateString("en-ZA", options);
  const amount = formatter.format(+props.amount);
  const description = props.description;

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardViewContainer}>
        <View style={styles.cardLeftContainer}>
          <View style={styles.cardDateContainer}>
            <Title style={styles.date}>{date}</Title>
          </View>
          <View style={styles.cardAmountContainer}>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </View>
        <View style={styles.cardRightContainer}>
          <View style={styles.descriptionTitleContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <ShowMoreText description={description} />
          </ScrollView>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    height: 120,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 25,
    elevation: 3,
    backgroundColor: "transparent",
  },
  cardViewContainer: {
    flexDirection: "row",
    flex: 1,
  },
  cardLeftContainer: {
    flex: 0.4,
    height: "100%",
  },
  cardDateContainer: {
    flex: 0.6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontWeight: "bold",
    color: "white",
  },
  cardAmountContainer: {
    flex: 0.4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cardRightContainer: {
    flex: 0.6,
    height: "100%",
  },
  descriptionTitleContainer: {
    flex: 0.3,
    height: "100%",
  },
  descriptionContainer: {
    flex: 0.7,
    height: "100%",
    borderColor: "white",
    borderWidth: 2,
  },
  description: {
    fontSize: 13,
    //fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  descriptionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 5,
  },
});
