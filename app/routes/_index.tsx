import { MetaFunction } from "@remix-run/node";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import ChatBubble from "~/components/ChatBubble";
import ChatInput from "~/components/ChatInput";

export const meta: MetaFunction = () => {
  return [
    { title: "PALF Assistant" },
    { name: "description", content: "Your PALF social media assistant." },
  ];
};

export default function Index() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fixed messages to display once at the start
  const initialMessages = [
    { id: 'info1', role: 'assistant', content: '🛈 Aún estamos en proceso de aprobación de permisos para Instagram y TikTok; por eso sus paneles pueden verse sin datos recientes.' },
    { id: 'info2', role: 'assistant', content: '🛈 Estamos trabajando en la conexión que extraerá todas las noticias sobre “Pase a la Fama”. Cuando esté lista, las encontrarás en la pestaña PUBLIC RELATIONS de los dashboards de PALF.' },
    { id: 'info3', role: 'assistant', content: '🛈 Este modelo sigue en entrenamiento, así que su margen de error puede ser relativamente volátil.' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white max-w-[768px] mx-auto">
      {/* Header */}
      <header className="flex items-center justify-center p-4 border-b border-gray-200">
        {/* Placeholder for PALF Logo */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="2"/>
          <path d="M8 12L11 15L16 9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-xl font-bold ml-2 text-gray-950">PALF Assistant</h1>
      </header>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {initialMessages.map(msg => (
          <ChatBubble key={msg.id} role={msg.role as 'user' | 'assistant'} content={msg.content} />
        ))}
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role as 'user' | 'assistant'} content={m.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <ChatInput
            value={input}
            onChange={handleInputChange}
            placeholder="How can Bolt help you today?"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.874L6 12zm0 0V9.009m0 2.991l10.742 8.27M6 12l10.742-8.27" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
