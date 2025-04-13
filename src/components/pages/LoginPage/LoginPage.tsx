import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import Card from "../../atoms/Card/Card.tsx";
import {useContext, useEffect} from "react";
import {RouteDispatchContext} from "../../provider/RouteProvider.tsx";
import Button from "../../atoms/Button/Button.tsx";
import GoogleLoginButton from "../../molecules/GoogleLoginButton/GoogleLoginButton.tsx";
import {API_PATH} from "../../../consts/quizzleAPIPath.ts";
import {QuizzleAPI} from "../../../services/api.ts";
import KakaoLoginButton from "../../molecules/KakaoLoginButton/KakaoLoginButton.tsx";
import "./LoginPage.scss";

const LoginPage = () => {
  const routeTo = useContext(RouteDispatchContext);

  const goToLobby = () => {
    routeTo("LOBBY");
  }

  const checkSession = async () => {
    const response = await QuizzleAPI.getTokenInfo();
    console.log(response);

    const userInfo = await QuizzleAPI.checkOAuthValid(response.data.accessToken, response.data.refreshToken)
    console.log(userInfo);

    goToLobby();
  }

  const onClickGoogleLoginButton = () => {
    location.href = `${import.meta.env.VITE_WAS_HOST}${API_PATH.OAUTH2_AUTHORIZATION_GOOGLE}`
  }

  const onClickKakaoLoginButton = () => {
    location.href = `${import.meta.env.VITE_WAS_HOST}${API_PATH.OAUTH2_AUTHORIZATION_KAKAO}`
  }

  const renderAuthFreePassButton = () => {
    if (import.meta.env.VITE_NODE_ENV == 'production') {
      return;
    }

    return (
      <Button className="auth-free-pass-button" onClick={goToLobby}>
        Pass me Plz ;)
      </Button>
    );
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center"
  }

  useEffect(() => {
    checkSession();
  }, []);

  return <AppTemplate content={
    <div className="login-page-content">
      <div className="login-container">
        <Card style={cardStyle}>
          <h2>로그인</h2>
          <div className="oauth-container">
            <GoogleLoginButton onClick={onClickGoogleLoginButton}/>
            <KakaoLoginButton onClick={onClickKakaoLoginButton}/>
            {renderAuthFreePassButton()}
          </div>
        </Card>
      </div>
    </div>
  }/>
}

export default LoginPage;