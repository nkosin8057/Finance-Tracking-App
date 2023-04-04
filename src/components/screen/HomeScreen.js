import { MainSummaryDisplay } from "./MainSummaryDisplay";
import { SingleItemDisplay } from "./SingleItemDisplay";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const HomeScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Summary"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Summary" component={MainSummaryDisplay} />
      <Stack.Screen name="SingleItem" component={SingleItemDisplay} />
    </Stack.Navigator>
  );
};
