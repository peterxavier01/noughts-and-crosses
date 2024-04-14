import Icon from "../../../assets/icon-restart.svg";
import useRestartModal from "../../../store/useRestartModal";

import styles from "./index.module.css";

const RestartBtn = () => {
  const onOpen = useRestartModal((state) => state.onOpen);

  return (
    <button className={styles.container} onClick={() => onOpen()}>
      <img src={Icon} alt="" width={20} height={20} className={styles.icon} />
    </button>
  );
};

export default RestartBtn;
