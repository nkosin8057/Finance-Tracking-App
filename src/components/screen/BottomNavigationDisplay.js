import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AllItemsDisplay } from "./AllItemsDisplay";
import { Settings } from "./Settings";

const Tab = createMaterialBottomTabNavigator();

export const BottomNavigationDisplay = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Expenses" component={AllItemsDisplay} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
