import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SingleItemDisplayMonth } from "./SingleItemDisplayMonth";
import { SingleItemDisplayYear } from "./SingleItemDisplayYear";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Tab = createMaterialTopTabNavigator();

export const SingleItemDisplay = ({ route }) => {
  const { params } = route;

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
          <Tab.Screen
            name="Month"
            children={() => <SingleItemDisplayMonth props={params.item} />}
          />
          <Tab.Screen
            name="Year"
            children={() => <SingleItemDisplayYear props={params.item} />}
          />
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
