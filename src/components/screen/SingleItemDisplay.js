import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SingleItemDisplayMonth } from "./SingleItemDisplayMonth";
import { SingleItemDisplayYear } from "./SingleItemDisplayYear";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export const SingleItemDisplay = ({ route }) => {
  const { params } = route;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Tab.Navigator
          initialRouteName="Month"
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarLabelStyle: { fontSize: 18, fontWeight: "bold" },
            tabBarStyle: {
              backgroundColor: "transparent",
              marginTop: StatusBar.currentHeight,
            },
          }}
        >
          <Tab.Screen
            name="Month"
            children={() => <SingleItemDisplayMonth props={params.item} />}
          />
          <Tab.Screen
            name="Year"
            children={() => <SingleItemDisplayYear props={params.item} />}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(190, 194, 203, 0.6)",
  },
});
