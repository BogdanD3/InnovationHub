import React, { useState, useEffect, useRef } from "react";
import "../../Pages/Home/Home.css";

interface ChatMessage {
  user: string;
  type?: "mentor" | "participant" | "admin";
  message: string;
}

interface ChatThread {
  title: string;
  messages: ChatMessage[];
}

const chatThreads: ChatThread[] = [
  {
    title: "Zagušenja u saobraćaju u Podgorici",
    messages: [
      {
        user: "Ana",
        type: "participant",
        message: "Da li je neko video novi plan kružnog toka?",
      },
      {
        user: "Marko",
        type: "mentor",
        message: "Da, mislim da će pomoći saobraćaju.",
      },
    ],
  },
  {
    title: "Nadogradnja tehnološke opreme u školama",
    messages: [
      {
        user: "Jovana",
        type: "participant",
        message: "Možemo li dobiti više računara?",
      },
      {
        user: "Miloš",
        type: "participant",
        message: "Tableti bi puno pomogli.",
      },
    ],
  },
  {
    title: "Rešenja za upravljanje otpadom",
    messages: [
      {
        user: "Ivan",
        type: "participant",
        message: "Treba više kontejnera za reciklažu.",
      },
      { user: "Lana", type: "mentor", message: "Obrazovne kampanje su bitne." },
    ],
  },
];

const userColors: Record<string, string> = {
  mentor: "#4e9eff",
  participant: "#00ffcc",
  admin: "#ffbb28",
  default: "#ffffff",
};

const GroupChat: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(
    chatThreads[activeIndex].messages
  );
  const [inputValue, setInputValue] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentUser = "Ti"; // Logged-in user
  const currentUserType: "participant" = "participant";

  // Update messages when switching thread
  useEffect(() => {
    setMessages(chatThreads[activeIndex].messages);
  }, [activeIndex]);

  // Simulate other users typing and sending messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUsers = [
        "Ana",
        "Marko",
        "Ivan",
        "Lana",
        "Jovana",
        "Miloš",
        "Sara",
      ];
      const types: ("mentor" | "participant" | "admin")[] = [
        "mentor",
        "participant",
        "admin",
      ];
      const user = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      setTypingUser(user);

      const messagesPool = [
        "Super ideja!",
        "Možemo li dodati više detalja?",
        "Odlično!",
        "Treba proveriti još nešto...",
        "Slažem se",
      ];
      const messageText =
        messagesPool[Math.floor(Math.random() * messagesPool.length)];

      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, { user, type, message: messageText }]);
        setTypingUser(null);
      }, 1500);

      return () => clearTimeout(timeout);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Auto-scroll only if near bottom
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      50;

    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, typingUser]);

  // Send message
  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg: ChatMessage = {
      user: currentUser,
      type: currentUserType,
      message: inputValue,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="group-chat-container"
      style={{
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: "10px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "40rem",
      }}
    >
      {/* Chat switcher */}
      <div className="chat-switcher">
        {chatThreads.map((chat, idx) => (
          <button
            key={idx}
            className={`switch-btn ${activeIndex === idx ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
          >
            {chat.title}
          </button>
        ))}
      </div>

      {/* Messages scroll area */}
      <div
        className="chat-grid"
        ref={chatContainerRef}
        style={{
          overflowY: "auto",
          flex: 1,
          paddingRight: "0.5rem",
          maxHeight: "28rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="chat-card"
            style={{
              borderLeft: `4px solid ${
                msg.type ? userColors[msg.type] : userColors.default
              }`,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <strong
              style={{
                color: msg.type ? userColors[msg.type] : userColors.default,
              }}
            >
              {msg.user}
            </strong>
            : {msg.message}
          </div>
        ))}

        {typingUser && (
          <div
            className="chat-card"
            style={{
              borderLeft: "4px solid #ffbb28",
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            {typingUser} kuca poruku...
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Unesite poruku..."
          style={{
            flex: 1,
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #00ffcc",
            backgroundColor: "#0d1117",
            color: "#ffffff",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            border: "1px solid #00ffcc",
            backgroundColor: "#0d1117",
            color: "#00ffcc",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Pošalji
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
