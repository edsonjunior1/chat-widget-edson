import React from 'react';
import { Message } from '../types';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { StatusIndicator } from './StatusIndicator';
import '../styles/widget.scss';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isOnline: boolean;
  maintenanceMode: boolean;
  isLoading: boolean;
  error?: string | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isOnline,
  maintenanceMode,
  isLoading,
  error
}) => {
  return (
    <div 
      className="chat-window" 
      id="chat-window"
      role="dialog"
      aria-labelledby="chat-header-title"
      aria-modal="true"
    >
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-header-left">
            <div className="eloquent-logo" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                <path d="M9 8L15 12L9 16V8Z" fill="white"/>
              </svg>
            </div>
            <h3 id="chat-header-title">Eloquent AI</h3>
          </div>
          <StatusIndicator isOnline={isOnline} />
        </div>
      </div>
      <MessageList messages={messages} />
      {isLoading && (
        <div className="loading-indicator" role="status" aria-live="polite">
          <span>Digitando...</span>
        </div>
      )}
      {error && (
        <div className="error-message" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <MessageInput
        onSend={onSendMessage}
        disabled={isLoading}
        maintenanceMode={maintenanceMode}
      />
      <div className="chat-footer">
        <span className="powered-by">Powered by EloquentAI</span>
        <div className="eloquent-logo-small" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="currentColor"/>
            <path d="M9 8L15 12L9 16V8Z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
};