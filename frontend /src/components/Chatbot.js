import React, { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setMessages([...messages, { text: 'Processing...', sender: 'bot' }]);
      setInput('');
      setTimeout(() => {
        setMessages([...messages, { text: 'How can I help with data entry?', sender: 'bot' }]);
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Chatbot</h2>
      <div className="space-y-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
