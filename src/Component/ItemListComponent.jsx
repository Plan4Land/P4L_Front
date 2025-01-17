import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ServiceCode } from "../Util/Service_code_final";

const TourItemStyled = styled.div`
  width: ${(props) => props.width || "70vw"};
  height: ${(props) => props.height || "230px"};
  margin: ${(props) => props.margin || "10px"};
  display: flex;

  cursor: pointer;
  background-color: #fff;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;

  .img {
    min-width: 400px;
    max-width: 400px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgSearch {
    width: 120px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .thumbnailSearch {
    width: 100%;
    height: 100%;
  }

  .infoWrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
  }
  .infoWrapperSearch {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    h3,
    p {
      margin: 0;
    }
    .titleSearch {
      font-size: 15px;
    }
    .addressSearch {
      font-size: 12px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .titleSearch {
    font-size: 14px;
    font-weight: bold;
  }

  .address {
    font-size: 15px;
    color: #333;
  }
  .addressSearch {
    font-size: 12px;
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
  .owner {
    width: 200px;
    position: absolute;
    bottom: 15px;
    right: 0px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  @media (max-width: 768px) {
    height: 25vw;
    width: 80vw;
    .img {
      max-width: 40%;
      min-width: 40%;
    }
    .thumbnail {
    }
    .title {
      font-size: 15px;
      margin: 5px 0 0 5px;
    }
    .address,
    .subCategory,
    .type {
      font-size: 9px;
      margin: 5px;
    }
    .owner {
      width: 20vw;
      font-size: 10px;
      right: 0px;
      bottom: 5px;
      gap: 10px;
      img {
        width: 40%;
        height: 40%;
      }
    }
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
  ownerprofile,
  ownernick,
  width,
  height,
  margin,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/planning/${id}`, {
      state: {
        title,
        address,
        subCategory,
        type,
        thumbnail,
        ownerprofile,
        ownernick,
      },
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
      <div className="owner">
        <img className="ownerth" src={ownerprofile} alt="" />
        <p className="ownernick">{ownernick}</p>
      </div>
    </TourItemStyled>
  );
};

export const SearchTourItem = ({
  data,
  width,
  height,
  margin,
  setCurrentAddedPlace,
  setModals,
}) => {
  const defaultImage = "/profile-pic/basic7.png";
  const imageUrl = data.thumbnail ? data.thumbnail : defaultImage;
  const getCategoryPath = () => {
    const cat1Item = ServiceCode.find((item) => item.cat1 === data.cat1);
    const cat2Item = cat1Item?.cat2List.find((item) => item.cat2 === data.cat2);
    const cat3Item = cat2Item?.cat3List.find((item) => item.cat3 === data.cat3);

    return [cat1Item?.cat1Name, cat2Item?.cat2Name, cat3Item?.cat3Name]
      .filter(Boolean)
      .join(" > ");
  };
  const marker = {
    position: {
      lat: data.mapY,
      lng: data.mapX,
    },
    content: data.title,
    address: data.addr1 || "정보 없음",
    category: getCategoryPath() || "정보 없음",
  };

  const handleTourItemClick = () => {
    setCurrentAddedPlace((prev) => ({
      ...prev,
      ...marker,
    }));
    setModals((prevModals) => ({ ...prevModals, addPlaceModal: false }));
  };
  return (
    <TourItemStyled
      width={width}
      height={height}
      margin={margin}
      onClick={() => handleTourItemClick()}
    >
      <div className="imgSearch">
        <img className="thumbnailSearch" src={imageUrl} alt={data.title} />
      </div>
      <div className="infoWrapperSearch">
        <h3 className="titleSearch">{data.title}</h3>
        <p className="addressSearch">{data.addr1 || "정보 없음"}</p>
      </div>
    </TourItemStyled>
  );
};
