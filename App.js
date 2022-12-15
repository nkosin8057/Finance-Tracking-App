import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { MainSummaryDisplay } from "./src/components/screen/MainSummaryDisplay";
import MonthProvider from "./src/store/MonthProvider";
import IncomeExpensesDataProvider from "./src/store/IncomeExpensesDataProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleItemDisplay } from "./src/components/screen/SingleItemDisplay";
import { Test } from "./src/components/screen/Test";
import { BottomNavigationDisplay } from "./src/components/screen/BottomNavigationDisplay";

export default function App() {
  const Stack = createNativeStackNavigator();

  const image = require("./assets/images/money_plant2.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <MonthProvider>
          <IncomeExpensesDataProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Summary"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Summary" component={MainSummaryDisplay} />
                <Stack.Screen name="SingleItem" component={SingleItemDisplay} />
              </Stack.Navigator>
            </NavigationContainer>
          </IncomeExpensesDataProvider>
        </MonthProvider>
        <ExpoStatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
  },
});
