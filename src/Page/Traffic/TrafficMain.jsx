import { useEffect, useState } from "react";
import Train from "./Train";
import Express from "./Express.jsx";
import Intercity from "./Intercity.jsx";
import styled from "styled-components";

const TrafficMain = () => {
  const [selectedMenu, setSelectedMenu] = useState("train");

  const renderComponent = () => {
    switch (selectedMenu) {
      case "train":
        return <Train />;
      case "expressBus":
        return <Express />;
      case "intercityBus":
        return <Intercity />;
      default:
        return <Train />;
    }
  };
  useEffect(() => {
    const savedMenu = sessionStorage.getItem("selectedMenu");
    if (savedMenu) {
      setSelectedMenu(savedMenu);
    }
  }, []);

  // selectedMenu가 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);
  return (
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
      {renderComponent()}
    </TrafficContainer>
  );
};

export default TrafficMain;

const TrafficContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  .menu {
    margin: 20px 0;

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
