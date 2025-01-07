import styled from "styled-components";

export const colors = {
  colorA: "#19660a",
  colorB: "#579450",
  colorC: "#d3eea9",
  colorD: "#ffffcf",
};

export const HeaderSt = styled.div`
  height: 100px;
  background-color: ${colors.colorD};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 10px 0 10px;
  .logo {
    display: inline-block;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .search-container {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .search-wrapper {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .selected-option {
    position: absolute;
    left: 55px;
    top: 48%;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: bold;
    color: ${colors.colorA};
    pointer-events: none;
  }
  .divider {
    position: absolute;
    left: 110px;
    top: 43%;
    transform: translateY(-50%);
    color: ${colors.colorA};
    font-size: 20px;
    pointer-events: none;
  }

  .search {
    font-size: 14px;
    height: 40px;
    border-radius: 50px;
    border: 2.5px solid ${colors.colorA};
    padding-left: 120px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .search-toggle {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px 10px;
    background-color: ${colors.colorA};
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1;
  }
  .search-button {
    position: absolute;
    right: 15px;
    top: 23%;
    scale: 110%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.colorA};
  }

  .search-options {
    position: absolute;
    top: 105%;
    background-color: white;
    border: 1px solid ${colors.colorA};
    border-radius: 5px;
    z-index: 10;
    width: 120px;

    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .search-options.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .options-list p {
    padding: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
  }

  .options-list p:hover {
    background-color: #f0f0f0;
  }
  .profile-link {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: ${colors.colorC};
    position: relative;
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
    color: #4caf50;
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

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
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
