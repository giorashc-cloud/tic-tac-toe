import React, { useState } from 'react';
import './TicTacToeBoard.css';

const GRID_SIZE = 3;

type CellValue = 'X' | 'O' | null;
type WinningLine = number[] | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal \
  [2, 4, 6], // Diagonal /
];

export const TicTacToeBoard: React.FC = () => {
  const [cells, setCells] = useState<CellValue[]>(
    Array(GRID_SIZE * GRID_SIZE).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const checkWinner = (cellsToCheck: CellValue[]): WinningLine => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        cellsToCheck[a] &&
        cellsToCheck[a] === cellsToCheck[b] &&
        cellsToCheck[a] === cellsToCheck[c]
      ) {
        return combination;
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (cells[index] !== null || winningLine) return; // Cell already filled or game won

    const newCells = [...cells];
    // Player 1 always uses X, Player 2 always uses O
    newCells[index] = currentPlayer === 1 ? 'X' : 'O';
    setCells(newCells);

    // Check for winner
    const winner = checkWinner(newCells);
    if (winner) {
      setWinningLine(winner);
      setWinner(currentPlayer);
    } else {
      // Toggle player for next turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const renderShape = (value: CellValue) => {
    if (!value) return null;

    if (value === 'X') {
      return (
        <svg className="cell-shape" viewBox="0 0 100 100">
          <line
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="10"
            x2="10"
            y2="90"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (value === 'O') {
      return (
        <svg className="cell-shape" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
        </svg>
      );
    }

    return null;
  };

  const getLineCoordinates = (winLine: WinningLine) => {
    if (!winLine) return null;

    const cellPositions = winLine.map((index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return { row, col };
    });

    const start = cellPositions[0];
    const end = cellPositions[2];

    // Calculate percentages for line position
    const startX = (start.col * 100) / 3 + 100 / 6; // Center of first cell
    const startY = (start.row * 100) / 3 + 100 / 6; // Center of first cell
    const endX = (end.col * 100) / 3 + 100 / 6; // Center of last cell
    const endY = (end.row * 100) / 3 + 100 / 6; // Center of last cell

    return { startX, startY, endX, endY };
  };

  const lineCoords = getLineCoordinates(winningLine);

  const resetGame = () => {
    setCells(Array(GRID_SIZE * GRID_SIZE).fill(null));
    setCurrentPlayer(1);
    setWinningLine(null);
    setWinner(null);
  };

  return (
    <div className="tictactoe-container">
      <div className="tictactoe-header">
        {winner ? `Player ${winner} Wins!` : `Player ${currentPlayer}`}
      </div>
      <div className="tictactoe-board">
        {cells.map((value, idx) => (
          <div
            key={idx}
            className="tictactoe-cell"
            onClick={() => handleCellClick(idx)}
          >
            {renderShape(value)}
          </div>
        ))}
        {lineCoords && (
          <svg
            className="winning-line"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1={lineCoords.startX}
              y1={lineCoords.startY}
              x2={lineCoords.endX}
              y2={lineCoords.endY}
              stroke="lightblue"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};
