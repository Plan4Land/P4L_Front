import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const TourItemInfoBox = styled.div`
   width: 80%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  .tour-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.tour-image {
  display: block;
  width: 500px;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 10px;
}

.tour-description {
  margin-bottom: 20px;
  text-align: center;
}

.tour-details {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  padding: 15px;
  border-radius: 8px;
}

`;