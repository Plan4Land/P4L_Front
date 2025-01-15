import AxiosInstance from "./AxiosInstance";

export const KtxApi = {
  // KTX 리스트 조회
  getKtxList: async (filters, page = 0, size = 10) => {
    try {
      const params = {
        ...filters, // 사용자 필터 (예: 출발역, 도착역, 날짜 등)
        page,       // 페이지 번호
        size,       // 한 페이지에 보여줄 데이터 개수
      };

      console.log("******************************");
      console.log("KTX 조회 필터:", filters);

      const response = await AxiosInstance.get("/api/ktx", { params });
      console.log("KTX API 응답 데이터:", response.data);
      return response.data || [];
    } catch (error) {
      console.error("KTX 리스트 조회 오류:", error);
      throw error;
    }
  },
};
