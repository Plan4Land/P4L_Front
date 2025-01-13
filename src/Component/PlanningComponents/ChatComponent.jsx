import { useEffect, useRef } from "react";
import { ChatContainer } from "../../Style/PlanningStyled";
import { HiArrowCircleUp } from "react-icons/hi";

export const ChatComponent = ({
  inputMsg,
  setInputMsg,
  ws,
  plannerId,
  sender,
  socketConnected,
  setSocketConnected,
  chatList,
  setChatList,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault(); // 기본 Enter 동작 막기
      handleButtonClick(); // 버튼 클릭 함수 호출
    }

    if (event.key === "Enter" && event.shiftKey) {
    }
  };

  const handleButtonClick = (e) => {
    alert("버튼이 눌렸습니다!");
    // 메시지 전송
    ws.current.send(
      JSON.stringify({
        type: "TALK",
        plannerId: plannerId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg("");
  };

  // 채팅 종료
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        plannerId: plannerId,
        sender: sender,
        message: inputMsg,
      })
    );
    ws.current.close();
  };

  // 웹 소켓 연결하기
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:8111/ws/chat");
      ws.current.onopen = () => {
        setSocketConnected(true);
      };
    }
    if (socketConnected && sender) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          plannerId: plannerId,
          sender: sender,
          message: "입장합니다.",
        })
      );
    }
    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setChatList((prev) => [...prev, data]); // 기존의 채팅 리스트에 새로운 메시지 추가
    };
  }, [socketConnected, sender]);

  // 화면 하단으로 자동 스크롤
  const ChatContainerRef = useRef(null);
  useEffect(() => {
    if (ChatContainerRef.current) {
      ChatContainerRef.current.scrollTop =
        ChatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  // const icons = [
  //   // IoPaperPlaneOutline,
  //   IoArrowForwardCircle,
  //   HiArrowCircleRight,
  //   HiArrowCircleUp,
  //   FiSend,
  //   FiArrowRight,
  // ];

  return (
    <ChatContainer>
      <div className="chatMsgContainer" ref={ChatContainerRef}>
        {chatList.map((chat, index) => (
          <div key={index} isSender={chat.sender === sender}>
            {`${chat.sender} > ${chat.message}`}
          </div>
        ))}
      </div>
      <div className="sendChat">
        <textarea
          id="chatTyping"
          value={inputMsg ?? ""}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButtonClick} disabled={!inputMsg?.trim()}>
          <HiArrowCircleUp className="sendIcon" />
        </button>
      </div>
    </ChatContainer>
  );
};
