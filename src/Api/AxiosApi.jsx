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
    return await axios.post(Common.PLAN_DOMAIN + "/auth/login", login);
  },
  // 로그아웃
  logout: async (userId) => {
    const member = {id: userId};
    return await AxiosInstance.post("/auth/logout", member);
  },
  // 회원가입
  signup: async (id, password, name, nickname, email, profileImg, socialId, sso) => {
    try {
      const member = {
        id: id,
        password: password,
        name: name,
        email: email,
        nickname: nickname,
        profileImg: profileImg,
        socialId: socialId,
        sso: sso,
      };
      const response = await axios.post(Common.PLAN_DOMAIN + "/auth/signup", member);
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
  memberInfoBySocialId: async (sso, socialId) => {
    console.log("memberinfobysosid", sso, socialId);
    return await axios.get(Common.PLAN_DOMAIN+`/member/social/${sso}/${socialId}`);
  },
  // 멤버 검색
  searchMember: async (userKeyword, plannerId) => {
    const params = {
      id: userKeyword,
      nickname: userKeyword,
      plannerId: plannerId,
    };
    console.log("plannerId type:", typeof plannerId);
    console.log(params);
    return (await AxiosInstance.get(`/member/search`, {params})).data;
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
  // 회원 비밀번호 변경
  memberUpdatePassword: async (id, password) => {
    const member = {
      id: id,
      password: password,
    };
    return await AxiosInstance.put("/member/update/password", member);
  },
  // 회원 삭제
  memberDelete: async (userId) => {
    return await AxiosInstance.delete(`/member/${userId}`);
  },
  // 회원 비밀번호 검증 (마이페이지)
  memberValidate: async (id, password) => {
    const memberInfo = {
      id: id,
      password: password,
    };
    return await AxiosInstance.post("/member/validate", memberInfo);
  },
  // 회원 아이디 중복 확인
  memberIdExists: async (id) => {
    return await axios.post(Common.PLAN_DOMAIN + `/member/idExists/${id}`);
  },
  // 회원 이메일 중복 확인
  memberEmailExists: async (email) => {
    return await axios.post(Common.PLAN_DOMAIN + `/member/emailExists/${email}`);
  },
  // 회원 닉네임 중복 확인
  memberNicknameExists: async (nickname) => {
    return await axios.post(Common.PLAN_DOMAIN + `/member/nicknameExists/${nickname}`);
  },
  // 회원 아이디 찾기
  memberFindId: async (name, email) => {
    const memberInfo = {
      name: name,
      email: email,
    };
    return await axios.post(Common.PLAN_DOMAIN + "/member/find-id", memberInfo);
  },
  // 회원 비밀번호 찾기
  memerFindPassword: async (id, email) => {
    const memberInfo = {
      id: id,
      email: email,
    };
    return await axios.post(Common.PLAN_DOMAIN + "/member/find-password", memberInfo);
  },
  // 이메일로 회원 탈퇴 확인
  isActivateByEmail: async (email) => {
    const memberInfo = {
      email: email,
    };
    return await axios.post(Common.PLAN_DOMAIN + "/auth/isActivate/byEmail", memberInfo);
  },
  // 아이디+이메일로 회원 탈퇴 확인
  isActivateByIdAndEmail: async (id, email) => {
    const memberInfo = {
      id: id,
      email: email,
    };
    return await axios.post(Common.PLAN_DOMAIN + "/auth/isActivate/byIdAndEmail", memberInfo);
  },
  // 팔로우 정보 로드
  loadFollow: async (userId) => {
    try {
      const response = await AxiosInstance.get(`/member/follow-info/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  // 팔로우/해제
  follow: async (followerId, followedId, isFollow) => {
    try {
      const response = await AxiosInstance.post(`/member/follow/`, null, {
        params: {
          followerId: followerId,
          followedId: followedId,
          isFollow: isFollow,
        }
      });
      return response.data;
    } catch (error) {
      console.error("팔로우 요청 실패 : ", error);
      throw error;
    }
  },
  // 신고하기
  report: async (reporter, reported, content) => {
    try {
      const response = await AxiosInstance.post(`/member/report`, {
        reporter: reporter,
        reported: reported,
        content: content,
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // 정지 사유
  banData: async (userId) => {
    try{
      const response = await axios.get(Common.PLAN_DOMAIN +`/member/bandata/${userId}`);
      return response.data;
    }catch(error){
      console.log(error);
      return null;
    }
  }
};
export default AxiosApi;
