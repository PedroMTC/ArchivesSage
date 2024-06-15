import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">

      <header className="bg-purple-900 text-white py-4 w-full">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="container mx-auto flex justify-between items-center px-4 relative z-10 h-full">
          <h1 className="text-2xl font-bold text-white">Archives Sage</h1>
          <div className="flex items-center"></div>
        </div>
      </header>

      <main className="flex-grow flex justify-end relative overflow-hidden">
        <section className=" header-bg  h-full flex justify-end w-1/6 bg-[url('/img/Headerstars.jpg')]">
          <div className="w-full h-full flex flex-col justify-center ">
            <div className="flex-grow w-full p-4 overflow-y-auto">
              <div className="h-full flex flex-col justify-start items-center">
                <button
                  onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
                  onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl mr-4 px-6 py-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
                >
                  Botão 1
                </button>
                <button
                  onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
                  onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl mr-4 px-6 py-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
                >
                  Botão 2
                </button>
                <button
                  onMouseEnter={e => e.target.style.background = 'linear-gradient(to left, #4299e1, #805ad5)'}
                  onMouseLeave={e => e.target.style.background = 'linear-gradient(to left, #805ad5, #4299e1)'}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl mr-4 px-6 py-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ background: 'linear-gradient(to left, #805ad5, #4299e1)', color: '#fff' }}
                >
                  Botão 3
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="h-full flex justify-end w-5/6">
          <div className="w-full h-full bg-white shadow-lg flex flex-col items-center justify-center bg-[url('/img/Bguniverse.png')] bg-cover">
            <div className="flex-grow w-full p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col mb-4 ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  {message.sender === 'Sage' && (
                    <div className="text-l text-white mb-1">SAGE</div>
                  )}
                  <div className={`max-w-xs p-3 rounded-lg ${message.sender === 'You' ? 'bg-purple-900 text-white self-end' : 'bg-gray-300 text-gray-900 self-start'}`}>
                    <span className="block">{message.message}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="bg-purple-700 p-4 border-t border-gray-200 w-full flex items-center justify-center">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded mr-2"
                placeholder="Type your message..."
              />
              <button
                onClick={handleMessageSend}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>


      <footer className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Direitos Autorais © 2024 Archive Sage. Todos os direitos reservados.</p>
        </div>
      </footer>
      
    </div>
  );
};

export default ChatPage;
