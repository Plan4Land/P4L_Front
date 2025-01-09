import { TravelSpotApi } from "../../Api/ItemApi"
import { Header, Footer } from "../../Component/GlobalComponent"
import { TourItemInfoBox } from "../../Style/TourItemInfoStyled"

export const TourItemInfo = () => {
return(
  <>
<Header/>
<TourItemInfoBox>
        <h1 className="tour-title">여행지 이름</h1>
        <img
          src="/profile-pic/basic2.png"
          alt="여행지 이미지"
          className="tour-image"
        />
        <p className="tour-description">
          이 여행지는 아름다운 풍경과 다채로운 경험을 제공합니다. 방문해보세요!
        </p>
        <div className="tour-details">
          <p>
주소: 서울특별시 예시구 예시로 123
          </p>
          <p>
            연락처: 02-1234-5678
          </p>
          <p>
운영시간: 09:00 - 18:00
          </p>
        </div>
      </TourItemInfoBox>
  <Footer/>
  </>
)
}