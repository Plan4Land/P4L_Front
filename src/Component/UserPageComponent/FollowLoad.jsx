import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FollowList} from "../../Style/MyPageMainStyled";
import {ProfileImg} from "../ProfileImg";

const Tab = ({ isSelected, onClick, children }) => (
  <button onClick={onClick} className={isSelected ? "active" : ""}>
    {children}
  </button>
);
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
const List = ({ items, onItemClick }) => (
  <div className="list">
    {items.map((item, index) => (
      <div key={index} className="list-item" onClick={() => onItemClick(item.id)}>
        <ProfileImg file={item.imgPath} width={"20px"} height={"20px"} />
        {item.nickname} : {item.id}
      </div>
    ))}
  </div>
);

const FollowLoad = ({ followings, followers }) => {
  const [selectedTab, setSelectedTab] = useState("followings");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleItemClick = (id) => {
    navigate(`/otheruser/${id}`);
  };

  return (
    <FollowList>
      <div className="tabs-component">
        <div className="tabs">
          <Tab isSelected={selectedTab === "followings"} onClick={() => handleTabClick("followings")}>
            팔로잉
          </Tab>
          <Tab isSelected={selectedTab === "followers"} onClick={() => handleTabClick("followers")}>
            팔로워
          </Tab>
        </div>
        <div className="tab-content">
          {selectedTab === "followings" && (
            <List items={followings} onItemClick={handleItemClick}/>
          )}
          {selectedTab === "followers" && (
            <List items={followers} onItemClick={handleItemClick}/>
          )}
        </div>
      </div>
    </FollowList>
  );
};

export default FollowLoad;
