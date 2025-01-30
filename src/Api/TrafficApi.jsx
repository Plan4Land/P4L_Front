import axios from "axios";

// export const KTXApi = {
//   getSchedule: async (departure, arrival, date, vehicles) => {
//     // vehicles 배열을 순회하면서 각 차량 코드에 대해 요청을 보내기 위한 작업
//     const vehiclePromises = vehicles.map((vehicleCode) => {
//       return axios.get(
//         "http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo",
//         {
//           params: {
//             depPlaceId: departure,
//             arrPlaceId: arrival,
//             depPlandTime: date,
//             trainGradeCode: vehicleCode, // 각 차량 코드
//             _type: "json",
//             numOfRows: 30,
//             pageNo: 1,
//             serviceKey: process.env.REACT_APP_API_KEY_JISUK,
//           },
//         }
//       );
//     });

//     try {
//       // 모든 요청이 끝날 때까지 기다린 후 결과를 반환
//       const responses = await Promise.all(vehiclePromises);
//       console.log(responses);

//       // 첫 번째 응답 데이터 반환 (각각 다른 차량에 대한 응답)
//       return responses.map(
//         (response) => response.data.response.body.items.item
//       );
//     } catch (error) {
//       console.error("Error fetching train schedules:", error);
//       return null;
//     }
//   },
// };

export const KTXApi = {
  getSchedule: async (departure, arrival, date, vehicles) => {
    const vehiclePromises = vehicles.map(async (vehicleCode) => {
      let allItems = [];
      let pageNo = 1;
      let totalCount = 0;

      while (true) {
        try {
          const response = await axios.get(
            "http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo",
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
