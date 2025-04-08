import React from "react"
import AdvancedSquareBackground from "./components/atoms/InteractiveBackground/AdvancedSquareBackground.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import RouteContextProvider from "./components/provider/RouteProvider.tsx";
import "./App.css";

const App: React.FC = () => {
    return (
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
    )
}

export default App

