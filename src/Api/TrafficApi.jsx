import axios from "axios";

export const KTXApi = {
  getSchedule: async (departure, arrival, date, vehicles) => {
    const vehiclePromises = vehicles.map(async (vehicleCode) => {
      let allItems = [];
      let pageNo = 1;
      let totalCount = 0;

      while (true) {
        try {
          const response = await axios.get(
            "https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo",
            {
              params: {
                depPlaceId: departure,
                arrPlaceId: arrival,
                depPlandTime: date,
                trainGradeCode: vehicleCode,
                _type: "json",
                numOfRows: 200,
                pageNo: pageNo,
                serviceKey: process.env.REACT_APP_API_KEY_JISUK,
              },
            }
          );

          // items가 존재하지 않거나, 배열이 아닌 경우 빈 배열로 처리
          let items = response.data.response.body.items?.item || [];
          if (!Array.isArray(items)) {
            items = items ? [items] : []; // 객체이면 배열로 변환, 없으면 빈 배열
          }

          allItems = [...allItems, ...items];

          totalCount = response.data.response.body.totalCount;

          if (allItems.length >= totalCount) {
            break;
          }

          pageNo += 1;
        } catch (error) {
          console.error(
            `Error fetching data for vehicle code ${vehicleCode} on page ${pageNo}:`,
            error
          );
          break; // 오류가 나면 더 이상 반복하지 않음
        }
      }

      return allItems;
    });

    try {
      const results = await Promise.all(vehiclePromises);
      return results;
    } catch (error) {
      console.error("Error fetching train schedules:", error);
      return null;
    }
  },
};

export const ExpressApi = {
  getSchedule: async (departure, arrival, date, vehicles) => {
    const vehiclePromises = vehicles.map(async (vehicleCode) => {
      let allItems = [];
      let pageNo = 1;
      let totalCount = 0;

      while (true) {
        try {
          const response = await axios.get(
            "https://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo",
            {
              params: {
                depTerminalId: departure,
                arrTerminalId: arrival,
                depPlandTime: date,
                busGradeId: vehicleCode,
                _type: "json",
                numOfRows: 200,
                pageNo: pageNo,
                serviceKey: process.env.REACT_APP_API_KEY_JISUK,
              },
            }
          );
          console.log(departure, arrival, vehicleCode);
          // items가 존재하지 않거나, 배열이 아닌 경우 빈 배열로 처리
          let items = response.data.response?.body?.items?.item || [];
          if (!Array.isArray(items)) {
            items = items ? [items] : []; // 객체이면 배열로 변환, 없으면 빈 배열
          }

          allItems = [...allItems, ...items];

          totalCount = response.data.response.body.totalCount;

          if (allItems.length >= totalCount) {
            break;
          }

          pageNo += 1;
        } catch (error) {
          console.error(
            `Error fetching data for vehicle code ${vehicleCode} on page ${pageNo}:`,
            error
          );
          break; // 오류가 나면 더 이상 반복하지 않음
        }
      }

      return allItems;
    });

    try {
      const results = await Promise.all(vehiclePromises);
      return results;
    } catch (error) {
      console.error("Error fetching train schedules:", error);
      return null;
    }
  },
};

export const IntercityApi = {
  getSchedule: async (departure, arrival, date, vehicles) => {
    const vehiclePromises = vehicles.map(async (vehicleCode) => {
      let allItems = [];
      let pageNo = 1;
      let totalCount = 0;
      console.log(departure, arrival, date, vehicleCode);

      while (true) {
        try {
          const response = await axios.get(
            "http://apis.data.go.kr/1613000/SuburbsBusInfoService/getStrtpntAlocFndSuberbsBusInfo",
            {
              params: {
                depTerminalId: departure,
                arrTerminalId: arrival,
                depPlandTime: date,
                busGradeId: vehicleCode,
                _type: "json",
                numOfRows: 200,
                pageNo: pageNo,
                serviceKey: process.env.REACT_APP_API_KEY_JISUK,
              },
            }
          );

          // items가 존재하지 않거나, 배열이 아닌 경우 빈 배열로 처리
          const items = response.data.response.body.items?.item || [];

          allItems = [...allItems, ...items];

          totalCount = response.data.response.body.totalCount;

          if (allItems.length >= totalCount) {
            break;
          }

          pageNo += 1;
        } catch (error) {
          console.error(
            `Error fetching data for vehicle code ${vehicleCode} on page ${pageNo}:`,
            error
          );
          break; // 오류가 나면 더 이상 반복하지 않음
        }
      }

      return allItems;
    });

    try {
      const results = await Promise.all(vehiclePromises);
      return results;
    } catch (error) {
      console.error("Error fetching train schedules:", error);
      return null;
    }
  },
};
