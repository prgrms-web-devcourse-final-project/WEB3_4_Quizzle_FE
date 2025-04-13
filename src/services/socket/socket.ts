import * as Stomp from '@stomp/stompjs';
import { ChatMessageDTO, RoomMessageDTO, WebSocketQuizSubmitRequest, WebSocketQuizSubmitResponse, WS_ENDPOINTS } from './types';

type MessageHandler<T> = (message: T) => void;

export class WebSocketClient {
  // private static instance: WebSocketClient | null = null;
  private stompClient: Stomp.Client | null = null;
  private subscriptions: Map<string, Stomp.StompSubscription> = new Map();
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private isConnected: boolean = false;
  private connectionCallbacks: (() => void)[] = [];

  constructor() {
    this.initializeClient();
  }

  // public static getInstance(): WebSocketClient {
  //   if (!WebSocketClient.instance) {
  //     WebSocketClient.instance = new WebSocketClient();
  //   }
  //   return WebSocketClient.instance;
  // }

  private initializeClient() {
    //ws://localhost:8080/ws/websocket
    const wsUrl = this.convertHttpToWs(
      `${import.meta.env.VITE_WAS_HOST}/ws/websocket`
    );
    const socket = new WebSocket(wsUrl);
    
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => socket as Stomp.IStompSocket,
      debug: (str) => {
        console.log('[STOMP Debug]:', str);
      },
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      reconnectDelay: 5000
    });

    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers() {
    if (!this.stompClient) return;

    this.stompClient.onConnect = () => {
      console.log('WebSocket Connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // 연결 완료 후 대기 중인 콜백 실행
      this.connectionCallbacks.forEach(callback => callback());
      this.connectionCallbacks = [];
    };

    this.stompClient.onStompError = (error) => {
      console.error('STOMP Error:', error);
      this.handleReconnect();
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket Connection Closed');
      this.handleReconnect();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts++ < this.MAX_RECONNECT_ATTEMPTS) {
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      setTimeout(() => {
        this.connect();
      }, 5000);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  connect(callback?: () => void) {
    if (callback) {
      if (this.isConnected) {
        callback();
      } else {
        this.connectionCallbacks.push(callback);
      }
    }

    if (this.stompClient && !this.stompClient.active) {
      this.stompClient.activate();
    }
  }

  disconnect() {
    if (this.stompClient?.active) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
      this.subscriptions.clear();
      this.stompClient.deactivate();
    }
  }

  // 로비 관련 메서드
  subscribeLobbyChat(handler: MessageHandler<ChatMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.LOBBY.SUBSCRIBE.CHAT, handler);
  }

  subscribeLobbyUsers(handler: MessageHandler<ChatMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.LOBBY.SUBSCRIBE.USERS, handler);
  }

  sendLobbyChatMessage(message: ChatMessageDTO) {
    this.publish(WS_ENDPOINTS.LOBBY.PUBLISH.CHAT, message);
  }

  // 방 관련 메서드
  subscribeRoomChat(roomId: string, handler: MessageHandler<ChatMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.ROOM.SUBSCRIBE.CHAT(roomId), handler);
  }

  subscribeRoomUpdates(roomId: string, handler: MessageHandler<RoomMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.ROOM.SUBSCRIBE.ROOM(roomId), handler);
  }

  sendRoomChatMessage(roomId: string, message: ChatMessageDTO) {
    this.publish(WS_ENDPOINTS.ROOM.PUBLISH.CHAT(roomId), message);
  }

  sendRoomMessage(roomId: string, message: RoomMessageDTO) {
    this.publish(WS_ENDPOINTS.ROOM.PUBLISH.ROOM(roomId), message);
  }

  // 게임 관련 메서드
  subscribeGameUpdates(roomId: string, handler: MessageHandler<RoomMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.GAME.SUBSCRIBE.GAME(roomId), handler);
  }

  subscribeQuizUpdates(quizId: string, handler: MessageHandler<WebSocketQuizSubmitResponse>) {
    this.subscribe(WS_ENDPOINTS.GAME.SUBSCRIBE.QUIZ_UPDATES(quizId), handler);
  }

  submitQuizAnswer(quizId: string, answer: WebSocketQuizSubmitRequest) {
    this.publish(WS_ENDPOINTS.GAME.PUBLISH.QUIZ_SUBMIT(quizId), answer);
  }

  startGame(roomId: string) {
    this.publish(WS_ENDPOINTS.GAME.PUBLISH.START(roomId), {});
  }

  // 유틸리티 메서드
  private subscribe<T>(destination: string, handler: MessageHandler<T>) {
    if (!this.stompClient?.active) {
      console.error('STOMP client is not active');
      return;
    }

    if (this.subscriptions.has(destination)) {
      console.warn('Already subscribed to', destination);
      return;
    }

    const subscription = this.stompClient.subscribe(destination, message => {
      try {
        // WebSocketChatMessageResponse 형식에서 content 추출
        const messageStr = message.body;
        const contentMatch = messageStr.match(/content=({.*?})/);
        
        if (contentMatch && contentMatch[1]) {
          const content = JSON.parse(contentMatch[1]);
          console.log('[WebSocket] Parsed content:', content);
          handler(content as T);
        } else {
          console.warn('[WebSocket] Could not extract content from message:', messageStr);
        }
      } catch (error) {
        console.error('Message handling error:', {
          error,
          message: message.body,
          destination
        });
      }
    });

    this.subscriptions.set(destination, subscription);
  }

  private publish<T>(destination: string, message: T) {
    if (!this.stompClient?.active) {
      console.error('STOMP client is not active');
      return;
    }

    this.stompClient.publish({
      destination,
      body: JSON.stringify(message)
    });
  }

  private convertHttpToWs(url: string): string {
    return url.replace(/^http/, 'ws');
  }
}

// 싱글톤 인스턴스 export
// export default WebSocketClient.getInstance();