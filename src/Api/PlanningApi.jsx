import AxiosInstance from "./AxiosInstance";

const PlanningApi = {
  makePlanning: async (
    title,
    theme,
    id,
    startDate,
    endDate,
    area,
    subArea,
    thumbnail,
    isPublic
  ) => {
    const plannerInfo = {
      title: title,
      theme: theme,
      id: id,
      startDate: startDate,
      endDate: endDate,
      area: area,
      subArea: subArea,
      thumbnail: thumbnail,
      isPublic: isPublic,
    };
    return await AxiosInstance.post(`/planner/insert`, plannerInfo);
  },
  getPlanning: async (plannerId) => {
    return (await AxiosInstance.get(`/planner/${plannerId}`)).data;
  },
  getIsBookmarked: async (memberId, plannerId) => {
    const params = {
      memberId,
      plannerId,
    };
    return (await AxiosInstance.get(`/bookmarkPlanner`, { params })).data;
  },
  putBookmarked: async (memberId, plannerId) => {
    const params = {
      memberId,
      plannerId,
    };
    return (await AxiosInstance.put(`/bookmarkPlanner`, null, { params })).data;
  },
  deleteBookmarked: async (memberId, plannerId) => {
    const params = {
      memberId,
      plannerId,
    };
    return (await AxiosInstance.delete(`/bookmarkPlanner`, { params })).data;
  },
  getChatMsgs: async (plannerId) => {
    return (await AxiosInstance.get(`/chat/msg/${plannerId}`)).data;
  },
  // chatDetail: async (plannerId) => {
  //   return (await AxiosInstance.get(`/chat/room/${plannerId}`)).data;
  // },
  inviteMember: async (memberId, plannerId) => {
    const params = {
      memberId,
      plannerId,
    };
    return await AxiosInstance.post(`/planner/invite`, null, { params });
  },
  findInvitedPlanners: async (memberId) => {
    return (await AxiosInstance.get(`/planner/invite/${memberId}`)).data;
  },
  acceptInvitation: async (memberId, plannerId) => {
    const params = {
      memberId,
      plannerId,
    };
    return await AxiosInstance.post(`/planner/invite/accept`, null, { params });
  },
  rejectInvitation: async (memberId, plannerId) => {
    console.log(memberId, plannerId);
    const params = {
      memberId,
      plannerId,
    };
    return await AxiosInstance.delete(`/planner/invite/reject`, { params });
  },
};

export default PlanningApi;
