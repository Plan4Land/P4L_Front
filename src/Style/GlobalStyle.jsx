import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalFont = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
  
.title-font {
  font-family: "Jua", serif;
  font-weight: 400;
  font-style: normal;
}
.content-font1{
  font-family: "Nanum Brush Script", serif;
  font-weight: 400; 
  font-style: normal;
}
.content-font2{
  font-family: "Gothic A1", serif;
  font-weight: 400;
  font-style: normal;
}
`;

export const colors = {
  colorA: "rgb(105, 39, 13)",
  colorB: "rgb(255, 115, 22)",
  colorC: "rgb(255, 170, 131)",
  colorD: "rgb(255, 238, 226)",
  colorE: "rgb(255, 119, 0)",
};

export const HeaderSt = styled.div`
  height: 90px;
  border-bottom: 7px solid ${colors.colorB};
  color: ${colors.colorA};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 5% 0 10%;

  .logoBox {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    cursor: pointer;
    .logoImg {
      scale: 0.6;
      margin-right: -40px;
    }
    img {
      width: 200px;
    }
    @media (max-width: 1024px) {
      scale: 0.6;
      width: 100px;
    }
  }
  .usermenu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    .profile-link {
      height: 80px;
      width: 80px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: ${colors.colorC};
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }
    .profile-link.logged-in {
      background-color: transparent;
    }
    .profile-link.logged-out {
      background-color: transparent;
    }
    .profile-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
    .login-btn {
      color: ${colors.colorA};
      font-size: 15px;
      background-color: transparent;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      border: 1px solid ${colors.colorC};
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;
      width: 160px;
      font-size: 15px;
      display: none;
    }
    .profile-link:hover .dropdown {
      display: block;
    }
    .dropdown-item {
      padding: 12px 16px;
      color: #333;
      text-decoration: none;
      display: block;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dropdown-item:last-child {
      border-bottom: none;
    }

    .dropdown-item:hover {
      background-color: #f0f0f0;
      color: ${colors.colorA};
    }

    .dropdown button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      padding: 12px 16px;
      text-align: center;
      width: 100%;
      display: block;
      color: #333;
      transition: all 0.3s ease;
    }

    .dropdown button:hover {
      background-color: #f0f0f0;
    }
    .recomm {
      position: relative;
      cursor: pointer;
      white-space: nowrap;
      p {
        font-size: 12px;
      }
    }

    .recomm:hover .dropdown-list {
      display: block;
    }
    .dropdown-list {
      display: none;
      position: absolute;
      right: 0;
      width: 500px;
      background-color: white;
      border: 1px solid #ddd;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 10px;
    }
    .topItem {
      margin-bottom: 20px;
      .truncated-text {
        display: inline-block;
        max-width: 150px; /* 원하는 너비 설정 */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title {
        width: 100%;
        border-bottom: 1px solid #ddd;
      }
      h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        color: black;
        cursor: default;
      }
      span {
        padding: 0 5px 0 5px;
      }
      p {
        color: ${colors.colorA};
        font-size: 16px;
        margin: 5px 0;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: ${colors.colorD};
        }
      }
    }
  }
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 3% 0 8%;
    .profile-img {
      scale: 0.7;
    }
    .profile-link {
      /* scale: 70%; */
      z-index: 5;
      .dropdown {
        top: 50px;
        scale: 0.7;
      }
    }
    .usermenu {
      .dropdown-list {
        top: -20px;
        right: -150px;
        scale: 0.7;
      }
    }
  }
  .dropdown-Trafficlist {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    width: auto; /* 자동 너비 */
    min-width: 100px; /* 최소 너비 설정 */
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 30px;
    align-items: center; /* 수직 중앙 정렬 */
    margin-top: 5px; /* 드롭다운 상단에 간격 추가 */
  }
`;

export const NavSt = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.6;
  .tag,
  p {
    color: ${colors.colorA};
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    flex: 0.8;
    text-align: center;
    transition: all 0.3s ease;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
      opacity: 0.7;
      cursor: pointer;
    }
  }
  .tag.active {
    text-decoration: underline;
    opacity: 0.7;
  }
  p {
    color: ${colors.colorA};
    margin: -10px;
    &:hover {
      opacity: 1;
      cursor: default;
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background-color: white;
    font-size: 12px;
    z-index: 10;
    padding: 0 8% 0 8%;
    box-shadow: 1px -1px 4px rgba(0, 0, 0, 0.1);
    .tag,
    p {
      font-size: 15px;
    }
  }
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
  h4,
  p {
    margin: 5px 0 0 5px;
    opacity: 0.7;
  }
  p {
    font-size: 13px;
  }
`;
