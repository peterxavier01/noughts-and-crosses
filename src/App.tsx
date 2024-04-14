import { AnimatePresence } from "framer-motion";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import Modal from "./components/Modal";

import useGameScreen from "./store/useGameScreen";

import "./App.css";

function App() {
  const screen = useGameScreen((state) => state.screen);

  return (
    <div className="main">
      <AnimatePresence mode="wait">
        {screen === "start" ? (
          <StartScreen key="start-screen" />
        ) : screen === "play" ? (
          <GameScreen key="game-screen" />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        <Modal key="modal" />
      </AnimatePresence>
    </div>
  );
}

export default App;
