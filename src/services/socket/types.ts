export interface ChatMessageDTO {
  type: 'CHAT' | 'JOIN' | 'LEAVE' | 'SYSTEM' | 'WHISPER';
  content: string;
  senderId: number;
  senderName: string;
  timestamp: number;
  roomId?: string;
}

export interface RoomUserData {
  id: string;
  name: string;
  isReady: boolean;
  isOwner: boolean;
  isSubmitted: boolean;
}
export interface RoomMessageDTO {
  type: 'JOIN' | 'LEAVE' | 'READY' | 'UNREADY' | 'GAME_START' | 'GAME_END' 
    | 'ANSWER_SUBMIT' | 'TIMER' | 'ROUND_START' | 'ROUND_END' | 'SYSTEM';
  senderId: string;
  senderName: string;
  content?: string;
  data?: RoomUserData[];
  timestamp: number;
  roomId: string;
}

export interface ActiveUserDTO {
  email: string;
  sessions: string[];
  lastActive: number;
  status: string;
}

export type ActiveUsersDTO = ActiveUserDTO[];

export interface WebSocketQuizSubmitRequest {
  questionNumber: number;
  submittedAnswer: string;
}

export interface WebSocketQuizSubmitResponse {
  type: 'ANSWER_SUBMIT';
  questionNumber: number;
  correct: boolean;
  correctAnswer: string;
  memberId: string;
  nickname: string;
  isSubmitted: boolean;
  timestamp: number;
  quizId: string;
}

export const WS_ENDPOINTS = {
  LOBBY: {
    PUBLISH: {
      LOBBY: '/app/lobby',
      CHAT: '/app/lobby/chat',
      USERS: '/app/lobby/users'
    },
    SUBSCRIBE: {
      LOBBY: '/topic/lobby',
      CHAT: '/topic/lobby/chat', 
      USERS: '/topic/lobby/users'
    }
  },
  ROOM: {
    PUBLISH: {
      ROOM: (roomId: string) => `/app/room/${roomId}`,
      CHAT: (roomId: string) => `/app/room/chat/${roomId}`
    },
    SUBSCRIBE: {
      ROOM: (roomId: string) => `/topic/room/${roomId}`,
      CHAT: (roomId: string) => `/topic/room/chat/${roomId}`
    }
  },
  GAME: {
    PUBLISH: {
      GAME: (roomId: string) => `/app/game/${roomId}`,
      START: (roomId: string) => `/app/game/start/${roomId}`,
      CHAT: (roomId: string) => `/app/game/chat/${roomId}`,
      QUIZ_SUBMIT: (quizId: string) => `/app/quiz/${quizId}/submit`
    },
    SUBSCRIBE: {
      GAME: (roomId: string) => `/topic/game/${roomId}`,
      START: (roomId: string) => `/topic/game/start/${roomId}`,
      CHAT: (roomId: string) => `/topic/game/chat/${roomId}`,
      QUIZ_UPDATES: (quizId: string) => `/topic/quiz/${quizId}/updates`
    }
  }
};
