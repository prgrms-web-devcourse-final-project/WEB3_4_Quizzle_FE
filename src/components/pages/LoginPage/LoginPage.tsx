import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import Card from "../../atoms/Card/Card.tsx";
import "./LoginPage.scss";
import {GoogleLogin} from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";

const LoginPage = () => {
    const cardStyle = {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center"
    }

    return <AppTemplate content={
        <div className="login-page-content">
            <div className="login-container">
                <Card style={cardStyle}>
                    <h2>로그인</h2>
                    <div className="oauth-container">
                        <GoogleLogin width={200} onSuccess={() => {}}/>
                        <KakaoLogin token={""} onSuccess={() => {}} onFail={() => {}}/>
                    </div>
                </Card>
            </div>
        </div>
    }/>
}

export default LoginPage;