import React, { useState, useCallback, useEffect } from "react";
import { KTXServiceCode } from "../../Util/Service_KTX_code";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Button, ToggleSection } from "../../Component/ButtonComponent";
import {
  Table,
  SelectTourItem,
  SearchSt,
  FilterButton,
  List,
} from "../../Style/ItemListStyled";
import { FaUndo, FaSearch } from "react-icons/fa";
import { Vehiclekind } from "../../Util/Service_VehicleKind_code";
import { Pagination } from "../../Component/Pagination";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Loading } from "../../Component/LoadingComponent";

const KtxInquiry = () => {
  const [schedule, setSchedule] = useState([]);
  const [displayedSchedule, setDisplayedSchedule] = useState([]);
  const [selectedDepCat1, setSelectedDepCat1] = useState("");
  const [selectedDepCat2, setSelectedDepCat2] = useState("");
  const [selectedArrCat1, setSelectedArrCat1] = useState("");
  const [selectedArrCat2, setSelectedArrCat2] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [error, setError] = useState(null);

  // 토글 상태 관리
  const [isDepCat1Open, setIsDepCat1Open] = useState(true);
  const [isDepCat2Open, setIsDepCat2Open] = useState(true);
  const [isArrCat1Open, setIsArrCat1Open] = useState(true);
  const [isArrCat2Open, setIsArrCat2Open] = useState(true);
  const [isVehicleOpen, setIsVehicleOpen] = useState(true);

  const itemsPerPage = 22;

  useEffect(() => {
    if (schedule.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedSchedule(schedule.slice(startIndex, endIndex));
    }
  }, [schedule, currentPage]);

  useEffect(() => {
    if (schedule.length > 0) {
      setDisplayedSchedule(schedule.slice(0, itemsPerPage));
    }
  }, [schedule]);

  const calculateDuration = (depTime, arrTime) => {
    const dep = new Date(`1970-01-01T${depTime}:00Z`);
    const arr = new Date(`1970-01-01T${arrTime}:00Z`);

    if (arr < dep) {
      arr.setDate(arr.getDate() + 1);
    }

    const diff = arr - dep;

    if (diff < 0) {
      return "유효하지 않은 시간";
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(
      Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const sortByTime = (schedules) => {
    return schedules.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.depTime}:00Z`);
      const timeB = new Date(`1970-01-01T${b.depTime}:00Z`);
      return timeA - timeB;
    });
  };

  // 열차 종류가 '전체'인 경우 모든 열차를 조회하도록 처리
  const fetchSchedule = useCallback(async () => {
    if (
      !date ||
      !selectedDepCat2 ||
      !selectedArrCat2 ||
      selectedVehicle === null
    ) {
      alert("날짜, 출발 세부 역, 도착 세부 역, 열차 종류를 모두 선택해주세요.");
      return;
    }
  
    const selectedDepTerminal = KTXServiceCode.flatMap(
      (cat1) => cat1.cat2List
    ).find((terminal) => terminal.cat2 === selectedDepCat2);
    const selectedArrTerminal = KTXServiceCode.flatMap(
      (cat1) => cat1.cat2List
    ).find((terminal) => terminal.cat2 === selectedArrCat2);
  
    if (!selectedDepTerminal || !selectedArrTerminal) {
      alert("선택한 역에 대한 데이터를 찾을 수 없습니다.");
      return;
    }
  
    const depTerminalId = selectedDepTerminal.cat2Code;
    const arrTerminalId = selectedArrTerminal.cat2Code;
  
    const formattedDate = date.replace(/-/g, "");
  
    const formatDateTime = (dateTime) => {
      if (!dateTime || dateTime.length < 12) {
        console.error("잘못된 날짜/시간 형식:", dateTime);
        return "유효하지 않은 시간";
      }
      const hour = dateTime.slice(8, 10);
      const minute = dateTime.slice(10, 12);
      return `${hour}:${minute}`;
    };
  
    const url =
      "http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo";
    const params = {
      serviceKey:
        "BaAcBeQKCSysvfPe3OYNj5RZR2Ndak1B6nK/pNi+AWPXoWb9ERyK++Iih8TqfSog2L4NtpXRGXOUouQhD+cigw==",
      depPlaceId: depTerminalId,
      arrPlaceId: arrTerminalId,
      depPlandTime: formattedDate,
    };
  
    setLoading(true);
    let allSchedules = [];
  
    try {
      const expandedVehicleCodes = selectedVehicle.length === 0
        ? Vehiclekind.map((kind) => kind.VehicleKindCode) // 선택한 열차 종류가 없으면 전체 열차 조회
        : selectedVehicle.flatMap((vehicle) =>
            Vehiclekind.filter(
              (kind) =>
                kind.ParentVehicleKindCode === vehicle ||
                kind.VehicleKindCode === vehicle
            ).map((kind) => kind.VehicleKindCode)
          );
  
      for (const vehicle of expandedVehicleCodes) {
        params.trainGradeCode = vehicle;
        let currentPage = 1;
        while (true) {
          params.pageNo = currentPage;
          const response = await fetch(`${url}?${new URLSearchParams(params)}`);
          const textResponse = await response.text();
  
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(
            textResponse,
            "application/xml"
          );
  
          const items = xmlDoc.getElementsByTagName("item");
          const scheduleData = Array.from(items).map((item) => {
            const depTime = formatDateTime(
              item.getElementsByTagName("depplandtime")[0]?.textContent || ""
            );
            const arrTime = formatDateTime(
              item.getElementsByTagName("arrplandtime")[0]?.textContent || ""
            );
            return {
              depStation: selectedDepCat2,
              arrStation: selectedArrCat2,
              depTime,
              arrTime,
              trainGradeCode:
                item.getElementsByTagName("traingradename")[0]?.textContent || "",
              adultCharge:
                item.getElementsByTagName("adultcharge")[0]?.textContent || "",
              duration: calculateDuration(depTime, arrTime),
            };
          });
  
          // 중복 제거
          scheduleData.forEach((newSchedule) => {
            const isDuplicate = allSchedules.some(
              (existingSchedule) =>
                existingSchedule.depStation === newSchedule.depStation &&
                existingSchedule.arrStation === newSchedule.arrStation &&
                existingSchedule.depTime === newSchedule.depTime &&
                existingSchedule.arrTime === newSchedule.arrTime
            );
            if (!isDuplicate) {
              allSchedules.push(newSchedule); // 중복이 아니면 추가
            }
          });
  
          const totalCount = parseInt(
            xmlDoc.getElementsByTagName("totalCount")[0]?.textContent || "0",
            10
          );
          const numOfRows = parseInt(
            xmlDoc.getElementsByTagName("numOfRows")[0]?.textContent || "0",
            10
          );
          if (currentPage * numOfRows >= totalCount) break;
  
          currentPage += 1;
        }
      }
  
      const sortedSchedules = sortByTime(allSchedules);
      console.log(sortedSchedules);
      setSchedule(sortedSchedules);
      setCurrentPage(0);
    } catch (error) {
      console.error("시간표 조회 오류:", error);
      alert("시간표 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [date, selectedDepCat2, selectedArrCat2, selectedVehicle]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleResetSelections = () => {
    setSelectedDepCat1("");
    setSelectedDepCat2("");
    setSelectedArrCat1("");
    setSelectedArrCat2("");
    setSelectedVehicle([]);
    setDate("");
    setSchedule([]);
    setCurrentPage(1);
  };

  const getCat2List = (selectedCat1) => {
    return (
      KTXServiceCode.find((cat1) => cat1.cat1 === selectedCat1)?.cat2List || []
    );
  };

  const handleToggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const toggleDepCat1 = () => setIsDepCat1Open(!isDepCat1Open);
  const toggleDepCat2 = () => setIsDepCat2Open((prev) => !prev);
  const toggleArrCat1 = () => setIsArrCat1Open(!isArrCat1Open);
  const toggleArrCat2 = () => setIsArrCat2Open((prev) => !prev);
  const toggleVehicle = () => setIsVehicleOpen((prev) => !prev);

  return (
    <>
      <FilterButton onClick={handleToggleSelect}>
        <FaBars />
      </FilterButton>
      <List>
        <SelectTourItem className={isSelectOpen ? "open" : ""}>
          <button className="reset-button" onClick={handleResetSelections}>
            초기화
            <FaUndo style={{ marginLeft: "6px" }} />
          </button>

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
          
          <div className="mainarea">
            <ToggleSection
              title="출발 역 선택"
              isOpen={{isDepCat1Open} }
              onToggle={toggleDepCat1}
            >
              {isDepCat1Open && ( 
                <div className="buttons">
                  {KTXServiceCode.map((cat1) => (
                    <Button
                      key={cat1.cat1}
                      onClick={() => {
                        setSelectedDepCat1(cat1.cat1);
                        setSelectedDepCat2("");
                        setSelectedVehicle("");
                      }}
                      className={selectedDepCat1 === cat1.cat1 ? "selected" : ""}
                    >
                      {cat1.cat1}
                    </Button>
                  ))}
                </div>
              )}
            </ToggleSection>
          </div>
          
          {selectedDepCat1 && (
            <div className="subarea">
              <ToggleSection
                title="출발 세부 역 선택"
                isOpen={isDepCat2Open}
                onToggle={toggleDepCat2}
              >
                {isDepCat2Open && (
                  <div className="buttons">
                    {getCat2List(selectedDepCat1).map((cat2) => (
                      <Button
                        key={cat2.cat2}
                        onClick={() => setSelectedDepCat2(cat2.cat2)}
                        className={
                          selectedDepCat2 === cat2.cat2 ? "selected" : ""
                        }
                      >
                        {cat2.cat2}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}

          <div className="top">
            <ToggleSection
              title="도착 역 선택"
              isOpen={isArrCat1Open}
              onToggle={toggleArrCat1}
            >
              {isArrCat1Open && ( 
                <div className="buttons">
                  {KTXServiceCode.map((cat1) => (
                    <Button
                      key={cat1.cat1}
                      onClick={() => {
                        setSelectedArrCat1(cat1.cat1);
                        setSelectedArrCat2("");
                        setSelectedVehicle("");
                      }}
                      className={selectedArrCat1 === cat1.cat1 ? "selected" : ""}
                    >
                      {cat1.cat1}
                    </Button>
                  ))}
                </div>
              )}
            </ToggleSection>
          </div>

          {selectedArrCat1 && (
            <div className="middle">
              <ToggleSection
                title="도착 세부 역 선택"
                isOpen={isArrCat2Open}
                onToggle={toggleArrCat2}
              >
                {isArrCat2Open && (
                  <div className="buttons">
                    {getCat2List(selectedArrCat1).map((cat2) => (
                      <Button
                        key={cat2.cat2}
                        onClick={() => setSelectedArrCat2(cat2.cat2)}
                        className={
                          selectedArrCat2 === cat2.cat2 ? "selected" : ""
                        }
                      >
                        {cat2.cat2}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}


          {selectedDepCat2 && selectedArrCat2 && (
            <div className="category">
              <ToggleSection
                title="열차 종류 선택"
                isOpen={isVehicleOpen}
                onToggle={toggleVehicle}
              >
                {isVehicleOpen && (
                  <div className="buttons">
                    {Vehiclekind.map((vehicle) => (
                      <Button
                        key={vehicle.VehicleKindCode}
                        onClick={() => {
                          setSelectedVehicle((prev) => {
                            // '전체' 선택 시 모든 선택 해제하고 '전체'만 선택
                            if (vehicle.VehicleKindCode === "") {
                              return [""];
                            }
                            // '전체'가 선택된 상태에서 특정 열차 선택 시 '전체' 제거
                            if (prev.includes("")) {
                              return [vehicle.VehicleKindCode];
                            }
                            // 이미 선택된 경우 해제
                            if (prev.includes(vehicle.VehicleKindCode)) {
                              return prev.filter(
                                (code) => code !== vehicle.VehicleKindCode
                              );
                            }
                            // 선택 추가
                            return [...prev, vehicle.VehicleKindCode];
                          });
                        }}
                        className={
                          selectedVehicle.includes(vehicle.VehicleKindCode)
                            ? "selected"
                            : ""
                        }
                      >
                        {vehicle.VehicleKindName}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}

          <div>
            <Button onClick={fetchSchedule} disabled={loading}>
              {loading ? "로딩 중..." : "조회"}
              <FaSearch style={{ marginLeft: "6px" }} />
            </Button>
          </div>
        </SelectTourItem>

        <div className="tour-list">
          <h3>KTX 조회</h3>
          <div className="totalCount">총 {displayedSchedule.length.toLocaleString()}건</div>
          {loading && (
            <Loading>
              <p>목록을 불러오는 중 입니다.</p>
            </Loading>
          )}
          {error && <div>{error}</div>}
          {!loading && !error && (
            <>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(schedule.length / itemsPerPage)}
                    handlePageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </List>
    </>
  );
};

export default KtxInquiry;
