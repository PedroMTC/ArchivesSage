import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleMessageSend = async () => {
    if (inputMessage.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:8800/send-message', { message: inputMessage });
      const chatbotResponse = response.data;

      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'You', message: inputMessage },
        { sender: 'Sage', message: chatbotResponse }
      ]);

      setInputMessage(''); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatPage;
