'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  aiScore?: number;
}

interface DebateProps {
  debateId: string;
  topic: string;
  persona: {
    id: string;
    name: string;
    avatar?: string;
  };
  initialStatement?: string;
  onSendMessage: (content: string) => Promise<void>;
  onEndDebate: () => void;
}

export const DebateMode: React.FC<DebateProps> = ({
  debateId,
  topic,
  persona,
  initialStatement,
  onSendMessage,
  onEndDebate,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debateScore, setDebateScore] = useState<number | null>(null);
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Simulate fetching messages
  useEffect(() => {
    if (initialStatement) {
      setMessages([
        {
          id: '1',
          sender: 'user',
          content: initialStatement,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [initialStatement]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format date for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsLoading(true);
    
    // Add user message to the list
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    try {
      // Send message to backend
      await onSendMessage(newMessage);
      
      // Simulate AI response (this would come from the backend in a real implementation)
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: `As ${persona.name}, I would argue that ${newMessage.length > 50 ? 'your point raises interesting questions' : 'your perspective has some merit, but consider the alternative view'}.`,
          timestamp: new Date().toISOString(),
          aiScore: Math.floor(Math.random() * 100),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Debate: {topic}</h3>
          <Badge variant="secondary">With {persona.name}</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={onEndDebate}>
          End Debate
        </Button>
      </div>
      
      <Card className="flex-grow flex flex-col">
        <CardHeader className="pb-2 border-b">
          <div className="flex items-center gap-3">
            <Avatar size="sm" name={persona.name} src={persona.avatar} />
            <div>
              <CardTitle className="text-base">{persona.name}</CardTitle>
              <p className="text-xs text-gray-500">AI Persona</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Start the debate by sending a message</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-100 text-primary-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar size="xs" name={persona.name} src={persona.avatar} />
                      <span className="font-medium text-sm">{persona.name}</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.aiScore !== undefined && (
                      <Badge variant="info" className="text-xs">
                        Score: {message.aiScore}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <textarea
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Type your argument here..."
              rows={2}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              className="self-end"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isLoading}
              isLoading={isLoading}
            >
              Send
            </Button>
          </div>
          
          {debateScore !== null && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium">Debate Score</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full"
                    style={{ width: `${debateScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{debateScore}%</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
