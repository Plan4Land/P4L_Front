import React, { useState, useCallback, useEffect } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Button, ToggleSection} from "../../Component/ButtonComponent";
import {
  Table,
  SelectTourItem,
  SearchSt,
  List,
  FilterButton,
  LoadBox
} from "../../Style/ItemListStyled";
import { FaUndo, FaSearch } from "react-icons/fa";
import { Pagination } from "../../Component/Pagination";
import { ExpressServiceCode } from "../../Util/Service_Express_code";
import { ExpressGradeService } from "../../Util/Service_ExpressGrade_code";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Loading } from "../../Component/LoadingComponent";

const ExpressBus = () => {
  const [schedule, setSchedule] = useState([]);
  const [displayedSchedule, setDisplayedSchedule] = useState([]);
  const [selectedDepCat1, setSelectedDepCat1] = useState("");
  const [selectedDepCat2, setSelectedDepCat2] = useState("");
  const [selectedDepCat3, setSelectedDepCat3] = useState("");
  const [selectedArrCat1, setSelectedArrCat1] = useState("");
  const [selectedArrCat2, setSelectedArrCat2] = useState("");
  const [selectedArrCat3, setSelectedArrCat3] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBusGrade, setSelectedBusGrade] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [error, setError] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [isDepCat1Open, setIsDepCat1Open] = useState(true);
  const [isDepCat2Open, setIsDepCat2Open] = useState(true);
  const [isDepCat3Open, setIsDepCat3Open] = useState(true);
  const [isArrCat1Open, setIsArrCat1Open] = useState(true);
  const [isArrCat2Open, setIsArrCat2Open] = useState(true);
  const [isArrCat3Open, setIsArrCat3Open] = useState(true);
  const [isGradeOpen, setIsGradeOpen] = useState(true);

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

  const fetchSchedule = useCallback(async () => {
    if (!date || !selectedDepCat2 || !selectedArrCat2) {
      alert("대분류, 중분류는 모두 선택해주세요!");
      return;
    }

    // 출발지 터미널 찾기
    const selectedDepTerminal =
      ExpressServiceCode.flatMap((cat1) => cat1.cat2List)
        .flatMap((cat2) => cat2.cat3List)
        .find(
          (station) =>
            station?.cat3Code === selectedDepCat3 ||
            station?.cat2 === selectedDepCat2
        ) ||
      ExpressServiceCode.flatMap((cat1) => cat1.cat2List).find(
        (cat2) => cat2.cat2 === selectedDepCat2
      );

    // 도착지 터미널 찾기
    const selectedArrTerminal = selectedArrCat3
      ? ExpressServiceCode.flatMap((cat1) => cat1.cat2List)
          .flatMap((cat2) => cat2.cat3List)
          .find((station) => station?.cat3Code === selectedArrCat3)
      : ExpressServiceCode.flatMap((cat1) => cat1.cat2List).find(
          (cat2) => cat2.cat2 === selectedArrCat2
        );

    if (!selectedDepTerminal || !selectedArrTerminal) {
      alert("선택한 역에 대한 데이터를 찾을 수 없습니다.");
      return;
    }

    const depTerminalId =
      selectedDepTerminal.cat3Code || selectedDepTerminal.cat2Code;
    const arrTerminalId =
      selectedArrTerminal.cat3Code || selectedArrTerminal.cat2Code;

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
      "http://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo";

    console.log("출발 터미널 ID:", depTerminalId);
    console.log("도착 터미널 ID:", arrTerminalId);
    console.log("API 요청 파라미터:", params);
    console.log("API 요청 URL:", `${url}?${new URLSearchParams(params)}`);

    setLoading(true);
    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      console.log("API 응답 상태:", response.status);
      const textData = await response.text();
      console.log("XML 응답 데이터:", textData);

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
        setSchedule(schedules);
        setCurrentPage(0);
      } else {
        alert("조회된 고속버스 시간이 없습니다.");
      }
    } catch (error) {
      console.error("고속버스 조회 오류:", error);
      alert("고속버스 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [
    date,
    selectedDepCat2,
    selectedDepCat3,
    selectedArrCat2,
    selectedArrCat3,
  ]);

  const isMetropolitanCity = (cityName) => {
    const metropolitanCities = [
      "서울특별시",
      "인천광역시",
      "세종특별시",
      "대구광역시",
      "부산광역시",
      "울산광역시",
      "광주광역시",
    ];
    return metropolitanCities.includes(cityName);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleResetSelections = () => {
    setSelectedDepCat1("");
    setSelectedDepCat2("");
    setSelectedDepCat3("");
    setSelectedArrCat1("");
    setSelectedArrCat2("");
    setSelectedArrCat3("");
    setDate("");
    setSchedule([]);
    setCurrentPage(0);
    console.log("초기화됨");
  };

  const getCat2List = (selectedCat1) => {
    return (
      ExpressServiceCode.find((cat1) => cat1.cat1 === selectedCat1)?.cat2List ||
      []
    );
  };

  const getCat3List = (selectedCat2) => {
    if (isMetropolitanCity(selectedCat2)) {
      return [];
    }
    return selectedCat2?.cat3List || [];
  };

  const handleToggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const toggleDepCat1 = () => setIsDepCat1Open(!isDepCat1Open);
  const toggleDepCat2 = () => setIsDepCat2Open((prev) => !prev);
  const toggleDepCat3 = () => setIsDepCat3Open((prev) => !prev);
  const toggleArrCat1 = () => setIsArrCat1Open(!isArrCat1Open);
  const toggleArrCat2 = () => setIsArrCat2Open((prev) => !prev);
  const toggleArrCat3 = () => setIsArrCat3Open((prev) => !prev);
  const toggleGrade = () => setIsGradeOpen((prev) => !prev);

  return (
    <>
      {/* <Header /> */}
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
              title="출발 지역 선택"
              isOpen={{isDepCat1Open} }
              onToggle={toggleDepCat1}
            >
              {isDepCat1Open && (
                <div className="buttons">
                  {ExpressServiceCode.map((cat1) => (
                    <Button
                      key={`dep-cat1-${cat1.cat1}`}
                      onClick={() => {
                        setSelectedDepCat1(cat1.cat1);
                        setSelectedDepCat2("");
                        setSelectedDepCat3("");
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
                          setSelectedDepCat3("");
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

          {selectedDepCat2 && !isMetropolitanCity(selectedDepCat1) && (
            <div className="top">
              <ToggleSection
                title="출발 터미널 선택"
                isOpen={isArrCat1Open}
                onToggle={toggleArrCat1}
              >
                {isDepCat3Open && (
                  <div className="buttons">
                    {getCat3List(
                      getCat2List(selectedDepCat1).find(
                        (cat2) => cat2.cat2 === selectedDepCat2
                      )
                    ).map((cat3) => (
                      <Button
                        key={`dep-cat3-${cat3.cat3Code}`}
                        onClick={() => setSelectedDepCat3(cat3.cat3Code)}
                        className={
                          selectedDepCat3 === cat3.cat3Code ? "selected" : ""
                        }
                      >
                        {cat3.cat3}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}

          {/* 도착지 설정 */}
          <div className="middle">
            <ToggleSection
                title="도착 지역 선택"
                isOpen={isDepCat3Open}
                onToggle={toggleDepCat3}
            >
              {isArrCat1Open && (
                <div className="buttons">
                  {ExpressServiceCode.map((cat1) => (
                    <Button
                      key={`dep-cat1-${cat1.cat1}`}
                      onClick={() => {
                        setSelectedArrCat1(cat1.cat1);
                        setSelectedArrCat2("");
                        setSelectedArrCat3("");
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
            <div className="bottom">
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
                          setSelectedArrCat3("");
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

          {selectedArrCat2 && !isMetropolitanCity(selectedArrCat1) && (
            <div className="subcategoryarea">
              <ToggleSection
                title="도착 터미널 선택"
                isOpen={isArrCat3Open}
                onToggle={toggleArrCat3}
              >
                {isArrCat2Open && (
                  <div>
                    {getCat3List(
                      getCat2List(selectedArrCat1).find(
                        (cat2) => cat2.cat2 === selectedArrCat2
                      )
                    ).map((cat3) => (
                      <Button
                        key={`arr-cat3-${cat3.cat3Code}`}
                        onClick={() => setSelectedArrCat3(cat3.cat3Code)}
                        className={
                          selectedArrCat3 === cat3.cat3Code ? "selected" : ""
                        }
                      >
                        {cat3.cat3}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection> 
            </div>
          )}

          {(selectedDepCat2 || selectedDepCat3) && selectedArrCat1 && selectedArrCat2 && (
            <div className="category">
              <ToggleSection
                title="버스 종류 선택"
                isOpen={isGradeOpen}
                onToggle={toggleGrade}
              >
                {isGradeOpen && (
                  <div className="buttons">
                    {ExpressGradeService.map((grade) => (
                      <Button
                        key={grade.GradeId}
                        onClick={() => {
                          setSelectedBusGrade((prev) => {
                            if (grade.GradeId === '') {
                              return [''];
                            }
                            if (prev.includes('')) {
                              return [grade.GradeId];
                            }
                            if (prev.includes(grade.GradeId)) {
                              return prev.filter((id) => id !== grade.GradeId);
                            }
                            return [...prev, grade.GradeId];
                          });
                        }}
                        className={selectedBusGrade.includes(grade.GradeId) ? 'selected' : ''}
                      >
                        {grade.GradeNm}
                      </Button>
                    ))}
                  </div>
                )}
              </ToggleSection>
            </div>
          )}
          {(selectedBusGrade || selectedBusGrade === "") && (
            <LoadBox>
              <Button className="load" onClick={fetchSchedule} disabled={loading}>
                {loading ? "로딩 중..." : "조회"}
                <FaSearch style={{ marginLeft: "6px" }} />
              </Button>
            </LoadBox>
          )}
        </SelectTourItem>

        <div className="tour-list">
          <h3>고속버스 조회</h3>
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

export default ExpressBus;
