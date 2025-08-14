# 🎮 TicTacToe 2.0 - Frontend Client

A modern, feature-rich TicTacToe game built with React, TypeScript, and real-time multiplayer capabilities.

## 🌟 Features

### 🎯 Game Modes

- **PvP (Player vs Player)** - Local multiplayer on the same device
- **PvCPU (Player vs Computer)** - AI opponents with 3 difficulty levels
- **PvPOnline (Player vs Player Online)** - Real-time multiplayer via WebSocket

### 🤖 AI Difficulty Levels

- **Easy** - Random move selection
- **Normal** - Basic strategy with some smart moves
- **Hard** - Advanced minimax algorithm with optimal play

### 🎨 Modern UI/UX

- Professional card-based design
- Smooth animations with Framer Motion
- Responsive layout for all screen sizes
- Real-time game state synchronization
- Turn-based visual feedback

### 🔄 Real-time Multiplayer Features

- Room creation with unique IDs
- Player role assignment (X/O)
- Turn-based gameplay with server validation
- Real-time move synchronization
- Player connection status
- Leave/rejoin functionality

## 📱 Screenshots

<!-- Add your screenshots here -->
<!-- Example:
![Game Start Screen](./screenshots/start-screen.png)
![Multiplayer Lobby](./screenshots/multiplayer-lobby.png)
![Gameplay](./screenshots/gameplay.png)
![CPU Difficulty Selection](./screenshots/cpu-difficulty.png)
-->

_Screenshots will be added here to showcase the game's interface and features._

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Backend server running (see [server README](../server/README.md))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TicTacToe\ 2.0/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Configuration

Create a `.env` file in the client directory:

```env
VITE_SERVER_URL=http://localhost:3001
```

## 🏗️ Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── animations.ts       # Framer Motion animation variants
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── assets/            # Icons, images, and SVGs
│   ├── components/        # React components
│   │   ├── CreateGameScreen/   # Multiplayer room management
│   │   ├── GameScreen/         # Main game interface
│   │   │   ├── Board/          # Game board component
│   │   │   ├── Cell/           # Individual cell component
│   │   │   ├── Display/        # Turn indicator
│   │   │   └── ScoreBoard/     # Score tracking
│   │   ├── Modal/              # Modal components
│   │   └── StartScreen/        # Game mode selection
│   ├── lib/               # Utilities and constants
│   │   ├── constants.ts   # Game constants
│   │   ├── socket.ts      # WebSocket configuration
│   │   └── utils.ts       # Helper functions
│   ├── sounds/            # Audio effects
│   └── store/             # Zustand state management
│       ├── useGame.ts     # Game state
│       ├── useGameMode.ts # Game mode state
│       └── useMultiPlayer.ts  # Multiplayer state
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎮 How to Play

### Local Modes (PvP/PvCPU)

1. Select your preferred game mode from the start screen
2. Choose your mark (X or O)
3. For CPU mode, select difficulty level
4. Take turns placing marks on the 3x3 grid
5. First to get 3 in a row wins!

### Online Multiplayer (PvPOnline)

1. Select "Online Game (vs player)" from start screen
2. Either:
   - **Create Room**: Click "Create New Room" to generate a unique room ID
   - **Join Room**: Enter an existing room ID and click "Join Room"
3. Share the room ID with your friend
4. Game starts automatically when both players are connected
5. Player X (room creator) goes first
6. Take turns - only the current player can make moves

## 🛠️ Technologies Used

### Core Framework

- **React 18** - UI framework with hooks and functional components
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### State Management

- **Zustand** - Lightweight state management
- Separate stores for game logic, modes, and multiplayer

### Styling

- **CSS Modules** - Scoped styling
- **CSS Custom Properties** - Theme variables
- **Responsive Design** - Mobile-first approach

### Real-time Communication

- **Socket.IO Client** - WebSocket communication
- Real-time event handling and state synchronization

### Animations

- **Framer Motion** - Smooth animations and transitions
- Staggered animations for enhanced UX

### AI & Game Logic

- **Minimax Algorithm** - Optimal AI strategy for hard mode
- Pure functions for game state calculations
- Winner detection with pattern matching

## 🔧 Configuration

### Vite Configuration

The project uses Vite with React plugin and custom build settings optimized for the game assets.

### TypeScript Configuration

Strict TypeScript configuration with path mapping and modern ES features.

### ESLint Configuration

Extended ESLint rules for React, TypeScript, and modern JavaScript best practices.

## 🐛 Troubleshooting

### Common Issues

1. **Connection Issues**

   - Ensure the backend server is running on port 3001
   - Check that `VITE_SERVER_URL` matches your server URL

2. **Build Errors**

   - Clear node_modules and reinstall dependencies
   - Check TypeScript errors with `npm run type-check`

3. **Hot Reload Not Working**
   - Restart the dev server
   - Check for syntax errors in the console

### Performance Tips

- The game is optimized for smooth 60fps animations
- Large game assets are lazy-loaded
- WebSocket connections are automatically managed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:

- Check the [server documentation](../server/docs/CRITICAL_FIXES.md)
- Open an issue on GitHub
- Review the troubleshooting section above

---

Built with ❤️ using React, TypeScript, and modern web technologies.
