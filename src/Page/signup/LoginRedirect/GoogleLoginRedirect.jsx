import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AxiosApi from "../../../Api/AxiosApi";
import { useAuth } from "../../../Context/AuthContext";
import Common from "../../../Util/Common";

import { Button } from "../../../Component/ButtonComponent";
import { Loading } from "../../../Component/LoadingComponent";

export function GoogleRedirect() {
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

    // 1. 구글 토큰 발급
    axios
      .post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          code: code,
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          client_secret: process.env.REACT_APP_GOOGLE_CLIENT_PW,
          redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const { access_token } = response.data;
        console.log("Access Token:", access_token);
        // const accessToken = response.data.access_token;
        // const idToken = response.data.id_token;

        // 2. 구글 사용자 정보 조회
        axios
          .get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((userResponse) => {
            const googleUser = userResponse.data;
            console.log("구글 사용자 정보: ", googleUser);
            // 3. 백엔드로 사용자 정보 전송
            axios
              .post(
                "https://plan4land.store/auth/login",
                {
                  sso: "google",
                  socialId: googleUser.id,
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
                  Common.setAccessToken(backendResponse.data.accessToken);
                  Common.setRefreshToken(backendResponse.data.refreshToken);
                  loginFront("google", googleUser.id);
                  navigate("/");
                }
              })
              .catch((error) => {
                if (error.response.data === "회원가입이 필요합니다.") {
                  console.log("회원가입이 필요합니다.");

                  // 404 에러 시 회원가입 페이지로 이동
                  navigate("/signup/terms", {
                    state: { social_id: googleUser.id, sso: "google" },
                  });
                } else if (error.response.data === "탈퇴한 회원입니다.") {
                  console.log("탈퇴한 회원입니다.");
                  alert("탈퇴한 회원입니다.");
                } else if (error.response.data === "정지된 회원입니다.") {
                  console.log("정지된 회원입니다.");
                  handleBan(googleUser.id);
                } else {
                  console.error("백엔드 통신 오류:", error);
                }
                setIsSuccess(false);
              });
          })
          .catch((error) => {
            console.error("구글 사용자 정보 조회 실패:", error);
            setIsSuccess(false);
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
    const socialUri = `https://plan4land.store/member/social/google/${id}`;
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

export default GoogleRedirect;
