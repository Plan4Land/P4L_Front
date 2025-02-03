import React, { useState, useCallback, useEffect } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Button, ToggleSection } from "../../Component/ButtonComponent";
import {
  Table,
  SelectTourItem,
  SearchSt,
  List,
  FilterButton,
  LoadBox,
} from "../../Style/ItemListStyled";
import { FaUndo, FaSearch } from "react-icons/fa";
import { Pagination } from "../../Component/Pagination";
import { InterCityService } from "../../Util/Service_InterCityBus_code";
import { InterCityGradeService } from "../../Util/Service_InterCityGrade_code";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Loading } from "../../Component/LoadingComponent";

const IntercityBus = () => {
  const [schedule, setSchedule] = useState([]);
  const [displayedSchedule, setDisplayedSchedule] = useState([]);
  const [selectedDepCat1, setSelectedDepCat1] = useState("");
  const [selectedDepCat2, setSelectedDepCat2] = useState("");
  const [selectedArrCat1, setSelectedArrCat1] = useState("");
  const [selectedArrCat2, setSelectedArrCat2] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBusGrade, setSelectedBusGrade] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [error, setError] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isDepTimeOpen, setIsDepTimeOpen] = useState(true); // 출발 시간 선택 섹션 상태
  const [selectedDepTime, setSelectedDepTime] = useState(""); // 선택된 출발 시간 상태

  const [isDepCat1Open, setIsDepCat1Open] = useState(true);
  const [isDepCat2Open, setIsDepCat2Open] = useState(true);
  const [isArrCat1Open, setIsArrCat1Open] = useState(true);
  const [isArrCat2Open, setIsArrCat2Open] = useState(true);
  const [isGradeOpen, setIsGradeOpen] = useState(true);

  const itemsPerPage = 25;

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

  const fetchSchedule = useCallback(async () => {
    if (!date || !selectedDepCat2 || !selectedArrCat2) {
      alert("대분류, 중분류는 모두 선택해주세요!");
      return;
    }

    const selectedDepTerminal = InterCityService.flatMap(
      (cat1) => cat1.cat2List
    ).find((cat2) => cat2.cat2 === selectedDepCat2);

    const selectedArrTerminal = InterCityService.flatMap(
      (cat1) => cat1.cat2List
    ).find((cat2) => cat2.cat2 === selectedArrCat2);

    if (!selectedDepTerminal || !selectedArrTerminal) {
      alert("선택한 역에 대한 데이터를 찾을 수 없습니다.");
      return;
    }

    const depTerminalId = selectedDepTerminal.cat2Code;
    const arrTerminalId = selectedArrTerminal.cat2Code;

    const formattedDate = date.replace(/-/g, "");

    const params = {
      serviceKey:
        "BaAcBeQKCSysvfPe3OYNj5RZR2Ndak1B6nK/pNi+AWPXoWb9ERyK++Iih8TqfSog2L4NtpXRGXOUouQhD+cigw==",
      depTerminalId: depTerminalId,
      arrTerminalId: arrTerminalId,
      depPlandTime: formattedDate,
      numOfRows: 100,
      pageNo: 1,
    };

    const url =
      "http://apis.data.go.kr/1613000/SuburbsBusInfoService/getStrtpntAlocFndSuberbsBusInfo";

    setLoading(true);
    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      const textData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textData, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");

      if (items.length > 0) {
        const schedules = Array.from(items).map((item) => {
          const formatTime = (timeStr) => {
            const hour = timeStr.substring(8, 10);
            const minute = timeStr.substring(10, 12);
            return `${hour}:${minute}`;
          };

          return {
            depStation:
              item.getElementsByTagName("depPlaceNm")[0]?.textContent || "",
            arrStation:
              item.getElementsByTagName("arrPlaceNm")[0]?.textContent || "",
            depTime: formatTime(
              item.getElementsByTagName("depPlandTime")[0]?.textContent || ""
            ),
            arrTime: formatTime(
              item.getElementsByTagName("arrPlandTime")[0]?.textContent || ""
            ),
            busGrade:
              item.getElementsByTagName("gradeNm")[0]?.textContent || "",
            charge: item.getElementsByTagName("charge")[0]?.textContent || "",
          };
        });

        const filteredSchedules = selectedDepTime
        ? schedules.filter((schedule) => schedule.depTime >= selectedDepTime)
        : schedules;

        setSchedule(filteredSchedules);
        setCurrentPage(0);
      } else {
        alert("조회된 시외버스 시간이 없습니다.");
      }
    } catch (error) {
      console.error("시외버스 조회 오류:", error);
      alert("시외버스 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [date, selectedDepCat2, selectedArrCat2, selectedDepTime]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleResetSelections = () => {
    setSelectedDepCat1("");
    setSelectedDepCat2("");
    setSelectedArrCat1("");
    setSelectedArrCat2("");
    setDate("");
    setSchedule([]);
    setCurrentPage(0);
    setSelectedDepTime("");
  };

  const getCat2List = (selectedCat1) => {
    return (
      InterCityService.find((cat1) => cat1.cat1 === selectedCat1)?.cat2List ||
      []
    );
  };

  const handleToggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const generateTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, "0");
      times.push(`${hour}:00`);
    }
    return times;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const toggleDepTime = () => setIsDepTimeOpen((prev) => !prev);
  const toggleDepCat1 = () => setIsDepCat1Open(!isDepCat1Open);
  const toggleDepCat2 = () => setIsDepCat2Open((prev) => !prev);
  const toggleArrCat1 = () => setIsArrCat1Open(!isArrCat1Open);
  const toggleArrCat2 = () => setIsArrCat2Open((prev) => !prev);
  const toggleGrade = () => setIsGradeOpen((prev) => !prev);

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
              title="출발 시간 선택"
              isOpen={isDepTimeOpen}
              onToggle={toggleDepTime}
            >
              {isDepTimeOpen && (
                <div className="buttons">
                  {generateTimes().map((time) => (
                    <Button
                      key={`dep-time-${time}`}
                      onClick={() => setSelectedDepTime(time)}
                      className={selectedDepTime === time ? "selected" : ""}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}
            </ToggleSection>
          </div>

          <div className="mainarea">
            <ToggleSection
              title="출발 지역 선택"
              isOpen={{isDepCat1Open} }
              onToggle={toggleDepCat1}
            >
              {isDepCat1Open && (
                <div className="buttons">
                  {InterCityService.map((cat1) => (
                    <Button
                      key={`dep-cat1-${cat1.cat1}`}
                      onClick={() => {
                        setSelectedDepCat1(cat1.cat1);
                        setSelectedDepCat2("");
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
                title="출발 세부 지역 선택"
                isOpen={isDepCat2Open}
                onToggle={toggleDepCat2}
              >
                {isDepCat2Open && (
                  <div className="buttons">
                    {getCat2List(selectedDepCat1).map((cat2) => (
                      <Button
                        key={`dep-cat2-${cat2.cat2Code}`}
                        onClick={() => {
                          setSelectedDepCat2(cat2.cat2);
                        }}
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
              title="도착 지역 선택"
              isOpen={isArrCat1Open}
              onToggle={toggleArrCat1}
            >
              {isArrCat1Open && (
                <div className="buttons">
                  {InterCityService.map((cat1) => (
                    <Button
                      key={`dep-cat1-${cat1.cat1}`}
                      onClick={() => {
                        setSelectedArrCat1(cat1.cat1);
                        setSelectedArrCat2("");
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
                title="도착 세부 지역 선택"
                isOpen={isArrCat2Open}
                onToggle={toggleArrCat2}
              >
                {isArrCat2Open && (
                  <div className="buttons">
                    {getCat2List(selectedArrCat1).map((cat2) => (
                      <Button
                        key={`dep-cat2-${cat2.cat2Code}`}
                        onClick={() => {
                          setSelectedArrCat2(cat2.cat2);
                        }}
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
                title="버스 종류 선택"
                isOpen={isGradeOpen} 
                onToggle={toggleGrade}
              >
                {isGradeOpen && (
                  <div className="buttons">
                    {InterCityGradeService.map((grade) => (
                      <Button
                        key={grade.GradeId}
                        onClick={() => {
                          setSelectedBusGrade((prev) => {
                            if (grade.GradeId === "") {
                              return [""];
                            }
                            if (prev.includes("")) {
                              return [grade.GradeId];
                            }
                            if (prev.includes(grade.GradeId)) {
                              return prev.filter((id) => id !== grade.GradeId);
                            }
                            return [...prev, grade.GradeId];
                          });
                        }}
                        className={selectedBusGrade.includes(grade.GradeId) ? "selected" : ""}
                      >
                        {grade.GradeNm}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}

          <LoadBox>
            <Button className="load" onClick={fetchSchedule} disabled={loading}>
              {loading ? "로딩 중..." : "조회"}
              <FaSearch style={{ marginLeft: "6px" }} />
            </Button>
          </LoadBox>
        </SelectTourItem>

        <div className="tour-list">
          <h3>시외버스 조회</h3>
          <div className="totalCount">총 {schedule.length.toLocaleString()}건</div>
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
                      <th>출발지</th>
                      <th>도착지</th>
                      <th>출발시간</th>
                      <th>도착시간</th>
                      <th>버스등급</th>
                      <th>요금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedSchedule.map((bus, index) => (
                      <tr key={index}>
                        <td>{bus.depStation}</td>
                        <td>{bus.arrStation}</td>
                        <td>{bus.depTime}</td>
                        <td>{bus.arrTime}</td>
                        <td>{bus.busGrade}</td>
                        <td>{bus.charge}</td>
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

export default IntercityBus;
