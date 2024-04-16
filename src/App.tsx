import { AnimatePresence } from "framer-motion";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import Modal from "./components/Modal";

import useGameScreen from "./store/useGameScreen";

import "./App.css";

function App() {
  const screen = useGameScreen((state) => state.screen);

  return (
    <main
      className="main-wrapper"
      style={{
        height: screen === "start" ? "92vh" : screen === "play" ? "100%" : "",
      }}
    >
      <div className="main-content">
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
    </main>
  );
}

export default App;
