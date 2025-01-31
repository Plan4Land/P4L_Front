import { SelectStation } from "../../Style/TrainStyle";

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
            setStationCode(null);
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

export const SelectExpressStation = ({
  area,
  setArea,
  city,
  setCity,
  station,
  setStation,
  setStationCode,
  code,
  placeHolder,
}) => {
  return (
    <SelectStation>
      <div className="select-wrapper">
        <select
          value={area?.cat1 || ""}
          onChange={(e) => {
            const selectedArea = code.find(
              (item) => item.cat1 === e.target.value
            );
            setArea(selectedArea);
            setCity(null);
            setStation(null);
            setStationCode(null);
          }}
        >
          <option value="" disabled>
            {placeHolder}
          </option>
          {code.map((areaItem) => (
            <option key={areaItem.cat1Code} value={areaItem.cat1}>
              {areaItem.cat1}
            </option>
          ))}
        </select>

        {area && (
          <select
            value={city?.cat2 || ""}
            onChange={(e) => {
              const selectedCity = area?.cat2List.find(
                (cityItem) => cityItem.cat2 === e.target.value
              );
              setCity(selectedCity);
              setStation(null);

              if (
                !selectedCity?.cat3List ||
                selectedCity.cat3List.length === 0
              ) {
                setStationCode(selectedCity?.cat2Code || null);
              } else {
                setStationCode(null);
              }
            }}
          >
            <option value="" disabled>
              시/군/역 선택
            </option>
            {(area?.cat2List || []).map((cityItem) => (
              <option key={cityItem.cat2Code} value={cityItem.cat2}>
                {cityItem.cat2}
              </option>
            ))}
          </select>
        )}

        {city && city.cat3List && city.cat3List.length > 0 && (
          <select
            value={station || ""}
            onChange={(e) => {
              const selectedStation = city.cat3List.find(
                (stationItem) => stationItem.cat3 === e.target.value
              );
              setStation(selectedStation?.cat3 || "");
              setStationCode(selectedStation?.cat3Code || "");
            }}
          >
            <option value="" disabled>
              역 선택
            </option>
            {city.cat3List.map((stationItem) => (
              <option key={stationItem.cat3Code} value={stationItem.cat3}>
                {stationItem.cat3}
              </option>
            ))}
          </select>
        )}
      </div>
    </SelectStation>
  );
};
