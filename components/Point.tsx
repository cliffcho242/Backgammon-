import React from "react";
import { View, StyleSheet } from "react-native";
import Checker from "./Checker";

interface PointProps {
  pointNumber: number;
  inverted: boolean;
  checkers: Array<{ color: "white" | "black" }>;
  onPress?: () => void;
}

export default function Point({ pointNumber, inverted, checkers, onPress }: PointProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.triangle,
          { justifyContent: inverted ? "flex-start" : "flex-end" },
          pointNumber % 2 === 0 ? styles.darkTriangle : styles.lightTriangle,
        ]}
      >
        {checkers.map((checker, index) => (
          <Checker key={index} color={checker.color} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  triangle: {
    width: 40,
    height: 120,
    alignItems: "center",
    paddingVertical: 5,
  },
  darkTriangle: {
    backgroundColor: "#654321",
  },
  lightTriangle: {
    backgroundColor: "#D2691E",
  },
});
