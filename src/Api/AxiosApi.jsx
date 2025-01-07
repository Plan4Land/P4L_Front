import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import Common from "../Util/Common";
const PLAN_DOMAIN = Common.PLAN_DOMAIN;

const AxiosApi = {
  // 유저 회원가입 확인
  regCheck: async (userId) => {
    return await axios.get(PLAN_DOMAIN + `/auth/exists/${userId}`);
  },
  // 로그인
  login: async (userId, password) => {
    const login = {
      id: userId,
      password: password,
    };
    return await axios.post(PLAN_DOMAIN + `/auth/login`, login);
  },
  // 회원가입
  signup: async (id, password, name, nickname, email, profileImg) => {
    const member = {
      id: id,
      password: password,
      name: name,
      email: email,
      nickname: nickname,
      profileImg: profileImg,
    };
    return await axios.post(PLAN_DOMAIN + `/auth/signup`, member)
  },
  // 전체 멤버 조회
  memberList: async () => {
    return await AxiosInstance.get("/member/list");
  },
  // 개별 멤버 조회
  memberInfo: async (userId) => {
    return await AxiosInstance.get(`/member/${userId}`);
  },
}