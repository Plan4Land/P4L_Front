import React, { useState, useCallback } from 'react';
import { KTXServiceCode } from '../../Util/Service_KTX_code'; // KTX 서비스 코드 가져오기
import { Header, Footer } from '../../Component/GlobalComponent';
import { Button } from '../../Component/ButtonComponent';
import { SelectTourItem, SearchSt } from '../../Style/ItemListStyled';
import { FaUndo, FaSearch } from 'react-icons/fa';
import { Vehiclekind } from '../../Util/Service_VehicleKind_code';
import styled from 'styled-components';

const KTXList = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
  margin-bottom: 50px;
  justify-content: center;
  gap: 200px; //선택창과 조회창 간격, 변경가능
`;

const KtxInquiry = () => {
  const [schedule, setSchedule] = useState([]); // 조회된 시간표
  const [selectedDepCat1, setSelectedDepCat1] = useState(''); // 선택된 출발 지역
  const [selectedDepCat2, setSelectedDepCat2] = useState(''); // 선택된 출발 세부 역
  const [selectedArrCat1, setSelectedArrCat1] = useState(''); // 선택된 도착 지역
  const [selectedArrCat2, setSelectedArrCat2] = useState(''); // 선택된 도착 세부 역
  const [selectedVehicle, setSelectedVehicle] = useState(''); // 선택된 열차 종류
  const [date, setDate] = useState(''); // 사용자 입력 날짜
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 시간표 데이터 가져오는 함수
  const fetchSchedule = useCallback(async () => {
    if (!date || !selectedDepCat2 || !selectedArrCat2 || !selectedVehicle) {
      alert('날짜, 출발 세부 역, 도착 세부 역, 열차 종류를 모두 선택해주세요.');
      return;
    }
  
    console.log('선택된 날짜:', date);
  
    const selectedDepTerminal = KTXServiceCode.flatMap((cat1) => cat1.cat2List).find(
      (terminal) => terminal.cat2 === selectedDepCat2
    );
    const selectedArrTerminal = KTXServiceCode.flatMap((cat1) => cat1.cat2List).find(
      (terminal) => terminal.cat2 === selectedArrCat2
    );
  
    if (!selectedDepTerminal || !selectedArrTerminal) {
      alert('선택한 역에 대한 데이터를 찾을 수 없습니다.');
      return;
    }
  
    const depTerminalId = selectedDepTerminal.cat2Code;
    const arrTerminalId = selectedArrTerminal.cat2Code;
  
    console.log('출발 역 cat2Code:', depTerminalId);
    console.log('도착 역 cat2Code:', arrTerminalId);
  
    const formattedDate = date.replace(/-/g, '');
    console.log('변환된 날짜:', formattedDate);
  
    const formatDateTime = (dateTime) => {
      if (!dateTime || dateTime.length < 12) {
        console.error('잘못된 날짜/시간 형식:', dateTime);
        return '유효하지 않은 시간';
      }
      const hour = dateTime.slice(8, 10);
      const minute = dateTime.slice(10, 12);
      return `${hour}:${minute}`;
    };
  
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
    const params = {
      serviceKey: 'BaAcBeQKCSysvfPe3OYNj5RZR2Ndak1B6nK/pNi+AWPXoWb9ERyK++Iih8TqfSog2L4NtpXRGXOUouQhD+cigw==',
      depPlaceId: depTerminalId,
      arrPlaceId: arrTerminalId,
      depPlandTime: formattedDate,
      trainGradeCode: selectedVehicle,
      numOfRows: 10,
    };
  
    setLoading(true);
    let allSchedules = [];
    let currentPage = 1;
    try {
      while (true) {
        params.pageNo = currentPage;
        const response = await fetch(`${url}?${new URLSearchParams(params)}`);
        const textResponse = await response.text();
  
        console.log(`페이지 ${currentPage} 응답:`, textResponse);
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textResponse, 'application/xml');
  
        const items = xmlDoc.getElementsByTagName('item');
        const scheduleData = Array.from(items).map(item => ({
          depTime: formatDateTime(item.getElementsByTagName('depplandtime')[0]?.textContent || ''),
          arrTime: formatDateTime(item.getElementsByTagName('arrplandtime')[0]?.textContent || ''),
          trainGradeCode: item.getElementsByTagName('traingradename')[0]?.textContent || '',
          adultCharge: item.getElementsByTagName('adultcharge')[0]?.textContent || '',
        }));
  
        allSchedules = [...allSchedules, ...scheduleData];
  
        const totalCount = parseInt(xmlDoc.getElementsByTagName('totalCount')[0]?.textContent || '0', 10);
        const numOfRows = parseInt(xmlDoc.getElementsByTagName('numOfRows')[0]?.textContent || '0', 10);
        if (currentPage * numOfRows >= totalCount) break;
  
        currentPage += 1;
      }
      setSchedule(allSchedules);
      console.log('전체 조회된 열차 정보:', allSchedules);
    } catch (error) {
      console.error('시간표 조회 오류:', error);
      alert('시간표 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [date, selectedDepCat2, selectedArrCat2, selectedVehicle]);

  // 초기화 함수
  const handleResetSelections = () => {
    setSelectedDepCat1('');
    setSelectedDepCat2('');
    setSelectedArrCat1('');
    setSelectedArrCat2('');
    setSelectedVehicle('');
    setDate('');
    setSchedule([]);
  };

  // 선택된 cat1에 맞는 cat2List를 얻기 위한 함수
  const getCat2List = (selectedCat1) => {
    return KTXServiceCode.find((cat1) => cat1.cat1 === selectedCat1)?.cat2List || [];
  };

  return (
    <>
      <Header />
      <KTXList>
        <SelectTourItem>
          <button className="reset-button" onClick={handleResetSelections}>
            초기화
            <FaUndo style={{ marginLeft: '6px' }} />
          </button>

          {/* 날짜 입력 */}
          <SearchSt>
            <div className="search-wrapper">
              <input
                type="date"
                className="search"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </SearchSt>

          {/* 출발 지역 선택 */}
          <div className="mainarea">
            <h3>출발 지역 선택</h3>
            <div>
              {KTXServiceCode.map((cat1) => (
                <Button
                  key={cat1.cat1}
                  onClick={() => {
                    setSelectedDepCat1(cat1.cat1);
                    setSelectedDepCat2(''); // 지역을 선택하면 세부 역을 초기화
                    setSelectedVehicle(''); // 열차 선택 초기화
                  }}
                  className={selectedDepCat1 === cat1.cat1 ? 'selected' : ''}
                >
                  {cat1.cat1}
                </Button>
              ))}
            </div>
          </div>

          {/* 출발 세부 역 선택 */}
          {selectedDepCat1 && (
            <div className="subarea">
              <h3>출발 세부 역 선택</h3>
              <div>
                {getCat2List(selectedDepCat1).map((cat2) => (
                  <Button
                    key={cat2.cat2}
                    onClick={() => {
                      setSelectedDepCat2(cat2.cat2);
                      setSelectedVehicle(''); // 세부 역을 선택하면 열차 선택 초기화
                    }}
                    className={selectedDepCat2 === cat2.cat2 ? 'selected' : ''}
                  >
                    {cat2.cat2}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 도착 지역 선택 */}
          <div className="mainarea">
            <h3>도착 지역 선택</h3>
            <div>
              {KTXServiceCode.map((cat1) => (
                <Button
                  key={cat1.cat1}
                  onClick={() => {
                    setSelectedArrCat1(cat1.cat1);
                    setSelectedArrCat2(''); // 지역을 선택하면 세부 역을 초기화
                    setSelectedVehicle(''); // 열차 선택 초기화
                  }}
                  className={selectedArrCat1 === cat1.cat1 ? 'selected' : ''}
                >
                  {cat1.cat1}
                </Button>
              ))}
            </div>
          </div>

          {/* 도착 세부 역 선택 */}
          {selectedArrCat1 && (
            <div className="subarea">
              <h3>도착 세부 역 선택</h3>
              <div>
                {getCat2List(selectedArrCat1).map((cat2) => (
                  <Button
                    key={cat2.cat2}
                    onClick={() => setSelectedArrCat2(cat2.cat2)}
                    className={selectedArrCat2 === cat2.cat2 ? 'selected' : ''}
                  >
                    {cat2.cat2}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 열차 선택 */}
          {selectedDepCat2 && selectedArrCat2 && (
            <div className="trainarea">
              <h3>열차 선택</h3>
              <div>
                {Vehiclekind.map((vehicle) => (
                  <Button
                    key={vehicle.VehicleKindCode}
                    onClick={() => setSelectedVehicle(vehicle.VehicleKindCode)}
                    className={selectedVehicle === vehicle.VehicleKindCode ? 'selected' : ''}
                  >
                    {vehicle.VehicleKindName}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 검색 버튼 */}
          <div>
            <Button onClick={fetchSchedule} disabled={loading}>
              {loading ? '로딩 중...' : '조회'}
              <FaSearch style={{ marginLeft: '6px' }} />
            </Button>
          </div>
        </SelectTourItem>

        {/* 시간표 결과 */}
        <div className="schedule-results">
          <h3>KTX 조회</h3>
          {schedule.length === 0 ? (
            <p>조회된 시간표가 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>출발 시간</th>
                  <th>도착 시간</th>
                  <th>열차 종류</th>
                  <th>요금</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.depTime}</td>
                    <td>{item.arrTime}</td>
                    <td>{item.trainGradeCode}</td>
                    <td>{item.adultCharge}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </KTXList>
      <Footer />
    </>
  );
};

export default KtxInquiry;
