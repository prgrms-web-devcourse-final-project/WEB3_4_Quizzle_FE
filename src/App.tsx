import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AdvancedSquareBackground from "./components/atoms/InteractiveBackground/AdvancedSquareBackground.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import RouteContextProvider from "./components/provider/RouteProvider.tsx";;
import "./App.css";
import { chakraTheme } from "./theme/theme.ts";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { LightMode } from "./components/ui/color-mode.tsx";
import { WebSocketProvider } from './contexts/WebSocketContext';

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,                
                staleTime: 5 * 60 * 1000,
                refetchOnWindowFocus: false,
                refetchOnMount: true,
            },
            mutations: {
                retry: 1,
            },
        },
    })

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <WebSocketProvider>
                    <ChakraProvider value={chakraTheme}>
                        <LightMode>
                            <div className="app">
                                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                                    <AdvancedSquareBackground
                                        particleCount={100}
                                        primaryColor="#853BE1"
                                        secondaryColor="#ffffff"
                                        centerOffsetX={0.2}
                                        centerOffsetY={-0.1}
                                        mouseInfluence={1000}
                                        minSize={5}
                                        maxSize={20}
                                        pulseEffect={false}
                                        multipleOrbits={true}
                                    />
                                    <RouteContextProvider/>
                                </GoogleOAuthProvider>
                            </div>
                        </LightMode>
                    </ChakraProvider>
                </WebSocketProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default App