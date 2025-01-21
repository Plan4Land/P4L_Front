import styled from "styled-components";

export const colors = {
  colorA: "#4d2c0d",
  colorB: "#7a4b14",
  colorC: "#d4a76c",
  colorD: "#fff6e2",
  colorE: "#ff7700",
};

export const HeaderSt = styled.div`
  height: 80px;
  background-color: ${colors.colorB};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 10px 0 10px;

  .logo {
    display: inline-block;
    img {
      width: 200px;
      cursor: pointer;
    }
  }
  .profile-link {
    height: 65px;
    width: 65px;
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
      max-width: 200px; /* 원하는 너비 설정 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      color: ${colors.colorA};
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
  @media (max-width: 768px) {
    .dropdown-list {
      top: -30px;
      right: -180px;
      scale: 0.7;
    }
  }
`;

export const NavSt = styled.div`
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.6;
  .tag {
    color: white;
    font-weight: bold;
    text-decoration: none;
    flex: 0.8;
    text-align: center;
    transition: all 0.3s ease;
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
    color: white;
    margin: -10px;
  }
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    font-size: 12px;
    z-index: 10;
    .tag,
    p {
      color: ${colors.colorA};
    }
  }
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;
