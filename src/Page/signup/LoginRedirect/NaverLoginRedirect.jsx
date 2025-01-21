import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AxiosApi from "../../../Api/AxiosApi";
import { useAuth } from "../../../Context/AuthContext";
import { Button } from "../../../Component/ButtonComponent";

export function NaverRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
  const { login } = useAuth();
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (!code) {
      console.log("code가 존재하지 않습니다.");
      return;
    }

    // 1. 네이버 토큰 발급
    axios
      .post(
        "https://nid.naver.com/oauth2.0/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
          client_secret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
          code: code,
          state: state,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const { access_token } = response.data;
        
        // 2. 네이버 사용자 정보 조회
        axios
          .get("https://openapi.naver.com/v1/nid/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((userResponse) => {
            const naverUser = userResponse.data.response;

            // 3. 백엔드로 사용자 정보 전송
            axios
              .post(
                "http://localhost:8111/auth/login",
                {
                  sso: "naver",
                  socialId: naverUser.id,
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
                  loginFront("naver", naverUser.id);
                  navigate("/");
                }
              })
              .catch((error) => {
                if (
                  error.response.status === 404 &&
                  error.response.data.message === "회원가입이 필요합니다."
                ) {
                  console.log("회원가입이 필요합니다. 404 에러 발생");

                  // 404 에러 시 회원가입 페이지로 이동
                  navigate("/signup", {
                    state: { 
                      social_id: naverUser.id, 
                      sso: "naver" 
                    },
                  });
                } else {
                  console.error("백엔드 통신 오류:", error);
                }
              });
          })
          .catch((error) => {
            console.error("네이버 사용자 정보 조회 실패:", error);
          });
      })
      .catch((error) => {
        console.error("토큰 발급 실패:", error);
        setIsSuccess(false);
      });
  }, [code, state, navigate]);

  const loginFront = async (sso, socialId) => {
    const userData = await AxiosApi.memberInfoBySocialId(sso, socialId);
    login(userData);
  };

  return (
    <div>
      {isSuccess === true
        ? (<h1>로그인 중입니다...</h1>)
        : (<>
          <h2>로그인에 실패했습니다.</h2>
          <h2>다시 시도하거나 관리자에게 문의해주세요.</h2>
          <Button onClick={() => navigate("/login")}>뒤로</Button>
        </>)
      }
    </div>
  );
};

export default NaverRedirect;