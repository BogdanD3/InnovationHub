import React, { useState, useEffect } from "react";
import "./Tetris.css";

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 25; // px

type Cell = string | null;
type Point = [number, number];

interface Piece {
  shape: Point[];
  color: string;
}

const PIECES: Piece[] = [
  {
    shape: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    color: "#00f0f0",
  }, // I
  {
    shape: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    color: "#f0f000",
  }, // O
  {
    shape: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    color: "#0000f0",
  }, // J
  {
    shape: [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
    color: "#ffa500",
  }, // L
  {
    shape: [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ],
    color: "#00f000",
  }, // S
  {
    shape: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    color: "#f00000",
  }, // Z
  {
    shape: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ],
    color: "#a000f0",
  }, // T
];

export const Tetris: React.FC = () => {
  const emptyBoard: Cell[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(null)
  );

  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [current, setCurrent] = useState<{ piece: Piece; pos: Point } | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [intervalMs] = useState(500);

  const mergePiece = (b: Cell[][], p: Piece, pos: Point) => {
    const newBoard = b.map((r) => r.slice());
    p.shape.forEach(([x, y]) => {
      const row = pos[0] + x;
      const col = pos[1] + y;
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
        newBoard[row][col] = p.color;
    });
    return newBoard;
  };

  const checkCollision = (p: Piece, pos: Point) => {
    return p.shape.some(([x, y]) => {
      const row = pos[0] + x;
      const col = pos[1] + y;
      return (
        row < 0 ||
        row >= ROWS ||
        col < 0 ||
        col >= COLS ||
        board[row][col] !== null
      );
    });
  };

  const rotate = (p: Piece) => ({
    ...p,
    shape: p.shape.map(([x, y]) => [y, -x] as Point),
  });

  const move = (dx: number, dy: number) => {
    if (!current) return false;
    const newPos: Point = [current.pos[0] + dx, current.pos[1] + dy];
    if (!checkCollision(current.piece, newPos)) {
      setCurrent({ ...current, pos: newPos });
      return true;
    }
    return false;
  };

  const drop = () => {
    if (!current) return;
    if (!move(1, 0)) {
      const newBoard = mergePiece(board, current.piece, current.pos);
      const { board: clearedBoard, lines } = clearLines(newBoard);
      setBoard(clearedBoard);
      setScore((prev) => prev + lines * 100);
      spawnPiece();
    }
  };

  const clearLines = (b: Cell[][]) => {
    const newBoard = b.filter((row) => row.some((c) => c === null));
    const clearedLines = ROWS - newBoard.length;
    const emptyRows = Array.from({ length: clearedLines }, () =>
      Array(COLS).fill(null)
    );
    return { board: [...emptyRows, ...newBoard], lines: clearedLines };
  };

  const spawnPiece = () => {
    const next = PIECES[Math.floor(Math.random() * PIECES.length)];
    const startPos: Point = [0, Math.floor(COLS / 2) - 1];
    if (checkCollision(next, startPos)) {
      setGameOver(true);
      setRunning(false);
    } else {
      setCurrent({ piece: next, pos: startPos });
    }
  };

  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(drop, intervalMs);
    return () => clearInterval(id);
  }, [running, current, board, gameOver]);

  const handleKey = (e: KeyboardEvent) => {
    if (!running || gameOver || !current) return;
    if (e.key === "ArrowLeft") move(0, -1);
    if (e.key === "ArrowRight") move(0, 1);
    if (e.key === "ArrowDown") drop();
    if (e.key === "ArrowUp") {
      const rotated = rotate(current.piece);
      if (!checkCollision(rotated, current.pos))
        setCurrent({ ...current, piece: rotated });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const startGame = () => {
    setBoard(emptyBoard);
    setScore(0);
    setGameOver(false);
    setRunning(true);
    spawnPiece();
  };

  const displayBoard = current
    ? mergePiece(board, current.piece, current.pos)
    : board;

  return (
    <div className="tetris-container">
      <h2>Tetris</h2>
      <div className="score-board">Score: {score}</div>
      {gameOver && <div className="game-over">GAME OVER</div>}

      <div
        className="board"
        style={{
          gridTemplateRows: `repeat(${ROWS}, ${BLOCK_SIZE}px)`,
          gridTemplateColumns: `repeat(${COLS}, ${BLOCK_SIZE}px)`,
        }}
      >
        {displayBoard.flat().map((c, i) => (
          <div
            key={i}
            className="cell"
            style={{ backgroundColor: c || "#0d1117" }}
          />
        ))}
      </div>

      <div className="controls">
        <button onClick={() => move(0, -1)}>◀</button>
        <button onClick={drop}>▼</button>
        <button onClick={() => move(0, 1)}>▶</button>
        <button
          onClick={() => {
            if (!current) return;
            const rotated = rotate(current.piece);
            if (!checkCollision(rotated, current.pos))
              setCurrent({ ...current, piece: rotated });
          }}
        >
          ⟳
        </button>
      </div>

      <div className="game-buttons">
        <button onClick={startGame}>{running ? "Restart" : "Start"}</button>
      </div>
    </div>
  );
};
