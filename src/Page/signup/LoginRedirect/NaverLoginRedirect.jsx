import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AxiosApi from "../../../Api/AxiosApi";
import { useAuth } from "../../../Context/AuthContext";
import Common from "../../../Util/Common";

import { Loading } from "../../../Component/LoadingComponent";
import { Button } from "../../../Component/ButtonComponent";

export function NaverRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const { login, socialLogin } = useAuth();
  const [isSuccess, setIsSuccess] = useState(true);

  if (!code && !state) {
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get("code");
    const stateParam = queryParams.get("state");

    if (codeParam && stateParam) {
      setCode(codeParam);
      setState(stateParam);
    } else {
      console.log("code 또는 state가 존재하지 않습니다.");
      setIsSuccess(false);
      return;
    }
  }

  if (code && state) {
    const fatchData = async () => {
      try {
        // 1. 토큰 요청
        const tokenResponse = await axios.post(
          "https://plan4land.store/auth/naver/token",
          { code, state },
          { headers: { "Content-Type": "application/json" } }
        );
        const { access_token } = tokenResponse.data;
        socialLogin(access_token, "");

        // 2. 네이버 사용자 정보 조회
        const userResponse = await axios.post(
          "https://plan4land.store/auth/naver/userinfo",
          { access_token },
          { headers: { "Content-Type": "application/json" } }
        );
        const naverUser = userResponse.data.response;

        // 3. 백엔드로 사용자 정보 전송
        try {
          const backendResponse = await axios.post(
            "https://plan4land.store/auth/login",
            {
              sso: "naver",
              socialId: naverUser.id,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (backendResponse.status === 200) {
            // 로그인 성공 -> 페이지 이동
            Common.setAccessToken(backendResponse.data.accessToken);
            Common.setRefreshToken(backendResponse.data.refreshToken);
            await loginFront("naver", naverUser.id);
            navigate("/");
          }
        } catch (backendError) {
          if (backendError.response.data === "회원가입이 필요합니다.") {
            console.log("회원가입이 필요합니다.");

            // 회원가입 페이지로 이동
            navigate("/signup/terms", {
              state: {
                social_id: naverUser.id,
                sso: "naver",
              },
            });
          } else if (backendError.response.data === "탈퇴한 회원입니다.") {
            console.log("탈퇴한 회원입니다.");
            alert("탈퇴한 회원입니다.");
          } else if (backendError.response.data === "정지된 회원입니다.") {
            console.log("정지된 회원입니다.");
            handleBan(naverUser.id);
          } else {
            console.error("백엔드 통신 오류:", backendError);
          }
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("로그인 과정에서 오류 발생:", error);
        setIsSuccess(false);
      }
    };

    fatchData();
  }

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

export default NaverRedirect;
