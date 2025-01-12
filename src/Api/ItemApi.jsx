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

export const TourItemApi = {
  // 여행지 상세 정보 조회
  getSpotDetails: async (spotId) => {
    try {
      const response = await AxiosInstance.get(`/api/travelspots/${spotId}`);
      console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
      return response.data || [];
    } catch (error) {
      console.error("여행지 상세 조회 오류:", error);
      throw error;
    }
  },
};

export const BookmarkApi = {
  addBookmark: async (memberId, spotId) => {
    try {
      const response = await AxiosInstance.post("/api/bookmarks/add", null, {
        params: { memberId, spotId },
      });
      return response.data;
    } catch (error) {
      console.error("북마크 추가 실패:", error);
      throw error;
    }
  },

  // 북마크 삭제
  removeBookmark: async (memberId, spotId) => {
    try {
      const response = await AxiosInstance.delete("/api/bookmarks/remove", {
        params: { memberId, spotId }, // params로 변경
      });
      return response.data;
    } catch (error) {
      console.error("북마크 삭제 실패:", error);
      throw error;
    }
  },
};
