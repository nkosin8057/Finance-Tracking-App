import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import { MainSummaryDisplay } from "./src/components/screen/MainSummaryDisplay";
import MonthProvider from "./src/store/MonthProvider";
import IncomeExpensesDataProvider from "./src/store/IncomeExpensesDataProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleItemDisplay } from "./src/components/screen/SingleItemDisplay";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
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
              <Stack.Screen name="Single-Item" component={SingleItemDisplay} />
            </Stack.Navigator>
          </NavigationContainer>
        </IncomeExpensesDataProvider>
      </MonthProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "silver",
    width: "100%",
  },
});
