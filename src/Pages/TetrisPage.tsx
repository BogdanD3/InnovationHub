import React from "react";
import { Tetris } from "../Tetris/Tetris";

const TetrisPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0d1117",
        padding: "2rem",
      }}
    >
      <Tetris />
    </div>
  );
};

export default TetrisPage;
