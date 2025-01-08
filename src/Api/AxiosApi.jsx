import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import Common from "../Util/Common";

const AxiosApi = {
  // 유저 회원가입 확인
  regCheck: async (userId) => {
    return await AxiosInstance.get(`/auth/exists/${userId}`);
  },
  // 로그인
  login: async (userId, password) => {
    const login = {
      id: userId,
      password: password,
    };
    return await AxiosInstance.post(`/auth/login`, login);
  },
  // 회원가입
  signup: async (id, password, name, nickname, email, profileImg) => {
    try {
      const member = {
        id: id,
        password: password,
        name: name,
        email: email,
        nickname: nickname,
        profileImg: profileImg,
      };
      const response = await AxiosInstance.post(`/auth/signup`, member);
      return response;
    } catch (error) {
      console.error("Signup Error: ", error);
      throw error;
    }
  },
  // 전체 멤버 조회
  memberList: async () => {
    return await AxiosInstance.get("/member/list");
  },
  // 개별 멤버 조회
  memberInfo: async (userId) => {
    return await AxiosInstance.get(`/member/${userId}`);
  },
  // 회원 정보 수정
  memberUpdate: async (id, name, nickname, email, profileImg) => {
    const member = {
      id: id,
      name: name,
      email: email,
      nickname: nickname,
      profileImg: profileImg,
    };
    return await AxiosInstance.put("/member/update", member);
  },
  // 회원 정보 삭제
  memberDelete: async (userId) => {
    return await AxiosInstance.delete(`/member/${userId}`);
  },
  // 회원 비밀번호 검증
  memberValidate: async (id, password) => {
    const memberInfo = {
      id: id,
      password: password,
    }
    return await AxiosInstance.post("/member/validate", memberInfo);
  },
}
export default AxiosApi;