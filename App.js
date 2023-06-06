import * as React from "react";
import { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import MonthProvider from "./src/store/MonthProvider";
import { NavigationContainer } from "@react-navigation/native";
import CurrencyFormatProvider from "./src/store/CurrencyFormat";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from "./src/components/screen/HomeScreen";
import { AllItemsDisplay } from "./src/components/screen/AllItemsDisplay";
import { Ionicons } from "@expo/vector-icons";
import { EditDisplay } from "./src/components/screen/EditDisplay";
import { BalanceSheet } from "./src/components/screen/BalanceSheet";
import { Settings } from "./src/components/screen/Settings";
import { Login } from "./src/components/screen/LoginScreen";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setIsUserLoggedIn(true);
  //   } else {
  //     setIsUserLoggedIn(false);
  //   }
  // });

  const getUserHandler = (user) => {
    console.log(user.uid);
    setIsUserLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isUserLoggedIn && <Login getUser={getUserHandler} />}
      {isUserLoggedIn && (
        <MonthProvider>
          <CurrencyFormatProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Home"
                activeColor="white"
                inactiveColor="black"
                barStyle={{ backgroundColor: "rgba(190, 194, 203, 0.7)" }}
                screenOptions={{
                  headerShown: false,
                }}
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
                <Tab.Screen
                  name="Edit"
                  component={EditDisplay}
                  options={{
                    tabBarLabel: "Edit",
                    tabBarIcon: ({ color }) => (
                      <Ionicons
                        name="md-pencil-outline"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="BalanceSheet"
                  component={BalanceSheet}
                  options={{
                    tabBarLabel: "Bal. Sheet",
                    tabBarIcon: ({ color }) => (
                      <Ionicons
                        name="receipt-outline"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color }) => (
                      <Ionicons name="md-settings" color={color} size={26} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </CurrencyFormatProvider>
        </MonthProvider>
      )}
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
