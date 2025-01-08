import styled from "styled-components";

export const InvitePlanning = styled.div`
  .invited-planning-list {
    margin-top: 20px;
    width: 500px;
  }

  .invited-planning-item {
    margin-bottom: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
  }

  .planning-details {
    margin: 10px;
  }

  .label {
    font-weight: bold;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
