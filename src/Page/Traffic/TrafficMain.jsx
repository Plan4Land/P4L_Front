import { useState } from "react";
import { Train } from "./Train";
import styled from "styled-components";

const TrafficMain = () => {
  const [selectedMenu, setSelectedMenu] = useState("train");

  const renderComponent = () => {
    switch (selectedMenu) {
      case "train":
        return <Train />;
      // case "expressBus":
      //   return <ExpressBus />;
      // case "intercityBus":
      //   return <IntercityBus />;
      default:
        return <Train />;
    }
  };
  return (
    <>
      <TrafficContainer>
        <div className="menu">
          <span
            onClick={() => setSelectedMenu("train")}
            className={selectedMenu === "train" ? "active" : ""}
          >
            열차 조회
          </span>
          <span>|</span>
          <span
            onClick={() => setSelectedMenu("expressBus")}
            className={selectedMenu === "expressBus" ? "active" : ""}
          >
            고속 버스 조회
          </span>
          <span>|</span>
          <span
            onClick={() => setSelectedMenu("intercityBus")}
            className={selectedMenu === "intercityBus" ? "active" : ""}
          >
            시외 버스 조회
          </span>
        </div>
      </TrafficContainer>
      {renderComponent()}
    </>
  );
};

export default TrafficMain;

const TrafficContainer = styled.div`
  width: 1000px;
  margin: 0 auto;

  .menu {
    margin: 20px 0;
    color: gray;
    span {
      cursor: pointer;
      margin-right: 10px;
    }

    .active {
      text-decoration: underline;
      font-weight: bold;
    }
  }
`;
