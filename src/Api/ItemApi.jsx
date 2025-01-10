import AxiosInstance from "./AxiosInstance";
import axios from "axios";

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

export const TourItemApi = {
  // 여행지 상세 정보 조회
  getSpotDetails: async (spotId) => {
    try {
      const response = await AxiosInstance.get(`/api/bookmarks/${spotId}`);
      console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
      return response.data;
    } catch (error) {
      console.error("여행지 상세 정보 조회 오류:", error);
      throw error;
    }
  },
};
