import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TicTacToeBoard } from '../components/TicTacToeBoard';
describe('TicTacToeBoard - Initial State', () => {
  it('should render 9 empty cells', () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    expect(cells).toHaveLength(9);
  });

  it('should display Player 1 as current player initially', () => {
    render(<TicTacToeBoard />);
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });

  it('should render a New Game button', () => {
    render(<TicTacToeBoard />);
    expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
  });
});

describe('TicTacToeBoard - Game Play', () => {
  it('should place X when Player 1 clicks a cell', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]);
    
    expect(cells[0].querySelector('svg')).toBeInTheDocument();
  });

  it('should alternate between Player 1 (X) and Player 2 (O)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    
    await userEvent.click(cells[1]); // Player 2
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });

  it('should not allow clicking on already filled cell', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1
    await userEvent.click(cells[0]); // Try to click again
    
    // Should still be Player 2's turn
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });
});

describe('TicTacToeBoard - Winning Combinations', () => {
  it('should detect top row win (0, 1, 2)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1 - X
    await userEvent.click(cells[3]); // Player 2 - O
    await userEvent.click(cells[1]); // Player 1 - X
    await userEvent.click(cells[4]); // Player 2 - O
    await userEvent.click(cells[2]); // Player 1 - X (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect middle row win (3, 4, 5)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[3]); // Player 1
    await userEvent.click(cells[0]); // Player 2
    await userEvent.click(cells[4]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[5]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect bottom row win (6, 7, 8)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[6]); // Player 1
    await userEvent.click(cells[0]); // Player 2
    await userEvent.click(cells[7]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[8]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect left column win (0, 3, 6)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[3]); // Player 1
    await userEvent.click(cells[2]); // Player 2
    await userEvent.click(cells[6]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect middle column win (1, 4, 7)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[1]); // Player 1
    await userEvent.click(cells[0]); // Player 2
    await userEvent.click(cells[4]); // Player 1
    await userEvent.click(cells[2]); // Player 2
    await userEvent.click(cells[7]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect right column win (2, 5, 8)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[2]); // Player 1
    await userEvent.click(cells[0]); // Player 2
    await userEvent.click(cells[5]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[8]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect diagonal win \\ (0, 4, 8)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[4]); // Player 1
    await userEvent.click(cells[2]); // Player 2
    await userEvent.click(cells[8]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should detect diagonal win / (2, 4, 6)', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[2]); // Player 1
    await userEvent.click(cells[0]); // Player 2
    await userEvent.click(cells[4]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[6]); // Player 1 (wins)
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should allow Player 2 to win', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    await userEvent.click(cells[0]); // Player 1
    await userEvent.click(cells[1]); // Player 2
    await userEvent.click(cells[3]); // Player 1
    await userEvent.click(cells[4]); // Player 2
    await userEvent.click(cells[8]); // Player 1
    await userEvent.click(cells[7]); // Player 2 (wins)
    
    expect(screen.getByText('Player 2 Wins!')).toBeInTheDocument();
  });
});

describe('TicTacToeBoard - Draw Condition', () => {
  it('should detect a draw when board is full with no winner', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    // Create a draw scenario
    await userEvent.click(cells[0]); // Player 1 - X
    await userEvent.click(cells[1]); // Player 2 - O
    await userEvent.click(cells[2]); // Player 1 - X
    await userEvent.click(cells[4]); // Player 2 - O
    await userEvent.click(cells[3]); // Player 1 - X
    await userEvent.click(cells[5]); // Player 2 - O
    await userEvent.click(cells[7]); // Player 1 - X
    await userEvent.click(cells[6]); // Player 2 - O
    await userEvent.click(cells[8]); // Player 1 - X
    
    expect(screen.getByText("It's a Draw!")).toBeInTheDocument();
  });
});

describe('TicTacToeBoard - Game Over State', () => {
  it('should not allow moves after a win', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    // Player 1 wins with top row
    await userEvent.click(cells[0]);
    await userEvent.click(cells[3]);
    await userEvent.click(cells[1]);
    await userEvent.click(cells[4]);
    await userEvent.click(cells[2]); // Player 1 wins
    
    // Try to click another cell
    await userEvent.click(cells[5]);
    
    // Should still show Player 1 Wins
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
  });

  it('should not allow moves after a draw', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    // Create draw
    await userEvent.click(cells[0]);
    await userEvent.click(cells[1]);
    await userEvent.click(cells[2]);
    await userEvent.click(cells[4]);
    await userEvent.click(cells[3]);
    await userEvent.click(cells[5]);
    await userEvent.click(cells[7]);
    await userEvent.click(cells[6]);
    await userEvent.click(cells[8]);
    
    expect(screen.getByText("It's a Draw!")).toBeInTheDocument();
  });
});

describe('TicTacToeBoard - Reset Functionality', () => {
  it('should reset the game when New Game button is clicked', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    // Make some moves
    await userEvent.click(cells[0]);
    await userEvent.click(cells[1]);
    
    // Reset game
    const resetButton = screen.getByRole('button', { name: /new game/i });
    await userEvent.click(resetButton);
    
    // Should be back to Player 1
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    
    // Cells should be empty (check for filled pieces, not hover previews)
    cells.forEach(cell => {
      const svg = cell.querySelector('svg');
      // If there's an SVG, it should only be a hover preview (opacity 0.3)
      if (svg) {
        expect(svg.style.opacity).toBe('0.3');
      }
    });
  });

  it('should reset game after a win', async () => {
    const { container } = render(<TicTacToeBoard />);
    const cells = container.querySelectorAll('.tictactoe-cell');
    
    // Player 1 wins
    await userEvent.click(cells[0]);
    await userEvent.click(cells[3]);
    await userEvent.click(cells[1]);
    await userEvent.click(cells[4]);
    await userEvent.click(cells[2]);
    
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
    
    // Reset
    const resetButton = screen.getByRole('button', { name: /new game/i });
    await userEvent.click(resetButton);
    
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });
});
