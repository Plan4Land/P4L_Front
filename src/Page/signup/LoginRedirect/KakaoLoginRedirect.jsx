import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AxiosApi from "../../../Api/AxiosApi";
import { useAuth } from "../../../Context/AuthContext";
import Common from "../../../Util/Common";

import { Loading } from "../../../Component/LoadingComponent";
import { Button } from "../../../Component/ButtonComponent";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const { login } = useAuth();
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (!code) {
      console.log("code가 존재하지 않습니다.");
      return;
    }

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
              .post(
                "https://plan4land.store/auth/login",
                {
                  sso: "kakao",
                  socialId: kakaoUser.id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((backendResponse) => {
                console.log("백엔드 응답:", backendResponse);

                if (backendResponse.status === 200) {
                  // 4. 로그인 성공 -> 페이지 이동
                  console.log(backendResponse.data);
                  Common.setAccessToken(backendResponse.data.accessToken);
                  Common.setRefreshToken(backendResponse.data.refreshToken);
                  loginFront("kakao", kakaoUser.id);
                  navigate("/");
                }
              })
              .catch((error) => {
                if (error.response.data === "회원가입이 필요합니다.") {
                  console.log("회원가입이 필요합니다.");

                  // 404 에러 시 회원가입 페이지로 이동
                  navigate("/signup/terms", {
                    state: { social_id: kakaoUser.id, sso: "kakao" },
                  });
                } else if (error.response.data === "탈퇴한 회원입니다.") {
                  console.log("탈퇴한 회원입니다.");
                  alert("탈퇴한 회원입니다.");
                } else if (error.response.data === "정지된 회원입니다.") {
                  console.log("정지된 회원입니다.");
                  handleBan(kakaoUser.id);
                } else {
                  console.error("백엔드 통신 오류:", error);
                }
                setIsSuccess(false);
              });
          })
          .catch((error) => {
            console.error("카카오 사용자 정보 조회 실패:", error);
          });
      })
      .catch((error) => {
        console.error("토큰 발급 실패:", error);
        setIsSuccess(false);
      });
  }, [code, navigate]);

  const loginFront = async (sso, socialId) => {
    const userData = await AxiosApi.memberInfoBySocialId(sso, socialId);
    login(userData);
  };

  const handleBan = async (id) => {
    const socialUri = `https://plan4land.store/member/social/kakao/${id}`;
    const banUser = await axios.get(socialUri);
    const banUserId = JSON.stringify(banUser.data.id);
    navigate("/login", {
      state: { userState: banUserId },
    });
  };

  return (
    <div>
      {isSuccess === true ? (
        <>
          {/* 로딩 */}
          <Loading>
            <p>로그인 중입니다...</p>
          </Loading>
        </>
      ) : (
        <>
          <h2>로그인에 실패했습니다.</h2>
          <h2>다시 시도하거나 관리자에게 문의해주세요.</h2>
          <Button onClick={() => navigate("/login")}>뒤로</Button>
        </>
      )}
    </div>
  );
}

export default KakaoRedirect;
