import React from "react";
import { View, StyleSheet } from "react-native";
import Point from "./Point";
import { GameState } from "../hooks/useGameState";

interface BoardProps {
  gameState?: GameState;
}

export default function Board({ gameState }: BoardProps) {
  // Backgammon board has 24 points (triangles)
  // Points 1-6: bottom right (player home)
  // Points 7-12: bottom left
  // Points 13-18: top left
  // Points 19-24: top right (opponent home)
  
  const renderPoints = (start: number, end: number, inverted: boolean) => {
    const points = [];
    for (let i = start; i <= end; i++) {
      points.push(
        <Point
          key={i}
          pointNumber={i}
          inverted={inverted}
          checkers={gameState?.points?.[i] || []}
        />
      );
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        {/* Top half of board (points 13-24) */}
        <View style={styles.halfBoard}>
          <View style={styles.quadrant}>
            {renderPoints(13, 18, true)}
          </View>
          <View style={styles.bar} />
          <View style={styles.quadrant}>
            {renderPoints(19, 24, true)}
          </View>
        </View>

        {/* Bottom half of board (points 1-12) */}
        <View style={styles.halfBoard}>
          <View style={styles.quadrant}>
            {renderPoints(7, 12, false)}
          </View>
          <View style={styles.bar} />
          <View style={styles.quadrant}>
            {renderPoints(1, 6, false)}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B4513",
    padding: 10,
  },
  boardContainer: {
    flex: 1,
    flexDirection: "column",
  },
  halfBoard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quadrant: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bar: {
    width: 30,
    backgroundColor: "#654321",
  },
});
