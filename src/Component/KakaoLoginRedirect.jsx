import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log('Authorization Code:', code);

    if (code) {
      // 백엔트로 code 전송해 토큰 요청

      // 인증 후 이동
      navigate("/");
    } else {
      console.error('Authorization code not found');
    }
  }, [navigate]);

  return <div>카카오 인증 처리중...</div>;
};
export default KakaoLoginRedirect;