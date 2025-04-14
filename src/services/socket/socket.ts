import * as Stomp from '@stomp/stompjs';
import { ChatMessageDTO, RoomMessageDTO, WebSocketQuizSubmitRequest, WebSocketQuizSubmitResponse, WS_ENDPOINTS } from './types';

type MessageHandler<T> = (message: T) => void;

export class WebSocketClient {
  private static instance: WebSocketClient | null = null;
  private stompClient: Stomp.Client | null = null;
  private subscriptions: Map<string, Stomp.StompSubscription> = new Map();
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private isConnected: boolean = false;
  private connectionCallbacks: (() => void)[] = [];

  private constructor() {
    this.initializeClient();
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

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
      this.isConnected = false;
      this.handleReconnect();
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket Connection Closed');
      this.isConnected = false;
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
      if (this.isConnected && this.stompClient?.active) {
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
    this.isConnected = false;
  }

  clearSubscriptions() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.clear();
  }

  // 로비 관련 메서드

  subscribeLobby(handler: MessageHandler<string>) {
    this.subscribe(WS_ENDPOINTS.LOBBY.SUBSCRIBE.LOBBY, handler);
  }

  subscribeLobbyChat(handler: MessageHandler<ChatMessageDTO>) {
    this.subscribe(WS_ENDPOINTS.LOBBY.SUBSCRIBE.CHAT, handler);
  }

  subscribeLobbyUsers(handler: MessageHandler<string>) {
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

  subscribeGameChat(roomId: string, handler: MessageHandler<ChatMessageDTO>) {
    console.log("[WebSocketClient] subscribeGameChat : ", WS_ENDPOINTS.GAME.SUBSCRIBE.CHAT(roomId))
    this.subscribe(WS_ENDPOINTS.GAME.SUBSCRIBE.CHAT(roomId), handler);
  }

  sendGameChatMessage(roomId: string, message: ChatMessageDTO) {
    this.publish(WS_ENDPOINTS.GAME.PUBLISH.CHAT(roomId), message);
  }

  submitQuizAnswer(quizId: string, answer: WebSocketQuizSubmitRequest) {
    this.publish(WS_ENDPOINTS.GAME.PUBLISH.QUIZ_SUBMIT(quizId), answer);
  }

  startGame(roomId: string) {
    this.publish(WS_ENDPOINTS.GAME.PUBLISH.START(roomId), {message: "게임이 시작되었습니다."});
  }

  // 유틸리티 메서드
  private subscribe<T>(destination: string, handler: MessageHandler<T>) {
    console.log("[WebSocketClient] subscribe : ", destination)
    if (!this.stompClient?.active || !this.isConnected) {
      console.error('STOMP client is not active or not connected');
      return;
    }

    if (this.subscriptions.has(destination)) {
      console.warn('Already subscribed to', destination);
      return;
    }

    const subscription = this.stompClient.subscribe(destination, message => {
      try {
        console.log(`[WebSocket Received][${destination}] message:`, message.body);

        const messageBody = message.body;

        // 이미 JSON 객체인 경우 처리
        try {
          const parsedMessage = JSON.parse(messageBody);
          
          // data 필드가 문자열로 된 JSON이고 RoomMessageDTO 타입인 경우 파싱
          if (
            'data' in parsedMessage && 
            typeof parsedMessage.data === 'string' &&
            'type' in parsedMessage &&
            'senderId' in parsedMessage
          ) {
            try {
              parsedMessage.data = JSON.parse(parsedMessage.data);
            } catch (dataError) {
              console.warn('[WebSocket] Failed to parse data field:', dataError);
            }
          }
          
          console.log('[WebSocket] Parsed message:', parsedMessage);
          handler(parsedMessage as T);
          return;
        } catch (e) {
          console.warn('[WebSocket] Failed to parse message:', e);
          // JSON 파싱 실패 시 content= 형식 처리 시도
          const contentMatch = messageBody.match(/content=({.*?})/);
          if (contentMatch && contentMatch[1]) {
            try {
              const parsedContent = JSON.parse(contentMatch[1]);
              console.log('[WebSocket] Parsed content:', parsedContent);
              handler(parsedContent as T);
              return;
            } catch (contentError) {
              console.warn('[WebSocket] Failed to parse content:', contentError);
            }
          }
        }

        // 모든 파싱 시도 실패 시 원본 메시지 전달
        console.warn('[WebSocket] Using raw message:', messageBody);
        handler(messageBody as T);

      } catch (error) {
        console.error('[WebSocket] Message handling error:', {
          error,
          message: message.body,
          destination
        });
      }
    });

    this.subscriptions.set(destination, subscription);
  }

  private publish<T>(destination: string, message: T) {
    if (!this.stompClient?.active || !this.isConnected) {
      console.error('STOMP client is not active or not connected');
      throw new Error('There is no underlying STOMP connection');
    }

    this.stompClient.publish({
      destination,
      body: JSON.stringify(message)
    });
  }

  private convertHttpToWs(url: string): string {
    return url.replace(/^http/, 'ws');
  }

  // 구독 해제 메서드 추가
  unsubscribeFromRoom(roomId: string) {
    // 방 관련 모든 구독 해제
    const roomSubscriptions = [
      WS_ENDPOINTS.ROOM.SUBSCRIBE.CHAT(roomId),
      WS_ENDPOINTS.ROOM.SUBSCRIBE.ROOM(roomId),
      WS_ENDPOINTS.GAME.SUBSCRIBE.GAME(roomId),
      WS_ENDPOINTS.GAME.SUBSCRIBE.CHAT(roomId)
    ];

    roomSubscriptions.forEach(endpoint => {
      const subscription = this.subscriptions.get(endpoint);
      if (subscription) {
        subscription.unsubscribe();
        this.subscriptions.delete(endpoint);
      }
    });
  }

  unsubscribeFromQuiz(quizId: string) {
    const quizEndpoint = WS_ENDPOINTS.GAME.SUBSCRIBE.QUIZ_UPDATES(quizId);
    const subscription = this.subscriptions.get(quizEndpoint);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(quizEndpoint);
    }
  }
}

// 싱글톤 인스턴스 export
// export default WebSocketClient.getInstance();