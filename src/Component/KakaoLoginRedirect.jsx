import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    
    // 1. 카카오 토큰 발급
    axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_API_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: code,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);

        // 2. 카카오 사용자 정보 조회
        axios
          .get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((userResponse) => {
            const kakaoUser = userResponse.data;
            console.log("카카오 사용자 정보:", kakaoUser);

            // 3. 백엔드로 사용자 정보 전송
            axios
              .post("/auth/kakao", {
                kakao_id: kakaoUser.id,
              })
              .then((backendResponse) => {
                console.log("백엔드 응답:", backendResponse.data);

                if (backendResponse.data.success) {
                  // 4. 로그인 성공 -> 페이지 이동
                  navigate("/");
                } else {
                  // 4. 로그인 실패 -> 회원가입
                  navigate("/signup");
                }
              })
              .catch((error) => {
                console.error("백엔드 통신 오류:", error);
              });
          })
          .catch((error) => {
            console.error("카카오 사용자 정보 조회 실패:", error);
          });
      })
      .catch((error) => {
        console.error("토큰 발급 실패:", error);
      });
  }, [code, navigate]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
    </div>
  );
}

export default KakaoRedirect;
