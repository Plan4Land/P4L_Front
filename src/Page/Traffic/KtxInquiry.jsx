import React, { useState, useCallback, useEffect } from 'react';
import { KTXServiceCode } from '../../Util/Service_KTX_code'; // KTX 서비스 코드 가져오기
import { Header, Footer } from '../../Component/GlobalComponent';
import { Button } from '../../Component/ButtonComponent';
import { Table, TrafficBox, SelectTourItem, SearchSt } from '../../Style/ItemListStyled';
import { FaUndo, FaSearch } from 'react-icons/fa';
import { Vehiclekind } from '../../Util/Service_VehicleKind_code';
import {Pagination} from "../../Component/Pagination";

const KtxInquiry = () => {
  const [schedule, setSchedule] = useState([]); // 조회된 시간표
  const [displayedSchedule, setDisplayedSchedule] = useState([]); // 현재 페이지에 표시할 데이터
  const [selectedDepCat1, setSelectedDepCat1] = useState(''); // 선택된 출발 지역
  const [selectedDepCat2, setSelectedDepCat2] = useState(''); // 선택된 출발 세부 역
  const [selectedArrCat1, setSelectedArrCat1] = useState(''); // 선택된 도착 지역
  const [selectedArrCat2, setSelectedArrCat2] = useState(''); // 선택된 도착 세부 역
  const [selectedVehicle, setSelectedVehicle] = useState([]); // 선택된 열차 종류
  const [date, setDate] = useState(''); // 사용자 입력 날짜
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const itemsPerPage = 25; // 페이지당 항목 수

  useEffect(() => {
    if (schedule.length > 0) {
      const startIndex = currentPage * itemsPerPage; // 0 페이지부터 시작
      const endIndex = startIndex + itemsPerPage;
      setDisplayedSchedule(schedule.slice(startIndex, endIndex)); // 페이지에 맞는 데이터 업데이트
    }
  }, [schedule, currentPage]);
  
  useEffect(() => {
    if (schedule.length > 0) {
      setDisplayedSchedule(schedule.slice(0, itemsPerPage)); // 데이터 로드 후 첫 페이지 데이터 설정
    }
  }, [schedule]);

  // 페이지네이션 계산을 위한 수정된 코드
  const calculateTotalPages = () => {
    const totalCount = schedule.length;
    return Math.ceil(totalCount / itemsPerPage); // 전체 페이지 수 계산
  };

  const calculateDuration = (depTime, arrTime) => {
    const dep = new Date(`1970-01-01T${depTime}:00Z`);
    const arr = new Date(`1970-01-01T${arrTime}:00Z`);
    
    // 도착 시간이 출발 시간보다 빠르면 날짜를 넘어갔다고 가정
    if (arr < dep) {
      arr.setDate(arr.getDate() + 1); // 하루를 더해줌
    }
  
    const diff = arr - dep; // 소요시간 계산 (밀리초 단위)
    
    if (diff < 0) {
      return '유효하지 않은 시간';
    }
    
    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  // 시간순으로 정렬하는 함수
  const sortByTime = (schedules) => {
    return schedules.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.depTime}:00Z`);
      const timeB = new Date(`1970-01-01T${b.depTime}:00Z`);
      return timeA - timeB;
    });
  };

  // 시간표 데이터 가져오는 함수
  const fetchSchedule = useCallback(async () => {
    if (!date || !selectedDepCat2 || !selectedArrCat2 ||  selectedVehicle.length === 0) {
      alert('날짜, 출발 세부 역, 도착 세부 역, 열차 종류를 모두 선택해주세요.');
      return;
    }

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

    const formattedDate = date.replace(/-/g, '');

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
    };

    setLoading(true);
    let allSchedules = [];
    try {
      const expandedVehicleCodes = selectedVehicle.flatMap((vehicle) =>
        Vehiclekind.filter((kind) => kind.ParentVehicleKindCode === vehicle || kind.VehicleKindCode === vehicle)
          .map((kind) => kind.VehicleKindCode)
      );

      for (const vehicle of expandedVehicleCodes) {
        params.trainGradeCode = vehicle; // 선택된 열차 종류마다 데이터 요청
        let currentPage = 1;
        while (true) {
          params.pageNo = currentPage;
          const response = await fetch(`${url}?${new URLSearchParams(params)}`);
          const textResponse = await response.text();

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(textResponse, 'application/xml');

          const items = xmlDoc.getElementsByTagName('item');
          const scheduleData = Array.from(items).map(item => {
            const depTime = formatDateTime(item.getElementsByTagName('depplandtime')[0]?.textContent || '');
            const arrTime = formatDateTime(item.getElementsByTagName('arrplandtime')[0]?.textContent || '');
            return {
              depStation: selectedDepCat2, // 출발역 추가
              arrStation: selectedArrCat2, // 도착역 추가
              depTime,
              arrTime,
              trainGradeCode: item.getElementsByTagName('traingradename')[0]?.textContent || '',
              adultCharge: item.getElementsByTagName('adultcharge')[0]?.textContent || '',
              duration: calculateDuration(depTime, arrTime), // 소요시간 추가
            };
          });

          allSchedules = [...allSchedules, ...scheduleData];

          const totalCount = parseInt(xmlDoc.getElementsByTagName('totalCount')[0]?.textContent || '0', 10);
          const numOfRows = parseInt(xmlDoc.getElementsByTagName('numOfRows')[0]?.textContent || '0', 10);
          if (currentPage * numOfRows >= totalCount) break;

          currentPage += 1;
        }
      }

      // 시간순으로 정렬
      const sortedSchedules = sortByTime(allSchedules);
      console.log(sortedSchedules);
      setSchedule(sortedSchedules);
      setCurrentPage(1); // 1페이지로 초기화
    } catch (error) {
      console.error('시간표 조회 오류:', error);
      alert('시간표 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [date, selectedDepCat2, selectedArrCat2, selectedVehicle]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 초기화 함수
  const handleResetSelections = () => {
    setSelectedDepCat1('');
    setSelectedDepCat2('');
    setSelectedArrCat1('');
    setSelectedArrCat2('');
    setSelectedVehicle([]);
    setDate('');
    setSchedule([]);
    setCurrentPage(1);
  };

  // 선택된 cat1에 맞는 cat2List를 얻기 위한 함수
  const getCat2List = (selectedCat1) => {
    return KTXServiceCode.find((cat1) => cat1.cat1 === selectedCat1)?.cat2List || [];
  };

  return (
    <>
      <Header />
      <TrafficBox>
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
              <h3>열차 종류 선택</h3>
              <div>
                {Vehiclekind.map((vehicle) => (
                  <Button
                  key={vehicle.VehicleKindCode}
                  onClick={() => {
                    setSelectedVehicle((prev) =>
                      prev.includes(vehicle.VehicleKindCode)
                        ? prev.filter((code) => code !== vehicle.VehicleKindCode) // 이미 선택된 열차는 해제
                        : [...prev, vehicle.VehicleKindCode] // 새로 선택된 열차는 추가
                    );
                  }}
                  className={selectedVehicle.includes(vehicle.VehicleKindCode) ? 'selected' : ''}
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
        <div style={{width: "150px"}}></div>

        {/* 시간표 결과 */}
        <div className="schedule-results">
          <h3>KTX 조회</h3>
          {displayedSchedule.length === 0 ? (
            <p>조회된 시간표가 없습니다.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>출발역</th>
                  <th>출발 시간</th>
                  <th>도착역</th>
                  <th>도착 시간</th>
                  <th>열차 종류</th>
                  <th>요금</th>
                  <th>소요시간</th>
                </tr>
              </thead>
              <tbody>
                {displayedSchedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.depStation}</td>
                    <td>{item.depTime}</td>
                    <td>{item.arrStation}</td>
                    <td>{item.arrTime}</td>
                    <td>{item.trainGradeCode}</td>
                    <td>{item.adultCharge}원</td>
                    <td>{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {schedule.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(schedule.length / itemsPerPage)}
              handlePageChange={handlePageChange}
            />
            </div>
          )}
        </div>
      </TrafficBox>
      <Footer />
    </>
  );
};

export default KtxInquiry;