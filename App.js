import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ImageBackground, Text } from "react-native";
import { MainSummaryDisplay } from "./src/components/screen/MainSummaryDisplay";
import MonthProvider from "./src/store/MonthProvider";
import IncomeExpensesDataProvider from "./src/store/IncomeExpensesDataProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleItemDisplay } from "./src/components/screen/SingleItemDisplay";
import { Settings } from "./src/components/screen/Settings";
import CurrencyFormatProvider from "./src/store/CurrencyFormat";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from "./src/components/screen/HomeScreen";
import { AllItemsDisplay } from "./src/components/screen/AllItemsDisplay";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  // const d = new Date(2022, 11, 1).valueOf();
  // console.log(new Date(d).getMonth());

  const Tab = createMaterialBottomTabNavigator();

  const image = require("./assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <MonthProvider>
        <IncomeExpensesDataProvider>
          <CurrencyFormatProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Home"
                activeColor="white"
                inactiveColor="grey"
                barStyle={{ backgroundColor: "silver" }}
                screenOptions={{
                  headerShown: false,
                }}
                //translucent navigation bar on Android
              >
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                      <Ionicons name="home-outline" color={color} size={26} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="All"
                  component={AllItemsDisplay}
                  options={{
                    tabBarLabel: "All",
                    tabBarIcon: ({ color }) => (
                      <Ionicons name="wallet" color={color} size={26} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </CurrencyFormatProvider>
        </IncomeExpensesDataProvider>
      </MonthProvider>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    //marginTop: StatusBar.currentHeight,
  },
});
