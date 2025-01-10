import { ChatContainer } from "../../Style/PlanningStyled";

export const ChatComponent = ({ typingMsg, setTypingMsg }) => {
  return (
    <ChatContainer>
      <div className="sendChat">
        <textarea
          id="chatTyping"
          value={typingMsg ?? ""}
          onChange={(e) => setTypingMsg(e.target.value)}
        />
      </div>
    </ChatContainer>
  );
};
