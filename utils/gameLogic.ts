import { PlayerColor } from "../hooks/useGameState";

export interface Move {
  from: number;
  to: number;
  distance: number;
}

/**
 * Validates if a move is legal in backgammon
 */
export function isValidMove(
  from: number,
  to: number,
  player: PlayerColor,
  diceValue: number,
  points: Array<Array<{ color: PlayerColor }>>
): boolean {
  // Check if move distance matches dice value
  const distance = Math.abs(to - from);
  if (distance !== diceValue) {
    return false;
  }

  // Check if moving in correct direction
  if (player === "white" && to <= from) {
    return false;
  }
  if (player === "black" && to >= from) {
    return false;
  }

  // Check if source point has player's checker
  const fromPoint = points[from];
  if (!fromPoint || fromPoint.length === 0 || fromPoint[0].color !== player) {
    return false;
  }

  // Check if destination point is available
  const toPoint = points[to];
  if (toPoint && toPoint.length > 0 && toPoint[0].color !== player) {
    // Can only move to opponent's point if there's only one checker (blot)
    if (toPoint.length > 1) {
      return false;
    }
  }

  return true;
}

/**
 * Gets all possible moves for a given dice roll
 */
export function getPossibleMoves(
  diceValues: [number, number],
  player: PlayerColor,
  points: Array<Array<{ color: PlayerColor }>>
): Move[] {
  const moves: Move[] = [];
  
  // Find all points with player's checkers
  points.forEach((point, index) => {
    if (point.length > 0 && point[0].color === player) {
      // Try each dice value
      diceValues.forEach((dice) => {
        const to = player === "white" ? index + dice : index - dice;
        if (to >= 1 && to <= 24 && isValidMove(index, to, player, dice, points)) {
          moves.push({ from: index, to, distance: dice });
        }
      });
    }
  });

  return moves;
}

/**
 * Checks if a player can bear off (remove checkers from board)
 */
export function canBearOff(player: PlayerColor, points: Array<Array<{ color: PlayerColor }>>): boolean {
  const homeRange = player === "white" ? [1, 6] : [19, 24];
  
  // Check if all checkers are in home board
  for (let i = 1; i <= 24; i++) {
    if (i >= homeRange[0] && i <= homeRange[1]) continue;
    
    const point = points[i];
    if (point && point.length > 0 && point[0].color === player) {
      return false;
    }
  }
  
  return true;
}

/**
 * Checks if the game is won by a player
 */
export function checkWinner(home: { white: number; black: number }): PlayerColor | null {
  if (home.white === 15) return "white";
  if (home.black === 15) return "black";
  return null;
}

/**
 * Calculates the pip count (total distance to home) for a player
 */
export function calculatePipCount(
  player: PlayerColor,
  points: Array<Array<{ color: PlayerColor }>>
): number {
  let count = 0;
  
  points.forEach((point, index) => {
    if (point.length > 0 && point[0].color === player) {
      const distance = player === "white" ? 25 - index : index;
      count += distance * point.length;
    }
  });
  
  return count;
}
