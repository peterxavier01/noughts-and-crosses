import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { backdropVariants, modalVariants } from "../../animations";

import EndGameModal from "./EndGameModal";
import RestartGameModal from "./RestartGameModal";
import DifficultyModal from "./DifficultyModal";
import InviteModal from "./InviteModal";

import { modalPortal } from "../../lib/constants";

import styles from "./index.module.css";

export const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backdropVariants}
        className={styles.backdrop}
      />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.modalOverlay}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </motion.div>
    </>
  );
};

const Modal = () => {
  return (
    <>
      {createPortal(<EndGameModal />, modalPortal)}
      {createPortal(<RestartGameModal />, modalPortal)}
      {createPortal(<DifficultyModal />, modalPortal)}
      {createPortal(<InviteModal />, modalPortal)}
    </>
  );
};

export default Modal;
