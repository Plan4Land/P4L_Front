import AxiosInstance from "./AxiosInstance";
import axios from "axios";
import Common from "../Util/Common";


const AdminApi = {
  adminLogin: async (id, password) => {
    const data = {
      id: id,
      password: password,
    };
    return axios.post(Common.PLAN_DOMAIN + "/admin/admin-login", data);
  },
  // 유저 검색
  userSearch: async (filters) => {
    const params = {
      ...filters,
    }
    const response = await AxiosInstance.get("/admin/member-search", {params});
    return response.data;
  },
  // 신고 목록 불러오기
  loadReports: async (filters) => {
    const params = {
      ...filters,
    }
    const response = await AxiosInstance.get("/admin/report-list", {params});
    console.log(response.data);
    return response.data;
  },
  reportCount: async (userId) => {
    const response = await AxiosInstance.get("/admin/report-count", {params: {userId: userId}});
    return response.data;
  },
  reportReject: async (reportId) => {
    console.log("AdminAPI : ", reportId);
    return await AxiosInstance.post(`/admin/report-manage?reportId=${reportId}&status=false`);
  },
  reportAccept: async (reportId, userId, day, reason) => {
    return await AxiosInstance.post(`/admin/report-manage?reportId=${reportId}&userId=${userId}&day=${day}&status=true&reason=${reason}`);
  },
  userBan: async (userId, day, reason) => {
    return await AxiosInstance.post(`/admin/member-ban?userId=${userId}&day=${day}&reason=${reason}`);
  }

}

export default AdminApi;