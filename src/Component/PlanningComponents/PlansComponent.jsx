import {
  MainPlanning,
  DayToggleContainer,
  DatePickerContainer,
} from "../../Style/PlanningStyled";
import { colors } from "../../Style/GlobalStyle";
import { themes, areas } from "../../Util/Common";
import { ProfileImg } from "../PictureCommponent";
import { PictureComponent } from "../PictureCommponent";
import { Upload } from "../FirebaseUpload";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { FaPenToSquare } from "react-icons/fa6";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const PlannerInfoEditComponent = ({
  ws,
  socketConnected,
  plannerInfo,
  editPlannerInfo,
  setEditPlannerInfo,
  selectedThemes,
  setSelectedThemes,
  isEditting,
  plans,
  plannerId,
  sender,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(plannerInfo.title);
  const [editArea, setEditArea] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [currentPic, setCurrentPic] = useState(plannerInfo?.thumbnail);
  const { user } = useAuth();

  useEffect(() => {
    if (plannerInfo.area) {
      const area = areas.find((area) => area.code === plannerInfo.area);
      if (area) {
        setSelectedArea(area.name);

        // 세부 지역 처리
        const subArea = area.subAreas.find(
          (subArea) => subArea.code === plannerInfo.subArea
        );
        if (subArea) {
          setSelectedSubArea(subArea.name);
        }
      }
    }
  }, []);

  const handleInfoInputChange = (e) => {
    // const byteLength = new TextEncoder().encode(e.target.value).length;

    // // 한글 기준 20글자 제한 (20자 * 2바이트 = 40바이트 이하)
    // if (byteLength <= 40) {
    //   setTitle(e.target.value);
    // }
    if (e.target.value.length <= 20) {
      setTitle(e.target.value);
    }
  };

  const handleSaveTitle = () => {
    setEditPlannerInfo((prev) => ({
      ...prev,
      title: title,
    }));
    setEditTitle(!editTitle);
  };

  const handleSaveArea = () => {
    const areaCode = areas.find((area) => area.name === selectedArea)?.code;
    const subAreaCode = areas
      .find((area) => area.name === selectedArea)
      ?.subAreas.find((subArea) => subArea.name === selectedSubArea)?.code;

    setEditPlannerInfo((prev) => ({
      ...prev,
      area: areaCode,
      subArea: subAreaCode,
    }));
    setEditArea(!editArea);
  };

  const handleAreaChange = (e) => {
    const selected = e.target.value;
    setSelectedArea(selected);
    setSelectedSubArea(""); // 지역 변경 시 세부 지역 초기화
  };
  const selectedAreaData = areas.find((area) => area.name === selectedArea);

  const handleThemeClick = (theme) => {
    if (selectedThemes.includes(theme)) {
      // Remove theme from selection
      const updatedThemes = selectedThemes.filter((t) => t !== theme);
      setSelectedThemes(updatedThemes);
      setEditPlannerInfo((prev) => ({
        ...prev,
        theme: updatedThemes.join(", "),
      }));
    } else if (selectedThemes.length < 3) {
      // Add theme to selection
      const updatedThemes = [...selectedThemes, theme];
      setSelectedThemes(updatedThemes);
      setEditPlannerInfo((prev) => ({
        ...prev,
        theme: updatedThemes.join(", "),
      }));
    }
  };

  const handleStartDateChange = (date) => {
    setEditPlannerInfo((prev) => ({
      ...prev,
      startDate: date,
    }));
    if (editPlannerInfo.endDate && date > new Date(editPlannerInfo.endDate)) {
      setEditPlannerInfo((prev) => ({
        ...prev,
        endDate: date,
      }));
    }
  };

  useEffect(() => {
    if (socketConnected && editPlannerInfo) {
      const message = {
        type: "PLANNER",
        plannerId: plannerId,
        sender: sender,
        data: {
          plannerInfo: [editPlannerInfo],
          plans: plans,
          isEditting: isEditting,
        },
      };
      ws.current.send(JSON.stringify(message));
      console.log("여기서 보냄", message);
    }
  }, [editPlannerInfo]);

  useEffect(() => {
    const uploadImg = async () => {
      try {
        const updatedPic = await Upload({
          currentPic,
          type: "planner",
          userId: user.id,
        });

        setEditPlannerInfo((prev) => ({
          ...prev,
          thumbnail: updatedPic,
        }));
      } catch (error) {
        console.error("이미지 업로드 중 에러 발생:", error);
      }
    };

    if (currentPic) {
      uploadImg(); // 비동기 함수 호출
    }
  }, [currentPic]);

  return (
    <>
      <div className="planner-thumbnail">
        {/* <ProfileImg
          // file={`/img/${plannerInfo.thumbnail}`}
          file={currentPic}
        /> */}
        <PictureComponent
          currentPic={currentPic}
          setCurrentPic={setCurrentPic}
          role={"ROLE_MEMBERSHIP"}
          type={"planner"}
          width={"200px"}
          height={"200px"}
        />
      </div>
      <div className="edit-box">
        <div className="editTitle">
          <input
            type="text"
            name="title"
            className="planner-edit-title"
            value={title}
            onChange={handleInfoInputChange}
            disabled={!editTitle}
          />
          {editTitle ? (
            <button className="edit-button" onClick={() => handleSaveTitle()}>
              수정 완료
            </button>
          ) : (
            <button
              className="edit-button"
              onClick={() => setEditTitle(!editTitle)}
            >
              제목 수정
            </button>
          )}
        </div>
        <div className="edit-area">
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="location-select"
            disabled={!editArea}
          >
            <option value="">지역을 선택하세요</option>
            {areas.map((area) => (
              <option key={area.name} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
          {selectedAreaData && (
            <select
              value={selectedSubArea}
              onChange={(e) => setSelectedSubArea(e.target.value)}
              className="location-select"
              disabled={!editArea}
            >
              <option value="">세부 지역을 선택하세요</option>
              {selectedAreaData.subAreas.map((subArea) => (
                <option key={subArea.code} value={subArea.name}>
                  {subArea.name}
                </option>
              ))}
            </select>
          )}

          {editArea ? (
            <button className="edit-button" onClick={() => handleSaveArea()}>
              수정 완료
            </button>
          ) : (
            <button
              className="edit-button"
              onClick={() => setEditArea(!editArea)}
            >
              지역 수정
            </button>
          )}
        </div>
        <div className="theme-buttons">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeClick(theme)}
              className={`theme-button ${
                selectedThemes.includes(theme) ? "selected" : ""
              }`}
              disabled={
                selectedThemes.length >= 3 && !selectedThemes.includes(theme)
              }
            >
              {theme}
            </button>
          ))}
        </div>
        <div>
          <DatePickerContainer>
            <DatePicker
              className="input-date-picker"
              locale={ko}
              dateFormat="yyyy-MM-dd"
              dateFormatCalendar="yyyy년 MM월"
              timeCaption="시간"
              selected={new Date(editPlannerInfo.startDate)}
              onChange={handleStartDateChange}
              selectsStart
              startDate={new Date(editPlannerInfo.startDate)}
              endDate={new Date(editPlannerInfo.endDate)}
              minDate={new Date()}
              placeholderText="시작일 선택"
            />
            <span>~</span>
            {editPlannerInfo.startDate ? (
              <DatePicker
                className="input-date-picker"
                locale={ko}
                dateFormat="yyyy-MM-dd"
                dateFormatCalendar="yyyy년 MM월"
                timeCaption="시간"
                selected={new Date(editPlannerInfo.endDate)}
                onChange={(date) =>
                  setEditPlannerInfo((prev) => ({
                    ...prev,
                    endDate: date,
                  }))
                }
                selectsEnd
                startDate={new Date(editPlannerInfo.startDate)}
                endDate={new Date(editPlannerInfo.endDate)}
                minDate={new Date(editPlannerInfo.startDate)}
                placeholderText="종료일 선택"
              />
            ) : (
              <input className="input-date-picker" placeholder="종료일 선택" />
            )}
          </DatePickerContainer>
        </div>
      </div>
    </>
  );
};

export const PlansComponent = ({
  socketConnected,
  ws,
  plannerId,
  sender,
  travelInfo,
  setTravelInfo,
  groupPlans,
  setGroupPlans,
  setSelectedPlan,
  setCurrentAddedPlace,
  memoState,
  setMemoState,
  plans,
  editPlans,
  setEditPlans,
  plannerInfo,
  editPlannerInfo,
  setModals,
  isEditting,
  editor,
}) => {
  const { user } = useAuth();
  const toggleDay = (index, date) => {
    setTravelInfo((prev) => {
      const newDayToggle = prev.dayToggle.map((toggle, i) =>
        i === index ? !toggle : toggle
      );

      // 열림 상태일 때만 clickedDate 업데이트
      const newClickedDate = newDayToggle[index] ? date : prev.clickedDate;

      return {
        ...prev,
        arrowDirections: prev.arrowDirections.map((dir, i) =>
          i === index ? (dir === "▼" ? "▲" : "▼") : dir
        ),
        dayToggle: newDayToggle,
        clickedDate: newClickedDate, // 새로운 clickedDate 설정
      };
    });
  };

  // 클릭한 메모 열기
  const handleMemoClick = (e, date, planIndex, plan) => {
    setMemoState((prevState) => ({
      ...prevState,
      isClicked: {
        ...prevState.isClicked,
        [date]: {
          ...prevState.isClicked[date],
          [planIndex]: !prevState.isClicked[date]?.[planIndex],
        },
      },
      updatedMemo: plan.memo ? plan.memo + "\n" : "",
      isOpened: !prevState.isOpened,
    }));
    setSelectedPlan({ date, planIndex, plan });
  };

  const updateMemo = (date, planIndex, updatedMemo) => {
    setGroupPlans((prevPlans) => ({
      ...prevPlans,
      [date]: prevPlans[date].map((plan, idx) =>
        idx === planIndex ? { ...plan, memo: updatedMemo } : plan
      ),
    }));
  };

  const insertText = (newText, date, planIndex) => {
    setMemoState((prev) => ({ ...prev, updatedMemo: newText }));
    updateMemo(date, planIndex, newText);
  };

  useEffect(() => {
    setTravelInfo((prev) => ({
      ...prev,
      arrowDirections: Array(travelInfo.days).fill("▼"),
      dayToggle: Array(travelInfo.days).fill(false),
    }));
    setMemoState((prev) => ({
      ...prev,
      isClicked: Array(travelInfo.days).fill(false),
      isOpened: false,
    }));
  }, [travelInfo.days]);

  useEffect(() => {
    const currentPlannerInfo = editPlannerInfo || plannerInfo;
    const currentPlans = editPlans || plans;
    if (editPlans) {
      console.log("editPlans가 선택됨");
    } else if (plans) {
      console.log("plans가 선택됨");
    }
    if (editPlannerInfo) {
      console.log("editPlannerInfo 선택됨");
    } else if (plannerInfo) {
      console.log("plannerInfo 선택됨");
    }
    const startDate = new Date(currentPlannerInfo.startDate);
    const endDate = new Date(currentPlannerInfo.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const diffInDays = timeDiff / (1000 * 3600 * 24);

    setTravelInfo((prevState) => ({
      ...prevState,
      days: diffInDays + 1, // 여행 기간 설정
    }));

    const generateTravelDates = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);
      let lastDate = new Date(end);
      currentDate.setHours(10, 0, 0, 0);
      lastDate.setHours(10, 0, 0, 0);

      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]); // YYYY-MM-DD 포맷
        currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
      }
      return dates;
    };

    const travelDates = generateTravelDates(
      currentPlannerInfo.startDate,
      currentPlannerInfo.endDate
    );

    setTravelInfo((prevState) => ({
      ...prevState,
      dates: travelDates, // 여행 날짜 설정
    }));

    const groupPlansByDate = () => {
      // 1. 날짜별로 그룹화
      const groupedPlans = currentPlans.reduce((acc, plan) => {
        const dateKey = plan.date.split("T")[0]; // "2025-01-10" 형태로 날짜만 추출
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        if (!plan.seq) {
          const maxSeq =
            acc[dateKey].length > 0
              ? Math.max(...acc[dateKey].map((p) => p.seq || 0)) // seq가 없는 경우 기본값 0
              : 0;
          plan.seq = maxSeq + 1;
        }
        acc[dateKey].push(plan);
        return acc;
      }, {});

      // 2. 각 날짜 그룹 내에서 seq 순으로 정렬
      Object.keys(groupedPlans).forEach((date) => {
        groupedPlans[date].sort((a, b) => a.seq - b.seq);

        // 3. seq를 1부터 다시 채우기
        groupedPlans[date].forEach((plan, index) => {
          plan.seq = index + 1; // 1부터 시작하는 새로운 seq 부여
        });
      });
      return groupedPlans;
    };

    const groupedPlans = groupPlansByDate();
    // console.log("groupedPlans : ", groupedPlans);
    setGroupPlans(groupedPlans); // 정렬된 일정
  }, [editPlannerInfo, editPlans, plannerInfo, plans]);

  const handleDeletePlan = (plan) => {
    setEditPlans((prev) => prev.filter((p) => !(p === plan)));
  };

  const handleSwapSeq = (planSeq, direction, date) => {
    // editPlans에서 해당 날짜의 플랜들만 가져오기
    const plansForDate = editPlans.filter(
      (plan) => plan.date.split("T")[0] === date
    );
    plansForDate.sort((a, b) => a.seq - b.seq);

    // 해당 날짜의 플랜에서 planId에 해당하는 플랜의 인덱스 찾기
    const planIndex = plansForDate.findIndex((plan) => plan.seq === planSeq);

    // 해당 planId가 존재하지 않으면 종료
    if (planIndex === -1) return;

    // seq 교환
    if (direction === "up" && planIndex > 0) {
      // 앞의 요소와 seq 교환
      const temp = plansForDate[planIndex].seq;
      plansForDate[planIndex].seq = plansForDate[planIndex - 1].seq;
      plansForDate[planIndex - 1].seq = temp;
    } else if (direction === "down" && planIndex < plansForDate.length - 1) {
      // 뒤의 요소와 seq 교환
      const temp = plansForDate[planIndex].seq;
      plansForDate[planIndex].seq = plansForDate[planIndex + 1].seq;
      console.log(plansForDate[planIndex].seq);
      plansForDate[planIndex + 1].seq = temp;
    }

    // 기존의 editPlans에서 해당 date를 제외한 다른 날짜의 플랜들
    const otherPlans = editPlans.filter(
      (plan) => plan.date.split("T")[0] !== date
    );

    // 수정된 plansForDate와 otherPlans 합치기
    const updatedPlans = [...otherPlans, ...plansForDate];

    // 새로운 상태로 업데이트
    setEditPlans(updatedPlans);
  };

  useEffect(() => {
    if (socketConnected && editPlans && editor === sender) {
      const message = {
        type: "PLANNER",
        plannerId: plannerId,
        sender: sender,
        data: {
          plannerInfo: [editPlannerInfo],
          plans: editPlans,
          isEditting: isEditting,
        },
      };
      ws.current.send(JSON.stringify(message));
      console.log("PlansComponent에서 보냄", message);
    }
  }, [editPlans]);

  return (
    <MainPlanning>
      {travelInfo.dates.map((date, index) => (
        <div key={index}>
          <div
            className="planning-day"
            onClick={() => {
              toggleDay(index, date);
              console.log(travelInfo);
            }}
          >
            <span>{index + 1}일차</span>&nbsp;&nbsp;/&nbsp;&nbsp;
            <span>{date}</span>
            <span className="arrow">{travelInfo.arrowDirections[index]}</span>
          </div>
          {travelInfo.dayToggle[index] && (
            <DayToggleContainer>
              {groupPlans[date] && groupPlans[date].length > 0 ? (
                groupPlans[date].map((plan, planIndex) => (
                  <div
                    key={`${date}-${planIndex}`}
                    className="plan-place-container"
                  >
                    <div className="plan-place">
                      {isEditting && editor === user.nickname ? (
                        <div
                          className="seq-num-container delete-btn"
                          onClick={() => {
                            handleDeletePlan(plan);
                          }}
                        >
                          X
                        </div>
                      ) : (
                        <div className="seq-num-container seq-div">
                          {plan.seq}
                        </div>
                      )}
                      <p className="place-name">
                        {plan.spotName || plan.content}
                      </p>
                      <p className="place-category">{plan.category}</p>
                    </div>
                    <div className="memo-container">
                      {isEditting && editor === user.nickname && (
                        <div className="seq-change">
                          {planIndex > 0 && ( // 첫 번째 요소가 아닐 때만 위쪽 화살표 버튼 표시
                            <IoMdArrowDropup
                              className="seq-button"
                              onClick={() =>
                                handleSwapSeq(plan.seq, "up", date)
                              } // up 아이콘 클릭 시
                            />
                          )}
                          {planIndex < groupPlans[date].length - 1 && ( // 마지막 요소가 아닐 때만 아래쪽 화살표 버튼 표시
                            <IoMdArrowDropdown
                              className="seq-button"
                              onClick={() =>
                                handleSwapSeq(plan.seq, "down", date)
                              } // down 아이콘 클릭 시
                            />
                          )}
                        </div>
                      )}
                      <FaPenToSquare
                        className="memo-icon"
                        style={{
                          cursor: memoState.isOpened ? "default" : "pointer",
                          color: memoState.isOpened ? "gray" : "black",
                        }}
                        onClick={(e) => {
                          if (memoState.isOpened) {
                            return;
                          }
                          setSelectedPlan({ date, planIndex, plan });
                          handleMemoClick(e, date, planIndex, plan);
                          e.stopPropagation();
                        }}
                      />
                      {memoState.isClicked[date]?.[planIndex] && (
                        <div className="memo-input">
                          <textarea
                            id="memo"
                            value={memoState.updatedMemo}
                            onChange={(e) =>
                              insertText(e.target.value, date, planIndex)
                            }
                            onClick={(e) => {
                              if (memoState.isOpened) {
                                e.stopPropagation();
                                return;
                              }
                            }}
                            disabled={!isEditting || editor !== user?.nickname}
                            className={
                              !isEditting || editor !== user?.nickname
                                ? "textarea-disabled"
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-plans">일정이 없습니다.</p>
              )}
              {isEditting && editor === user.nickname && (
                <button
                  className="add-place-button"
                  margin="1.5% 0"
                  width="60%"
                  height="30px"
                  onClick={() => {
                    setModals((prev) => ({ ...prev, addPlaceModal: true }));
                    setCurrentAddedPlace((prev) => ({
                      ...prev,
                      date: date,
                    }));
                  }}
                >
                  + 장소 추가
                </button>
              )}
            </DayToggleContainer>
          )}
        </div>
      ))}
    </MainPlanning>
  );
};
