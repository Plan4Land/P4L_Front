import { ChatContainer } from "../../Style/PlanningStyled";

import { IoPaperPlaneOutline, IoArrowForwardCircle } from "react-icons/io5"; // Ionicons
import { HiArrowCircleRight } from "react-icons/hi";
import { FiSend, FiArrowRight } from "react-icons/fi";

export const ChatComponent = ({ typingMsg, setTypingMsg }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault(); // 기본 Enter 동작 막기
      handleButtonClick(); // 버튼 클릭 함수 호출
    }

    if (event.key === "Enter" && event.shiftKey) {
      adjustTextareaHeight(); // 높이 조정 함수 호출
    }
  };

  const handleButtonClick = () => {
    alert("버튼이 눌렸습니다!");
    setTypingMsg("");
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("chatTyping");
    const minHeight = 20; // 최소 높이 20px
    const maxHeight = 70; // 최대 높이 70px
    textarea.style.height = `${minHeight}px`;
    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = `${maxHeight}px`;
    }
  };

  // const icons = [
  //   IoPaperPlaneOutline,
  //   IoArrowForwardCircle,
  //   HiArrowCircleRight,
  //   FiSend,
  //   FiArrowRight,
  // ];

  return (
    <ChatContainer>
      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          fontSize: "24px",
        }}
      >
        {icons.map((Icon, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <Icon />
            <p>{Icon.name}</p>
          </div>
        ))}
      </div> */}
      <div className="sendChat">
        <textarea
          id="chatTyping"
          value={typingMsg ?? ""}
          onChange={(e) => setTypingMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButtonClick} disabled={!typingMsg?.trim()}>
          <FiSend className="sendIcon" />
        </button>
      </div>
    </ChatContainer>
  );
};
