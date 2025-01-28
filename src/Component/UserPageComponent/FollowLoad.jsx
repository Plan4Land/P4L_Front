import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FollowList } from "../../Style/MyPageMainStyled";
import { ProfileImg } from "../PictureCommponent";
import styled from "styled-components";
import AxiosApi from "../../Api/AxiosApi";
import { Button } from "../ButtonComponent";
import { colors } from "../../Style/GlobalStyle";
import { ScrollBar } from "../ButtonComponent";

/*
email
id
imgPath
name
nickname
regDate
role
state
uid
* */

const ListBox = styled.div`
  height: 230px;
  overflow-y: scroll;
  ${ScrollBar}
`;

const FollowListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  & .user-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-grow: 0.7;
  }

  & .user-info p {
    flex-grow: 0.2;
    text-align: left;
  }

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }

  & button {
    font-size: 0.8em;
    background-color: ${(props) => (props.isFollowed ? colors.colorB : "#ccc")};
    border: ${(props) => (props.isFollowed ? colors.colorA : "#bebebe")};
    padding: 5px 10px;
    width: 80px;
    flex-grow: 1;
    margin: 0 10px;
  }
`;

const Tab = ({ isSelected, onClick, children }) => (
  <button onClick={onClick} className={isSelected ? "active" : ""}>
    {children}
  </button>
);

export const List = ({
  items,
  onItemClick,
  loginUser,
  isMyPage,
  isFollower,
}) => {
  const [followState, setFollowState] = useState(items.map(() => false));

  const handleFollow = async (index, follower, followed, isFollow) => {
    const data = await AxiosApi.follow(follower, followed, isFollow);
    setFollowState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <ListBox>
      {items.map((item, index) => (
        <FollowListItem key={index} isFollowed={followState[index]}>
          <div
            className="user-info"
            onClick={() => onItemClick(item.id, loginUser)}
          >
            <ProfileImg
              className={"image"}
              file={item.imgPath}
              width={"50px"}
              height={"50px"}
            />
            <p>{item.nickname}</p>
            <p>{item.id}</p>
          </div>
          {isMyPage && !isFollower && (
            <Button
              onClick={() =>
                handleFollow(index, loginUser, item.id, followState[index])
              }
            >
              {followState[index] ? "팔로우" : "팔로우 해제"}
            </Button>
          )}
        </FollowListItem>
      ))}
    </ListBox>
  );
};

const FollowLoad = ({ followings, followers, loginUser, isMyPage }) => {
  const [selectedTab, setSelectedTab] = useState("followings");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleItemClick = (id, loginUser) => {
    if (id !== loginUser) {
      console.log(id, "?", loginUser);
      navigate(`/otheruser/${id}`);
    } else {
      navigate(`/mypage`);
    }
  };

  return (
    <FollowList>
      <div className="tabs-component">
        <div className="tabs">
          <Tab
            isSelected={selectedTab === "followings"}
            onClick={() => handleTabClick("followings")}
          >
            팔로잉
          </Tab>
          <Tab
            isSelected={selectedTab === "followers"}
            onClick={() => handleTabClick("followers")}
          >
            팔로워
          </Tab>
        </div>
        <div className="tab-content">
          {selectedTab === "followings" && (
            <List
              items={followings}
              onItemClick={handleItemClick}
              loginUser={loginUser}
              isMyPage={isMyPage}
              isFollower={false}
            />
          )}
          {selectedTab === "followers" && (
            <List
              items={followers}
              onItemClick={handleItemClick}
              loginUser={loginUser}
              isMyPage={isMyPage}
              isFollower={true}
            />
          )}
        </div>
      </div>
    </FollowList>
  );
};

export default FollowLoad;
