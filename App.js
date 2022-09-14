import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SemiCircleProgressDisplay } from "./src/components/ui/progress_displays/SemiCircleProgress";
import { ProgressBar, Button } from "react-native-paper";
import { ItemsProgressBar } from "./src/components/ui/progress_displays/ItemsProgressBar";
import { MainSummaryDisplay } from "./src/components/ui/MainSummaryDisplay";
import { mockData } from "./src/components/ui/MockData";
import { MonthYearPicker } from "./src/components/ui/menus/MonthYearPicker";
import MonthProvider from "./src/store/MonthProvider";

export default function App() {
  const maxDate = new Date(
    Math.max(
      ...mockData.map((element) => {
        return new Date(element.date);
      })
    )
  );

  return (
    <>
      <View style={styles.container}>
        <MonthProvider>
          {/* <MonthYearPicker /> */}
          <MainSummaryDisplay />
        </MonthProvider>
      </View>
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
