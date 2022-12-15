import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllItemDisplayMonth } from "./AllItemsDisplayMonth";
import { AllItemsDisplayYear } from "./AllItemsDisplayYear";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Tab = createMaterialTopTabNavigator();

export const AllItemsDisplay = () => {
  const image = require("../../../assets/images/money_jar.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
