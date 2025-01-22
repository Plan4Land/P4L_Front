import { useEffect, useRef } from "react";
import {
  ChatContainer,
  ChatMsgContainer,
  Message,
} from "../../Style/PlanningStyled";
import { HiArrowCircleUp } from "react-icons/hi";
import PlanningApi from "../../Api/PlanningApi";
import { FaTimes } from "react-icons/fa";

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
  setPlans,
  setIsEditting,
  setEditor,
  closeChat,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault(); // 기본 Enter 동작 막기
      if (inputMsg?.trim()) {
        handleButtonClick(); // 버튼 클릭 함수 호출
      }
    }

    if (event.key === "Enter" && event.shiftKey) {
    }
  };

  const handleButtonClick = (e) => {
    alert("버튼이 눌렸습니다!");
    // 메시지 전송
    ws.current.send(
      JSON.stringify({
        type: "CHAT",
        plannerId: plannerId,
        sender: sender,
        message: inputMsg.replace(/\n/g, "<br>"),
      })
    );
    setInputMsg("");
    console.log("전송");
  };

  // 채팅 종료
  // const onClickMsgClose = () => {
  //   ws.current.send(
  //     JSON.stringify({
  //       type: "CLOSE",
  //       plannerId: plannerId,
  //       sender: sender,
  //       message: inputMsg,
  //     })
  //   );
  //   ws.current.close();
  //   console.log("채팅 종료");
  // };

  // 웹 소켓 연결하기
  useEffect(() => {
    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log("data ::::: ", data);
      if (data.type === "CHAT") {
        setChatList((prev) => [...prev, data]); // 기존의 채팅 리스트에 새로운 메시지 추가
      }
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

  return (
    <ChatContainer>
      <div className="chat-header">
        <FaTimes className="close-chat" onClick={closeChat} />
      </div>
      <ChatMsgContainer ref={ChatContainerRef}>
        {chatList.map((chat, index) => (
          <Message key={index} isSender={chat.sender === sender}>
            <p className="id">{`${chat.sender}`}</p>
            {/* <p className="talk">{`  ${chat.message}`}</p> */}
            <p
              className="talk"
              dangerouslySetInnerHTML={{ __html: chat.message }}
            />
          </Message>
        ))}
      </ChatMsgContainer>

      <div className="sendChat">
        <textarea
          id="chatTyping"
          value={inputMsg ?? ""}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            height: `${Math.min(90, 15 + inputMsg.split("\n").length * 15)}px`,
          }}
        />
        <button onClick={handleButtonClick} disabled={!inputMsg?.trim()}>
          <HiArrowCircleUp className="sendIcon" />
        </button>
      </div>
    </ChatContainer>
  );
};
