import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllItemDisplayMonth } from "./AllItemsDisplayMonth";
import { AllItemsDisplayYear } from "./AllItemsDisplayYear";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

const Tab = createMaterialTopTabNavigator();

export const AllItemsDisplay = () => {
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
          <Tab.Screen name="Month" component={AllItemDisplayMonth} />
          <Tab.Screen name="Year" component={AllItemsDisplayYear} />
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
