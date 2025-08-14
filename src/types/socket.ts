// Socket event types for better type safety

export interface GameMoveData {
  index: number;
  turn: string;
}

export interface RoomJoinedData {
  connectedSockets: Set<string>;
}

export interface RoomJoinErrorData {
  error: string;
}

export interface ServerToClientEvents {
  room_joined: (data: Set<string>) => void;
  room_created: (roomId: string) => void;
  room_join_error: (data: RoomJoinErrorData) => void;
  on_game_move: (data: GameMoveData) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  create_room: () => void;
  game_move: (data: GameMoveData) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  roomId?: string;
}
