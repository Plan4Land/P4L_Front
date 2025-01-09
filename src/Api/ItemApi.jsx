// TravelSpotApi.js

import AxiosInstance from "./AxiosInstance";

export const TravelSpotApi = {
  // 여행지 리스트 조회
  getTravelSpots: async (page = 0, size = 10) => {
    try {
      const response = await AxiosInstance.get("/api/travelspots", {
        params: { page, size },
      });
      console.log("API 응답 데이터:", response.data);
      return response.data || [];
    } catch (error) {
      console.error("여행지 데이터 조회 오류:", error);
      throw error;
    }
  },
};
