import styled from "styled-components";

export const HeaderSt = styled.div`
  height: 100px;
  background-color: #f9ffe9;
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
  .search-link {
    flex-grow: 1;
    text-decoration: none;

    .search-container {
      display: flex;
      align-items: center;
      background-color: white;
      border: 1px solid #17520b;
      border-radius: 50px;
      overflow: hidden;
      height: 50px;
    }
    .placeholder {
      padding-left: 20px;
      color: #aaa;
      font-size: 14px;
      width: 100%;
    }
  }
  .profile-link {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: #17520b;
  }
`;

export const NavSt = styled.div`
  height: 50px;
  background-color: #e1ffb0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tag {
    color: #17520b;
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
    color: #3c8dbc;
  }
  p {
    color: #17520b;
    margin: -10px;
  }
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: fixed;
  bottom: 0;
`;
