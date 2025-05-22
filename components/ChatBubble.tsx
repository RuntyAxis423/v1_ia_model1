import React from 'react';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';
  const bubbleColor = isUser ? 'bg-[#f0f0f0]' : 'bg-[#e8f0ff]';
  const textColor = 'text-gray-950'; // All text is dark

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-lg p-3 max-w-[80%] ${bubbleColor} ${textColor}`}>
        {content.split('\n').map((line, index) => (
          <p key={index} className="whitespace-pre-wrap">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatBubble;
