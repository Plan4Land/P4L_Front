import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TourItemStyled = styled.div`
  width: ${(props) => props.width || "90%"};
  height: ${(props) => props.height || "230px"};
  margin: ${(props) => props.margin || "10px"};
  display: flex;
  border: 1px solid grey;
  cursor: pointer;
  background-color: #fff;
  align-items: center;
  overflow: hidden;

  .img {
    width: 400px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnail {
    width: 95%;
    height: 95%;
    object-fit: cover;
  }

  .infoWrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .address {
    font-size: 15px;
    color: #333;
  }

  .subCategory {
    font-size: 12px;
    color: #888;
  }
  .type {
    font-size: 12px;
    color: #888;
  }
`;

export const TourItem = ({
  thumbnail,
  title,
  address,
  subCategory,
  type,
  id,
  width,
  height,
  margin,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/tourItemInfo/${id}`, {
      state: { title, address, subCategory, type, thumbnail },
    });
  };

  const defaultImage = "/profile-pic/basic7.png";
  const imageUrl = thumbnail ? thumbnail : defaultImage;
  return (
    <TourItemStyled
      width={width}
      height={height}
      margin={margin}
      onClick={handleOnClick}
    >
      <div className="img">
        <img className="thumbnail" src={imageUrl} alt={title} />
      </div>
      <div className="infoWrapper">
        <h3 className="title">{title}</h3>
        <p className="address">{address}</p>
        <p className="subCategory">{subCategory}</p>
        <p className="type">{type}</p>
      </div>
    </TourItemStyled>
  );
};

export const PlanItem = ({
  thumbnail,
  title,
  address,
  subCategory,
  type,
  id,
  width,
  height,
  margin,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/planning/${id}`, {
      state: { title, address, subCategory, type, thumbnail },
    });
  };
  const defaultImage = "/profile-pic/basic7.png";
  const imageUrl = thumbnail ? thumbnail : defaultImage;
  return (
    <TourItemStyled
      width={width}
      height={height}
      margin={margin}
      onClick={handleOnClick}
    >
      <div className="img">
        <img className="thumbnail" src={imageUrl} alt={title} />
      </div>
      <div className="infoWrapper">
        <h3 className="title">{title}</h3>
        <p className="address">{address}</p>
        <p className="subCategory">{subCategory}</p>
        <p className="type">{type}</p>
      </div>
    </TourItemStyled>
  );
};
