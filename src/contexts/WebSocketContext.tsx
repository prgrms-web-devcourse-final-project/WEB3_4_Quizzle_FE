import React, { createContext, useEffect, useState } from 'react';
import { WebSocketClient } from '../services/socket/socket';

interface WebSocketContextType {
    webSocket: WebSocketClient | null;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const [webSocket] = useState(() => WebSocketClient.getInstance());

    useEffect(() => {
        webSocket?.connect();
        return () => {
            webSocket.disconnect();
        };
    }, [webSocket]);

    return (
        <WebSocketContext.Provider value={{ webSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
} 