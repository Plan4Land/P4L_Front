import AxiosInstance from "./AxiosInstance";

const AdminApi = {
  // 유저 검색
  userSearch: async (keyword, select)=>{
    const response = await AxiosInstance.get("/admin/member-search", {params: {keyword, select}});
    return response.data;
  },
  // 신고 목록 불러오기
  loadReports: async () => {
    const response = await AxiosInstance.get("/admin/report-list");
    return response.data;
  },
  reportCount: async (userId)=>{
    const response = await AxiosInstance.get("/admin/report-count", {params: {userId: userId}});
    return response.data;
  }

}

export default AdminApi;