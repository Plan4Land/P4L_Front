import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    // axios로 POST 요청
    axios
      .post(
        `보내줄 주소?code=${code}`,
        {}, // POST 요청 본문 (비어 있을 경우 {})
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(response.data.result.user_id);
        console.log(response.data.result.jwt);

        // 인증이 성공하면 페이지 이동 (예: 메인 페이지로 이동)
        navigate("/");
      })
      .catch((error) => {
        console.error("오류 발생", error);
      });
  }, [code, navigate]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
