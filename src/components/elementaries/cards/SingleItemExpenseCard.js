import { Card, Title } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ShowMoreText } from "../../modals/ShowMoreText";
import { CurrencyFormatContext } from "../../../store/CurrencyFormat";
import { toCurrency } from "../../computations/ToCurrency";
import { useContext } from "react";
import dateFormat from "dateformat";

export const SingleItemExpenseCard = (props) => {
  const currencyCtx = useContext(CurrencyFormatContext);

  const item = props.item;
  const date = dateFormat(new Date(props.date), "dd mmm yy");
  const amount = toCurrency(+props.amount, currencyCtx.getCurrencyCode);
  const description = props.description;

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardViewContainer}>
        <View style={styles.cardTopContainer}>
          <Title style={styles.title}>{item}</Title>
        </View>
        <View style={styles.cardBottomContainer}>
          <View style={styles.cardLeftContainer}>
            <View style={styles.cardDateContainer}>
              <Text style={styles.text}>{date}</Text>
            </View>
            <View style={styles.cardAmountContainer}>
              <Text style={styles.text}>{amount}</Text>
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
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    height: 140,
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 25,
    elevation: 3,
    backgroundColor: "black",
    opacity: 0.7,
  },
  cardViewContainer: {
    flexDirection: "column",
    flex: 1,
  },
  cardTopContainer: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottomContainer: {
    flex: 0.7,
    flexDirection: "row",
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
  title: {
    fontWeight: "bold",
    color: "white",
  },
  cardAmountContainer: {
    flex: 0.4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cardRightContainer: {
    flex: 0.6,
    height: "100%",
  },
  descriptionTitleContainer: {
    flex: 0.4,
    height: "100%",
  },
  descriptionContainer: {
    flex: 0.6,
    height: "100%",
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
