import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ChatMessage } from '../types/medical';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { problems, medications, allergies } = useData();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('problem') || lowerQuery.includes('condition')) {
      if (problems.length === 0) return "No problems are currently recorded.";
      return `Current problems:\n${problems.map(p => 
        `- ${p.condition} (${p.status})`
      ).join('\n')}`;
    }
    
    if (lowerQuery.includes('medication') || lowerQuery.includes('med')) {
      if (medications.length === 0) return "No medications are currently recorded.";
      return `Current medications:\n${medications.map(m => 
        `- ${m.name}: ${m.dosage}, ${m.frequency}`
      ).join('\n')}`;
    }
    
    if (lowerQuery.includes('allergy') || lowerQuery.includes('allergic')) {
      if (allergies.length === 0) return "No allergies are currently recorded.";
      return `Current allergies:\n${allergies.map(a => 
        `- ${a.allergen} (${a.severity}): ${a.reaction}`
      ).join('\n')}`;
    }

    if (lowerQuery.includes('history') || lowerQuery.includes('previous')) {
      return `Recent patient history:\n
- Feb 15, 2024: Routine checkup with Dr. Smith
- Jan 20, 2024: Normal blood work results
- Dec 05, 2023: Follow-up for respiratory infection`;
    }

    return "I can help you retrieve information about patient history, problems, medications, and allergies. What would you like to know?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: input
    };

    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: processQuery(input)
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-[500px]">
      <div className="flex items-center mb-3">
        <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center p-4">
            Ask me about patient history, problems, medications, or allergies!
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about patient data..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}