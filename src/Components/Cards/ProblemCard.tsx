import React from "react";
import "./ProblemCard.css";

interface ProblemCardProps {
  title: string;
  votes: number;
  category: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  votes,
  category,
}) => {
  return (
    <div className="problem-card">
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Votes: {votes}</p>
    </div>
  );
};

export default ProblemCard;
