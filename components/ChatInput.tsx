import React from 'react';

interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Add any specific props if needed
}

const ChatInput: React.FC<ChatInputProps> = ({ ...props }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = e.target.scrollHeight + 'px';
    }
    props.onChange?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      className="flex-1 p-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:outline-none focus:border-blue-500 bg-white text-gray-950"
      rows={1}
      {...props}
      onInput={handleInput}
    />
  );
};

export default ChatInput;
