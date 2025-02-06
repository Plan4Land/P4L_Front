import {useEffect, useState} from "react";
import AdminApi from "../../Api/AdminApi";
import {useLocation, useNavigate} from "react-router-dom";
import Common from "../../Util/Common";
import {Button} from "../../Component/ButtonComponent";
import {useAuth} from "../../Context/AuthContext";
import login from "../signup/Login";

const AdminLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const response = await AdminApi.adminLogin(id, password);
      console.log(response);
      if(response.status === 200){
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);
        navigate("/management");
      }
    }catch(err){
      console.log(err)
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      handleLogin();
    }
  }

  const handleClearStorage = () =>{
    localStorage.clear();
  }

  return (
    <div>
      <h1>관리자 로그인</h1>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={() => handleClearStorage()}>로컬 비우기</Button>
    </div>
  );
};


export default AdminLogin;