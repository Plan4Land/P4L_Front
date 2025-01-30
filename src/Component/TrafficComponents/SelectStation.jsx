import { colors } from "../../Style/GlobalStyle";
import { SelectStation } from "../../Style/TrainStyle";
import { Button } from "../ButtonComponent";

// SelectStation 컴포넌트의 props를 객체로 묶어 관리
export const SelectStationComponent = ({
  area,
  setArea,
  station,
  setStation,
  setStationCode,
  code,
  placeHolder,
}) => {
  return (
    // <SelectStation>
    //   <select
    //     value={station || ""}
    //     onChange={(e) => {
    //       const selectedStation = e.target.value;
    //       setStation(selectedStation);
    //       setStationCode(selectedStation); // station 선택 후 코드도 설정
    //     }}
    //   >
    //     <option value="" disabled>
    //       {placeHolder}
    //     </option>
    //     {code.map((areaItem) => (
    //       <optgroup key={areaItem.cat1} label={areaItem.cat1}>
    //         {areaItem.cat2List.map((stationItem) => (
    //           <option
    //             key={stationItem.cat2Code}
    //             value={stationItem.cat2}
    //             selected={station === stationItem.cat2}
    //           >
    //             {stationItem.cat2}
    //           </option>
    //         ))}
    //       </optgroup>
    //     ))}
    //   </select>
    // </SelectStation>
    <SelectStation>
      <div className="select-wrapper">
        <select
          value={area?.cat1 || ""}
          onChange={(e) => {
            const selectedArea = code.find(
              (item) => item.cat1 === e.target.value
            );
            setArea(selectedArea);
            setStation(null);
          }}
        >
          <option value="" disabled>
            {placeHolder}
          </option>
          {code.map((areaItem) => (
            <option key={areaItem.cat1} value={areaItem.cat1}>
              {areaItem.cat1}
            </option>
          ))}
        </select>

        {area && (
          <select
            value={station || ""}
            onChange={(e) => {
              const selectedStation = area?.cat2List.find(
                (stationItem) => stationItem.cat2 === e.target.value
              );
              if (selectedStation) {
                setStation(selectedStation.cat2);
                setStationCode(selectedStation.cat2Code);
              }
            }}
          >
            <option value="" disabled>
              역 선택
            </option>
            {(area?.cat2List || []).map((stationItem) => (
              <option key={stationItem.cat2Code} value={stationItem.cat2}>
                {stationItem.cat2}
              </option>
            ))}
          </select>
        )}
      </div>
    </SelectStation>
  );
};
