import useGame from "../../../store/useGame";

import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { X } from "../../../lib/constants";

import styles from "./index.module.css";

const Display = () => {
  const turn = useGame((state) => state.turn);

  return (
    <div className={styles.wrapper}>
      {turn === X ? (
        <IconX currentColor="var(--color-silver)" />
      ) : (
        <IconO currentColor="var(--color-silver)" />
      )}
      <p>Turn</p>
    </div>
  );
};

export default Display;
