import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  width: 300px;
  cursor: pointer;

  > .toggle-container {
    width: 65px;
    height: 30px;
    border-radius: 30px;
    background-color: #8b8b8b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    /* color: white; */
    font-size: 12px;
    font-weight: bold;
    transition: 0.2s;

    &.toggle--checked {
      background-color: #98ffaa;
    }
  }

  > .toggle-circle {
    position: absolute;
    top: 0px;
    left: -1px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: #ffffff;
    transition: all ease-out 0.2s;

    &.toggle--checked {
      left: 48px;
    }
  }
  .toggle--checked--text {
    display: flex;
    position: relative;
    left: 6px;
  }
  .toggle--unchecked--text {
    display: flex;
    position: relative;
    left: -2px;
  }
`;

export const ToggleSwitch = ({ setIsOn, isOn }) => {
  return (
    <ToggleContainer>
      <div
        onClick={() => setIsOn(!isOn)}
        className={`toggle-container ${isOn ? "toggle--checked" : null}`}
      >
        {/* <span>{isOn ? "공개" : "비공개"}</span> */}
        <span className={`${isOn ? "toggle--checked--text" : null}`}>
          {isOn ? "공개" : ""}
        </span>
        <span className={`${!isOn ? "toggle--unchecked--text" : null}`}>
          {!isOn ? "비공개" : ""}
        </span>
      </div>
      <div
        onClick={() => setIsOn(!isOn)}
        className={`toggle-circle ${isOn ? "toggle--checked" : null}`}
      />
    </ToggleContainer>
  );
};
