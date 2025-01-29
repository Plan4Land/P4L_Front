import { colors } from "../../Style/GlobalStyle";
import { SelectStation } from "../../Style/TrainStyle";
import { Button } from "../ButtonComponent";

// SelectStation 컴포넌트의 props를 객체로 묶어 관리
export const SelectStationComponent = ({
  modal,
  setModal,
  area,
  setArea,
  station,
  setStation,
  setStationCode,
  code,
  placeHolder,
}) => {
  return (
    <SelectStation>
      <button className="input-box" onClick={() => setModal(!modal)}>
        {station ? `${station}역` : placeHolder}
      </button>
      {modal && (
        <div className="select-area-container">
          <div className="select-area">
            {code.map((areaItem) => (
              <Button
                key={areaItem.cat1}
                onClick={() => {
                  setArea(areaItem);
                  setStation(null);
                }}
                bgcolor={area === areaItem ? colors.colorB : "white"}
                color="black"
              >
                {areaItem.cat1}
              </Button>
            ))}
          </div>
          {area && (
            <>
              <hr />
              <div className="select-station">
                {(area?.cat2List || []).map((stationItem) => (
                  <Button
                    key={stationItem.cat2Code}
                    onClick={() => {
                      setStation(stationItem.cat2);
                      setStationCode(stationItem.cat2Code);
                      setModal(!modal); // station 선택 후 모달 닫기
                    }}
                    bgcolor={
                      station === stationItem.cat2 ? colors.colorB : "white"
                    }
                    color="black"
                  >
                    {stationItem.cat2}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </SelectStation>
  );
};
