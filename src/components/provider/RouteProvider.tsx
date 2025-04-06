import { createContext, useState } from 'react';
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import LobbyPage from "../pages/LobbyPage/LobbyPage.tsx";
import GameRoomPage from "../pages/GameRoomPage/GameRoomPage.tsx";
import QuizPage from "../pages/QuizPage/QuizPage.tsx";
import ResultsPage from "../pages/ResultsPage/ResultsPage.tsx";

type Route = "LOGIN" | "LOBBY" | "GAME_ROOM" | "QUIZ" | "RESULT";

export const RouteContext = createContext<Route>("LOGIN");
export const RouteDispatchContext = createContext<(routeToChange: Route) => void>(() => {});

const renderPageWith = (route: Route) => {
  switch (route) {
    case "LOGIN":
      return <LoginPage/>
    case "LOBBY":
      return <LobbyPage/>
    case "GAME_ROOM":
      return <GameRoomPage/>
    case "QUIZ":
      return <QuizPage/>
    case "RESULT":
      return <ResultsPage/>
  }
}

const RouteContextProvider = () => {
  const [routeState, setRouteState] = useState<Route>("LOGIN");

  const changeHRVServiceZone = (routeToChange: Route) => {
    setRouteState(routeToChange);
  };

  return (
    <>
      <RouteContext.Provider value={routeState}>
        <RouteDispatchContext.Provider value={changeHRVServiceZone}>
          {renderPageWith(routeState)}
        </RouteDispatchContext.Provider>
      </RouteContext.Provider>
    </>
  );
};

export default RouteContextProvider;