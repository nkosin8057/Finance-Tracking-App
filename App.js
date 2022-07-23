import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SemiCircleProgressDisplay } from "./src/components/ui/progress_displays/SemiCircleProgress";
import { ProgressBar, Button } from "react-native-paper";
import { ItemsProgressBar } from "./src/components/ui/progress_displays/ItemsProgressBar";
import { MainSummaryDisplay } from "./src/components/ui/MainSummaryDisplay";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SemiCircleProgressDisplay spent={28000} total={30000} /> */}
      {/* <ItemsProgressBar spent={25000} total={30000} /> */}
      <MainSummaryDisplay spent={25000} total={30000} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
