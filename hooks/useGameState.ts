import { useState } from "react";

export type PlayerColor = "white" | "black";

export interface GameState {
  points: Array<Array<{ color: PlayerColor }>>;
  bar: { white: number; black: number };
  home: { white: number; black: number };
  currentPlayer: PlayerColor;
  diceValues: [number, number] | null;
  selectedPoint: number | null;
}

const initialGameState: GameState = {
  points: Array(25).fill([]).map(() => []), // 24 points + 1 for indexing
  bar: { white: 0, black: 0 },
  home: { white: 0, black: 0 },
  currentPlayer: "white",
  diceValues: null,
  selectedPoint: null,
};

// Setup initial backgammon board position
const getInitialBoardSetup = (): GameState => {
  const state = { ...initialGameState };
  
  // Standard backgammon starting position
  state.points[1] = Array(2).fill({ color: "white" as PlayerColor });
  state.points[12] = Array(5).fill({ color: "white" as PlayerColor });
  state.points[17] = Array(3).fill({ color: "white" as PlayerColor });
  state.points[19] = Array(5).fill({ color: "white" as PlayerColor });
  
  state.points[24] = Array(2).fill({ color: "black" as PlayerColor });
  state.points[13] = Array(5).fill({ color: "black" as PlayerColor });
  state.points[8] = Array(3).fill({ color: "black" as PlayerColor });
  state.points[6] = Array(5).fill({ color: "black" as PlayerColor });
  
  return state;
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(getInitialBoardSetup());

  const rollDice = () => {
    const dice: [number, number] = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    setGameState((prev) => ({
      ...prev,
      diceValues: dice,
    }));
    return dice;
  };

  const selectPoint = (pointNumber: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedPoint: pointNumber,
    }));
  };

  const makeMove = (fromPoint: number, toPoint: number) => {
    // TODO: Implement move validation and state update
    // This is a placeholder for the actual move logic
    console.log(`Moving from point ${fromPoint} to point ${toPoint}`);
  };

  const switchPlayer = () => {
    setGameState((prev) => ({
      ...prev,
      currentPlayer: prev.currentPlayer === "white" ? "black" : "white",
      diceValues: null,
      selectedPoint: null,
    }));
  };

  const resetGame = () => {
    setGameState(getInitialBoardSetup());
  };

  return {
    gameState,
    rollDice,
    selectPoint,
    makeMove,
    switchPlayer,
    resetGame,
  };
}
