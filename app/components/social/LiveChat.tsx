'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface Message {
  id: string;
  sender: {
    id: string;
    displayName: string;
    username: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface LiveChatProps {
  chatId: string;
  title: string;
  participants: Array<{
    id: string;
    displayName: string;
    username: string;
    avatar?: string;
    isOnline: boolean;
  }>;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
  onLeaveChat: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({
  chatId,
  title,
  participants,
  messages,
  onSendMessage,
  onLeaveChat,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  React.useEffect(() => {
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
    
    try {
      await onSendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
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
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant="secondary">
            {participants.length} {participants.length === 1 ? 'participant' : 'participants'}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            {showParticipants ? 'Hide Participants' : 'Show Participants'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLeaveChat}
          >
            Leave Chat
          </Button>
        </div>
      </div>
      
      <div className="flex flex-grow gap-4">
        {showParticipants && (
          <div className="w-64 border rounded-md overflow-hidden">
            <div className="p-3 bg-gray-50 border-b">
              <h4 className="font-medium">Participants</h4>
            </div>
            <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
                >
                  <div className="relative">
                    <Avatar
                      size="sm"
                      name={participant.displayName}
                      src={participant.avatar}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                        participant.isOnline ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></span>
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {participant.displayName}
                    </p>
                    <p className="text-xs text-gray-500">@{participant.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Card className="flex-grow flex flex-col">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="flex gap-2"
                >
                  <Avatar
                    size="sm"
                    name={message.sender.displayName}
                    src={message.sender.avatar}
                  />
                  <div className="flex-grow">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm">
                        {message.sender.displayName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
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
                placeholder="Type your message here..."
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
          </div>
        </Card>
      </div>
    </div>
  );
};
