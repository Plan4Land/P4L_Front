import React from "react";
import styled from "styled-components";

const TourItemStyled = styled.div`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || "250px"};
  margin: ${(props) => props.margin || "10px"};
  display: flex;
  border: 1px solid black;
  cursor: pointer;
  background-color: #fff;
  align-items: center;

  .img {
    width: 300px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnail {
    width: 95%;
    height: 95%;
    object-fit: cover;
    border-right: 1px solid #ccc;
  }

  .infoWrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 25px;
    font-weight: bold;
  }

  .address {
    font-size: 20px;
    color: #333;
  }

  .subCategory {
    font-size: 12px;
    color: #888;
  }
`;

export const TourItem = ({
  thumbnail,
  title,
  address,
  subCategory,
  width,
  height,
  margin,
}) => {
  console.log("TourItem props:", { thumbnail, title, address, subCategory });

  return (
    <TourItemStyled width={width} height={height} margin={margin}>
      <div className="img">
        <img className="thumbnail" src={thumbnail} alt={title} />
      </div>
      <div className="infoWrapper">
        <h3 className="title">{title}</h3>
        <p className="address">{address}</p>
        <p className="subCategory">{subCategory}</p>
      </div>
    </TourItemStyled>
  );
};
