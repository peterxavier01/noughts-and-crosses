import React from "react";

import styles from "./index.module.css";

type ScoreBoardType = {
  text: string;
  bgColor: string;
  score: number;
};

const ScoreBoard: React.FC<ScoreBoardType> = ({ text, bgColor, score }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      <p className={styles.text}>{text}</p>
      <p className={styles.score}>{score}</p>
    </div>
  );
};

export default ScoreBoard;
