/********* Start Screen Animations ***********/

export const logoMarkVariants = {
  initial: { opacity: 0, y: -200 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -200, transition: { duration: 1 } },
};

export const pvcpuVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: 200, transition: { duration: 1 } },
};

export const pvpVariants = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -200, transition: { duration: 1 } },
};

/********* Game Screen Animations ***********/
export const headerVariants = {
  initial: { opacity: 0, y: -200 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -200, transition: { duration: 1 } },
};

export const footerVariants = {
  initial: { opacity: 0, y: 200 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 200, transition: { duration: 1 } },
};

export const BoardVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: 200, transition: { duration: 1 } },
};

export const createScreenTextVariants = {
  initial: { y: -50, opacity: 0, scale: 0.9 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    y: -50,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

export const createScreenFormVariants = {
  initial: { y: 50, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

export const createScreenContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const waitingRoomVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export const waitingCardVariants = {
  initial: { y: 30, opacity: 0, scale: 0.9 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const arrowIconVariants = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1 } },
  exit: { x: -200, opacity: 0, transition: { duration: 1 } },
};

/********* Modal Animations ***********/
export const backdropVariants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: [0.005, 0.005, 1],
    scaleX: [0, 1, 1],
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    scaleY: [1, 0.005, 0.005],
    scaleX: [1, 1, 0],
    transition: { duration: 1, delay: 0.3 },
  },
};

export const modalVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.5 },
  },
};
