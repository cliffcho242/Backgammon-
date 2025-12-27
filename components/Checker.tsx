import React from "react";
import { View, StyleSheet } from "react-native";

interface CheckerProps {
  color: "white" | "black";
  position?: { x: number; y: number };
}

export default function Checker({ color, position }: CheckerProps) {
  return (
    <View
      style={[
        styles.checker,
        color === "white" ? styles.whiteChecker : styles.blackChecker,
        position && { position: "absolute", left: position.x, top: position.y },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  checker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#333",
  },
  whiteChecker: {
    backgroundColor: "#FFFFFF",
  },
  blackChecker: {
    backgroundColor: "#000000",
  },
});
