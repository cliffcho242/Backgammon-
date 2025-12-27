import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface DiceProps {
  onRoll?: (values: [number, number]) => void;
  values?: [number, number];
  disabled?: boolean;
}

export default function Dice({ onRoll, values, disabled }: DiceProps) {
  const [diceValues, setDiceValues] = useState<[number, number]>(values || [1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (disabled || isRolling) return;

    setIsRolling(true);
    
    // Simulate rolling animation
    const rollInterval = setInterval(() => {
      setDiceValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ] as [number, number]);
    }, 100);

    // Stop after 500ms and set final values
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValues: [number, number] = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDiceValues(finalValues);
      setIsRolling(false);
      onRoll?.(finalValues);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={rollDice}
        disabled={disabled || isRolling}
        style={[styles.rollButton, (disabled || isRolling) && styles.disabled]}
      >
        <Text style={styles.buttonText}>
          {isRolling ? "Rolling..." : "Roll Dice"}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.diceContainer}>
        <View style={styles.die}>
          <Text style={styles.dieText}>{values?.[0] || diceValues[0]}</Text>
        </View>
        <View style={styles.die}>
          <Text style={styles.dieText}>{values?.[1] || diceValues[1]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  diceContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
  },
  die: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#333",
  },
  dieText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  rollButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#CCCCCC",
  },
});
