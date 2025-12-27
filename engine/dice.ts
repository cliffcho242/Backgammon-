backgammon-app/
│
├── app/
│   ├── index.tsx
│   └── game.tsx
│
├── components/
│   ├── Board.tsx
│   ├── Point.tsx
│   ├── Checker.tsx
│   └── Dice.tsx
│
├── engine/
│   ├── gameState.ts
│   ├── dice.ts
│   ├── moves.ts
│   └── rules.ts
│
└── state/
    └── gameReducer.ts

export type Player = "white" | "black";

export type Point = {
  owner: Player | null;
  count: number;
};

export type GameState = {
  board: Point[];
  bar: Record<Player, number>;
  bearOff: Record<Player, number>;
  dice: number[];
  currentPlayer: Player;
};

export const initialBoard = (): Point[] =>
  Array.from({ length: 24 }, () => ({
    owner: null,
    count: 0,
  }));

export const initialGameState: GameState = {
  board: initialBoard(),
  bar: { white: 0, black: 0 },
  bearOff: { white: 0, black: 0 },
  dice: [],
  currentPlayer: "white",
};

export const rollDice = (): number[] => {
  const d1 = Math.ceil(Math.random() * 6);
  const d2 = Math.ceil(Math.random() * 6);
  return d1 === d2 ? [d1, d1, d1, d1] : [d1, d2];
};

import { GameState } from "./gameState";

export const isMoveLegal = (
  state: GameState,
  from: number,
  to: number
): boolean => {
  if (to < 0 || to > 23) return false;

  const target = state.board[to];
  return !(
    target.owner &&
    target.owner !== state.currentPlayer &&
    target.count > 1
  );
};

import { GameState } from "./gameState";
import { isMoveLegal } from "./rules";

export const applyMove = (
  state: GameState,
  from: number,
  to: number
): GameState => {
  if (!isMoveLegal(state, from, to)) return state;

  const board = [...state.board];
  const moving = board[from];

  if (moving.count === 0) return state;

  moving.count--;
  if (moving.count === 0) moving.owner = null;

  const target = board[to];
  if (target.owner && target.owner !== state.currentPlayer && target.count === 1) {
    target.owner = state.currentPlayer;
    target.count = 1;
  } else {
    target.owner = state.currentPlayer;
    target.count++;
  }

  return { ...state, board };
};

import { View } from "react-native";

export default function Checker({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: color,
        marginVertical: 2,
      }}
    />
  );
}

import { View, TouchableOpacity } from "react-native";
import Checker from "./Checker";

export default function Point({ point }: any) {
  return (
    <TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        {Array.from({ length: point.count }).map((_, i) => (
          <Checker key={i} color={point.owner === "white" ? "#fff" : "#000"} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

import { View } from "react-native";
import Point from "./Point";

export default function Board({ board }: any) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {board.map((p: any, i: number) => (
        <Point key={i} point={p} />
      ))}
    </View>
  );
}

import { View, Text } from "react-native";

export default function Dice({ dice }: { dice: number[] }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {dice.map((d, i) => (
        <Text key={i} style={{ fontSize: 24, margin: 4 }}>
          🎲 {d}
        </Text>
      ))}
    </View>
  );
}

import { useState } from "react";
import { View, Button } from "react-native";
import Board from "../components/Board";
import Dice from "../components/Dice";
import { initialGameState } from "../engine/gameState";
import { rollDice } from "../engine/dice";

export default function Game() {
  const [state, setState] = useState(initialGameState);

  return (
    <View style={{ padding: 20 }}>
      <Dice dice={state.dice} />
      <Button
        title="Roll Dice"
        onPress={() => setState({ ...state, dice: rollDice() })}
      />
      <Board board={state.board} />
    </View>
  );
}