import { createContext, useState } from 'react';
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import LobbyPage from "../pages/LobbyPage/LobbyPage.tsx";
import GameRoomPage from "../pages/GameRoomPage/GameRoomPage.tsx";
import QuizPage from "../pages/QuizPage/QuizPage.tsx";
import ResultsPage from "../pages/ResultsPage/ResultsPage.tsx";
import ProfileSettingPage from '../pages/ProfileSettingPage/ProfileSettingPage.tsx';
import { Quiz } from '../../types/quiz.ts';

type RouteParams = {
  roomId?: string;
  quizId?: string;
  score?: number;
  quiz?: Quiz;
}

type Route = {
  name: "LOGIN" | "LOBBY" | "GAME_ROOM" | "QUIZ" | "RESULT" | "PROFILE_SETTING";
  params?: RouteParams;
}

const DEFAULT_ROUTE: Route = {
  name: "LOGIN"
};

export const RouteContext = createContext<Route>(DEFAULT_ROUTE);
export const RouteDispatchContext = createContext<(routeToChange: Route['name'], params?: RouteParams) => void>(() => {});

const renderPageWith = (route: Route) => {
  switch (route.name) {
    case "LOGIN":
      return <LoginPage/>
    case "LOBBY":
      return <LobbyPage/>
    case "GAME_ROOM":
      if (!route.params?.roomId) {
        throw new Error("GameRoom 라우트에는 roomId가 필요합니다")
      };
      return <GameRoomPage roomId={route.params.roomId}/>
    case "QUIZ":
      if (!route.params?.roomId || !route.params?.quiz) throw new Error("Quiz 라우트에는 roomId와 quiz가 필요합니다");
      return (
        <QuizPage roomId={route.params.roomId} quiz={route.params.quiz}/>
      )
    case "PROFILE_SETTING":
      return <ProfileSettingPage/>
    case "RESULT":
      return <ResultsPage/>
  }
}

const RouteContextProvider = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const isRegister = searchParams.get("status") === "REGISTER";
  const [routeState, setRouteState] = useState<Route>(isRegister ? {
    name: "PROFILE_SETTING",
    params: {}
  } : DEFAULT_ROUTE);

  const changeHRVServiceZone = (routeToChange: Route['name'], params?: RouteParams) => {
    setRouteState({
      name: routeToChange,
      params
    });
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