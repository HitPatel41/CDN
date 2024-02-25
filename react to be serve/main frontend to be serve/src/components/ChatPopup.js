import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatPopup.css'; // Ensure this CSS file exists and is correctly imported

// Adjust this URL to match your backend's socket endpoint
const socket = io('https://api.parth2success.com/socket_for_popup', { path: '/socket.io/', transports: ['websocket'] });

function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const receiveMessage = (data) => {
      if (data.agent_response) {
        // If it's a loading message
        if (data.agent_response.is_loader === 1) {
          setChat((prevChat) => [...prevChat, { type: 'loader', content: "Thinking..." }]);
        } else {
          // Handling actual message response
          const displayMessage = {
            type: 'response',
            content: data.agent_response.message_content,
            datetime: data.agent_response.datetime,
            id: data.msg_id // Handling message ID
          };
          setChat((prevChat) => [...prevChat.filter(msg => msg.type !== 'loader'), displayMessage]);
        }
      }
    };

    socket.on('receive_message', receiveMessage);

    return () => {
      socket.off('receive_message', receiveMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const payload = {
        client_id: "e2adcc14-2424-4496-82a3-bbb6c9e1eeaa",
        user_id: "ad6044e7-0c7f-4ea1-86fe-b7485d41ccc4",
        message: message
      };
      socket.emit('new_message_from_user', JSON.stringify(payload)); // Make sure to stringify your payload if needed by your backend
      setChat((prevChat) => [...prevChat, { type: 'user', content: message }]);
      setMessage(''); // Clear input field after sending
    }
  };

  const logoImageUrl = "https://cdn.jsdelivr.net/gh/HitPatel41/CDN@main/Assets/Amul%20Curd.jpg";

  return (
    <div className="chat-container">
      <div className="chat-btn" onClick={() => setIsOpen(!isOpen)}>
      <img src={logoImageUrl} alt="Logo" style={{ width: '20px', height: '20px'}} />
      ChatPopup
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-area">
            {chat.map((msg, index) => (
              <p key={index} className={msg.type}>{msg.content} {msg.datetime ? `(${msg.datetime})` : ''}</p>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPopup;
