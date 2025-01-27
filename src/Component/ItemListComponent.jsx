import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ServiceCode } from "../Util/Service_code_final";
import cate100 from "../Img/cateimg/type_100.png";
import cate200 from "../Img/cateimg/type_200.png";
import cate300 from "../Img/cateimg/type_300.png";
// import { TourItemApi } from "../Api/ItemApi";
// import { useState, useEffect } from "react";

const TourItemStyled = styled.div`
  width: ${(props) => props.width || "40vw"};
  height: ${(props) => props.height || "180px"};
  margin: ${(props) => props.margin || "10px"};
  display: flex;
  cursor: pointer;
  background-color: #fff;
  align-items: center;
  overflow: hidden;
  position: relative;
  /* border: 1px solid black; */
  p {
    margin: 0 0 5px 0;
  }
  .img {
    min-width: 300px;
    max-width: 300px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
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
    object-fit: cover;
  }

  .infoWrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
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
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .titleSearch {
    font-size: 14px;
    font-weight: bold;
  }

  .address {
    font-size: 15px;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    width: 150px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;
    img {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 50%;
      background-color: white;
    }
    .ownernick {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: white;
      text-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
    }
  }
  @media (max-width: 1024px) {
    height: 15vw;
    .img {
      max-width: 50%;
      min-width: 50%;
    }
    .profile-img {
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
      bottom: 10px;
      gap: 10px;

      .ownerth {
        width: 20%;
        height: 20%;
      }
      .ownernick {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  @media (max-width: 768px) {
    height: 25vw;
    width: 80vw;
    .img {
      max-width: 40%;
      min-width: 40%;
    }
    .profile-img {
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
      bottom: 10px;
      gap: 10px;

      .ownerth {
        width: 20%;
        height: 20%;
      }
      .ownernick {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
`;

export const TourItem = ({
  // thumbnail,
  // title,
  // address,
  // subCategory,
  // type,
  // id,
  data,
  width,
  height,
  margin,
}) => {
  const navigate = useNavigate();
  const title = data.title;
  const address = data.addr1;
  const type = data.typeName;
  const thumbnail = data.thumbnail;

  const handleOnClick = () => {
    navigate(`/tourItemInfo/${data.id}`, {
      state: { title, address, subCategory, type, thumbnail },
    });
  };

  // 기본 이미지 설정: type에 따라 다르게 설정
  const getDefaultImage = (typeId) => {
    switch (typeId) {
      case "200":
        return cate100;
      case "100":
        return cate200;
      case "300":
        return cate300;
      default:
        return "/profile-pic/basic7.png";
    }
  };

  const imageUrl = thumbnail ? thumbnail : getDefaultImage(data.typeId);

  const getCategoryPath = () => {
    const cat1Item = ServiceCode.find((item) => item.cat1 === data.cat1);
    const cat2Item = cat1Item?.cat2List.find((item) => item.cat2 === data.cat2);
    const cat3Item = cat2Item?.cat3List.find((item) => item.cat3 === data.cat3);

    return [cat1Item?.cat1Name, cat2Item?.cat2Name, cat3Item?.cat3Name]
      .filter(Boolean)
      .join(" > ");
  };

  const subCategory = getCategoryPath();

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
// export const TourItem = ({ data, width, height, margin }) => {
//   const navigate = useNavigate();
//   const title = data.title;
//   const address = data.addr1;
//   const type = data.typeName;
//   const thumbnail = data.thumbnail;
//   const spotId = data.id;

//   const [spotApiPics, setSpotApiPics] = useState([]);

//   useEffect(() => {
//     const fetchSpotImages = async () => {
//       try {
//         // API 호출하여 상세 이미지 배열을 가져옴
//         const apiPics = await TourItemApi.getSpotApiPics(spotId);
//         setSpotApiPics(apiPics); // 상태에 이미지 배열 저장
//         // console.log("관광지 이미지 추가 로드", apiPics);
//       } catch (error) {
//         console.error("이미지 로드 오류:", error);
//       }
//     };

//     fetchSpotImages();
//   }, [spotId]);

//   const handleOnClick = () => {
//     navigate(`/tourItemInfo/${data.id}`, {
//       state: { title, address, subCategory, type, thumbnail },
//     });
//   };

//   // 기본 이미지 설정: type에 따라 다르게 설정
//   const getDefaultImage = (typeId) => {
//     switch (typeId) {
//       case "200":
//         return cate100;
//       case "100":
//         return cate200;
//       case "300":
//         return cate300;
//       default:
//         return "/profile-pic/basic7.png"; // 기본 이미지 경로
//     }
//   };

//   // API에서 가져온 이미지 URL 추출
//   const apiImageUrls = Array.isArray(spotApiPics.item)
//     ? spotApiPics.item.map((pic) => pic.originimgurl).filter(Boolean) // 유효한 URL만 추출
//     : [];

//   // 최종 이미지 배열 생성 (API 이미지가 없으면 기본 이미지 사용)
//   const images =
//     apiImageUrls.length > 0
//       ? apiImageUrls
//       : [thumbnail || getDefaultImage(data.typeId)];

//   const getCategoryPath = () => {
//     const cat1Item = ServiceCode.find((item) => item.cat1 === data.cat1);
//     const cat2Item = cat1Item?.cat2List.find((item) => item.cat2 === data.cat2);
//     const cat3Item = cat2Item?.cat3List.find((item) => item.cat3 === data.cat3);

//     return [cat1Item?.cat1Name, cat2Item?.cat2Name, cat3Item?.cat3Name]
//       .filter(Boolean)
//       .join(" > ");
//   };

//   const subCategory = getCategoryPath();

//   return (
//     <TourItemStyled
//       width={width}
//       height={height}
//       margin={margin}
//       onClick={handleOnClick}
//     >
//       <div className="img">
//         <img className="thumbnail" src={images[0]} alt={title} />
//       </div>
//       <div className="infoWrapper">
//         <h3 className="title">{title}</h3>
//         <p className="address">{address}</p>
//         <p className="subCategory">{subCategory}</p>
//         <p className="type">{type}</p>
//       </div>
//     </TourItemStyled>
//   );
// };

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
  // const [spotApiPics, setSpotApiPics] = useState([]);

  // // API에서 이미지 가져오기
  // useEffect(() => {
  //   const fetchSpotImages = async () => {
  //     try {
  //       const apiPics = await TourItemApi.getSpotApiPics(data.id);
  //       setSpotApiPics(apiPics); // 상태에 이미지 배열 저장
  //     } catch (error) {
  //       console.error("이미지 로드 오류:", error);
  //     }
  //   };

  //   fetchSpotImages();
  // }, [data.id]);

  // 기본 썸네일 이미지를 typeId에 따라 반환
  const getDefaultImage = (typeId) => {
    switch (typeId) {
      case "100":
        return cate200;
      case "200":
        return cate100;
      case "300":
        return cate300;
      default:
        return "/profile-pic/basic7.png"; // 기본 이미지
    }
  };

  // 썸네일 이미지 결정
  const imageUrl = data.thumbnail
    ? data.thumbnail
    : getDefaultImage(data.typeId);

  // // API에서 가져온 이미지 URL 추출
  // const apiImageUrls = Array.isArray(spotApiPics.item)
  //   ? spotApiPics.item.map((pic) => pic.originimgurl).filter(Boolean) // 유효한 URL만 추출
  //   : [];

  // // 최종 이미지 배열 생성 (API 이미지가 없으면 기본 이미지 사용)
  // const images =
  //   apiImageUrls.length > 0
  //     ? apiImageUrls
  //     : [data.thumbnail || getDefaultImage(data.typeId)];

  // 카테고리 경로 계산
  const getCategoryPath = () => {
    const cat1Item = ServiceCode.find((item) => item.cat1 === data.cat1);
    const cat2Item = cat1Item?.cat2List.find((item) => item.cat2 === data.cat2);
    const cat3Item = cat2Item?.cat3List.find((item) => item.cat3 === data.cat3);

    return [cat1Item?.cat1Name, cat2Item?.cat2Name, cat3Item?.cat3Name]
      .filter(Boolean)
      .join(" > ");
  };

  // 마커 정보 생성
  const marker = {
    position: {
      lat: data.mapY,
      lng: data.mapX,
    },
    content: data.title,
    address: data.addr1 || "정보 없음",
    category: getCategoryPath() || "정보 없음",
  };

  // 아이템 클릭 이벤트 처리
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
        {/* <img className="thumbnailSearch" src={images[0]} alt={data.title} /> */}
        <img className="thumbnailSearch" src={imageUrl} alt={data.title} />
      </div>
      <div className="infoWrapperSearch">
        <h3 className="titleSearch">{data.title}</h3>
        <p className="addressSearch">{data.addr1 || "정보 없음"}</p>
      </div>
    </TourItemStyled>
  );
};
