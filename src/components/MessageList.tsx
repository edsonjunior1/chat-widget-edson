import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import '../styles/widget.scss';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      className="message-list" 
      ref={messagesContainerRef}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      aria-atomic="false"
    >
      {messages.length === 0 && (
        <div className="welcome-message">
          <div className="welcome-logo" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="currentColor"/>
              <path d="M9 8L15 12L9 16V8Z" fill="white"/>
            </svg>
          </div>
          <h4>Eloquent AI responds instantly</h4>
          <p>Ask me anything</p>
        </div>
      )}
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`message ${message.sender}`}
          role="listitem"
        >
          {message.sender === 'assistant' && (
            <div className="message-avatar" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                <path d="M9 8L15 12L9 16V8Z" fill="white"/>
              </svg>
            </div>
          )}
          <div className="message-content-wrapper">
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time" aria-label={`Sent at ${new Date(message.timestamp).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}`}>
              {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
};