import AxiosInstance from "./AxiosInstance";

export const TravelSpotApi = {
  // 여행지 리스트 조회
  getTravelSpots: async (filters) => {
    try {
      const params = {
        ...filters,
      };

      console.log("******************************");
      console.log(filters);

      const response = await AxiosInstance.get("/api/travelspots", { params });
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
      console.log("여기 : ", spotId);
      const response = await AxiosInstance.get(`/api/travelspotInfo/${spotId}`);
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

  // 북마크 상태 확인
  getBookmarkStatus: async (memberId, spotId) => {
    try {
      const response = await AxiosInstance.get("/api/bookmarks/status", {
        params: { memberId, spotId },
      });
      return response.data;
    } catch (error) {
      console.error("북마크 상태 조회 실패:", error);
      throw error;
    }
  },
};

export const BookmarkedSpotsApi = {
  getBookmarkedSpots: async (memberId, page = 0, size = 3) => {
    try {
      const response = await AxiosInstance.get(`/api/bookmarks/myBookmarks`, {
        params: { memberId, page, size },
      });
      return response.data; // 응답 데이터에는 Page 객체가 포함됩니다.
    } catch (error) {
      console.error("북마크 여행지 조회 오류:", error);
      throw error;
    }
  },
};

export const PlannerItemApi = {
  // 플래너 리스트 조회
  getPlanners: async (filters, page = 0, size = 10) => {
    try {
      const params = {
        ...filters, // 필터 추가
      };
      // API 호출
      const response = await AxiosInstance.get("/planner/planners", { params });
      console.log("API 응답 데이터:", response.data);
      return response.data || [];
    } catch (error) {
      console.error("플래너 데이터 조회 오류:", error);
      throw error;
    }
  },
};

export const BookmarkedPlanApi = {
  getBookmarkedPlan: async (memberId, page = 0, size = 5) => {
    try {
      const response = await AxiosInstance.get(`/planner/myPlanners`, {
        params: { memberId, page, size },
      });
      return response.data;
    } catch (error) {
      console.error("북마크 플랜 조회 오류:", error);
      throw error;
    }
  },
};

export const TopTourApi = {
  getTop5Travelspots: async() => {
    try{
      const response = await AxiosInstance.get(`/api/travelspotTop5`);
      return response.data;
    } catch (error) {
      console.error("상위 5개 관광지 조회 오류: ", error);
      throw error;
    }
  }
}

export const TopPlanApi = {
  getTop3Plans: async() => {
    try{
      const response = await AxiosInstance.get(`/plannersTop3`);
      return response.data;
    } catch (error) {
      console.error("상위 3개 플래닝 조회 오류: ", error);
      throw error;
    }
  }
}