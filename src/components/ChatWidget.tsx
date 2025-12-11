import React, { useState, useEffect, useRef } from 'react';
import { ChatWidgetProps, Message } from '../types';
import { ChatWindow } from './ChatWindow';
import { ErrorBoundary } from './ErrorBoundary';
import { ChatIcon, CloseIcon } from './Icons';
import { saveMessages, loadMessages } from '../utils/storage';
import { sendMessageToLLM, ChatApiError } from '../utils/api';
import '../styles/widget.scss';

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiKey,
  primaryColor = '#8b5cf6',
  position = 'bottom-right',
  isOnline = true,
  maintenanceMode = false,
  onMessageSent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedMessages = loadMessages();
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (maintenanceMode) return;

    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (onMessageSent) {
      onMessageSent(text);
    }

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      const response = await sendMessageToLLM(text, apiKey, conversationHistory);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      let errorMessage = 'Sorry, an error occurred. Please try again.';
      
      if (error instanceof ChatApiError) {
        errorMessage = error.message;
        
        if (error.code === 'INSUFFICIENT_QUOTA') {
          errorMessage = `Quota insuficiente: ${error.message}`;
          console.error('Quota Error:', {
            code: error.code,
            message: error.message,
            link: 'https://platform.openai.com/account/billing'
          });
        } else if (error.code === 'INVALID_API_KEY') {
          errorMessage = `API key inválida: ${error.message}`;
          console.error('API Key Error:', {
            code: error.code,
            status: error.status,
            message: error.message
          });
        } else if (error.code === 'TIMEOUT') {
          errorMessage = 'The request took too long. Please try again.';
        } else if (error.code === 'NETWORK_ERROR') {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.code === 'MESSAGE_TOO_LONG') {
          errorMessage = error.message;
        } else if (error.code === 'RATE_LIMIT') {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (error.code === 'SERVER_ERROR') {
          errorMessage = 'OpenAI server error. Please try again later.';
        } else if (error.code === 'NO_RESPONSE') {
          errorMessage = 'No response from ChatGPT. Please try again.';
        } else if (error.code === 'BAD_REQUEST') {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div 
        className={`chat-widget chat-widget-${position}`} 
        style={{ '--primary-color': primaryColor } as React.CSSProperties}
        role="complementary"
        aria-label="Chat widget"
      >
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isOnline={isOnline}
            maintenanceMode={maintenanceMode}
            isLoading={isLoading}
            error={error}
          />
        )}
        <button
          ref={toggleButtonRef}
          className="chat-toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat window' : 'Open chat window'}
          aria-expanded={isOpen}
          aria-controls="chat-window"
          type="button"
        >
          {isOpen ? (
            <CloseIcon width={24} height={24} />
          ) : (
            <ChatIcon width={24} height={24} />
          )}
          <span className="sr-only">{isOpen ? 'Close' : 'Open'} chat</span>
        </button>
      </div>
    </ErrorBoundary>
  );
};