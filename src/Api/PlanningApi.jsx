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
    console.log(plannerId);
    console.log((await AxiosInstance.get(`/planner/${plannerId}`)).data);
    return (await AxiosInstance.get(`/planner/${plannerId}`)).data;
  },
};

export default PlanningApi;
