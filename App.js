import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SemiCircleProgress from "./assets/progress_bar/src";

export default function App() {
  return (
    <SemiCircleProgress percentage={100} progressColor={"green"}>
      <Text style={{ fontSize: 32, color: "green" }}>35%</Text>
    </SemiCircleProgress>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
