import React from "react";
import "./TicTacToeBoard.css";

const GRID_SIZE = 3;

export const TicTacToeBoard: React.FC = () => {
  return (
    <div className="tictactoe-board">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
        <div key={idx} className="tictactoe-cell" />
      ))}
    </div>
  );
};
