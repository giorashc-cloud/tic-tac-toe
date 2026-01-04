import React, { useState } from "react";
import "./TicTacToeBoard.css";

const GRID_SIZE = 3;

type CellValue = "X" | "O" | null;

export const TicTacToeBoard: React.FC = () => {
  const [cells, setCells] = useState<CellValue[]>(Array(GRID_SIZE * GRID_SIZE).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  const handleCellClick = (index: number) => {
    if (cells[index] !== null) return; // Cell already filled
    
    const newCells = [...cells];
    // Player 1 always uses X, Player 2 always uses O
    newCells[index] = currentPlayer === 1 ? "X" : "O";
    setCells(newCells);
    
    // Toggle player for next turn
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const renderShape = (value: CellValue) => {
    if (!value) return null;

    if (value === "X") {
      return (
        <svg className="cell-shape" viewBox="0 0 100 100">
          <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    }

    if (value === "O") {
      return (
        <svg className="cell-shape" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="5" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="tictactoe-container">
      <div className="tictactoe-header">
        Player {currentPlayer}
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
      </div>
    </div>
  );
};
