import React from "react";
import kakaoLoginButtonImage from "../../../assets/kakao_login_large_narrow.png"

interface IKakaoLoginButton {
  onClick?: React.MouseEventHandler<HTMLImageElement>
}

const KakaoLoginButton = ({ onClick }: IKakaoLoginButton) => {
  return <img width="184px" src={kakaoLoginButtonImage} onClick={onClick}/>
}

export default KakaoLoginButton;