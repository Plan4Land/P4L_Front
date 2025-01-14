import styled from "styled-components";

export const colors = {
  colorA: "#19660a",
  colorB: "#579450",
  colorC: "#d3eea9",
  colorD: "#ffffcf",
};

export const HeaderSt = styled.div`
  height: 80px;
  background-color: ${colors.colorD};
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
    cursor: pointer;
    position: relative;
  }

  .recomm:hover .dropdown-list {
    display: block;
  }
  .dropdown-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 200px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .dropdown-list ul {
    margin: 0;
    padding: 10px;
    list-style: none;
  }

  .dropdown-list li {
    padding: 8px 12px;
    cursor: pointer;
  }

  .dropdown-list li:hover {
    background-color: #f0f0f0;
  }
`;

export const NavSt = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.6;
  .tag {
    color: ${colors.colorA};
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
    color: ${colors.colorA};
    margin: -10px;
  }
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;
