import { AnimatePresence } from "framer-motion";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import Modal from "./components/Modal";
import ErrorBoundary from "./components/ErrorBoundary";

import useGameScreen from "./store/useGameScreen";

import "./App.css";
import CreateGameScreen from "./components/CreateGameScreen";

function App() {
  const screen = useGameScreen((state) => state.screen);

  return (
    <ErrorBoundary>
      <main className="main-wrapper">
        <div className="main-content">
          <AnimatePresence mode="wait">
            {screen === "start" ? (
              <StartScreen key="start-screen" />
            ) : screen === "play" ? (
              <GameScreen key="game-screen" />
            ) : screen === "create-game" ? (
              <CreateGameScreen key="create-game-screen" />
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            <Modal key="modal" />
          </AnimatePresence>
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
