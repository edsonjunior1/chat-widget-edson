import React, { useState, KeyboardEvent, useRef } from 'react';
import { WarningIcon, SendIcon } from './Icons';
import '../styles/widget.scss';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  maintenanceMode?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
  maintenanceMode = false
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled && !maintenanceMode) {
      onSend(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      {maintenanceMode && (
        <div 
          className="maintenance-banner" 
          role="alert"
          aria-live="assertive"
          id="maintenance-message"
        >
          <WarningIcon width={16} height={16} />
          <span>Maintenance mode. Please try again later.</span>
        </div>
      )}
      <div className="message-input-wrapper">
        <label htmlFor="chat-message-input" className="sr-only">
          Type your message
        </label>
        <input
          ref={inputRef}
          id="chat-message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          disabled={disabled || maintenanceMode}
          className="message-input"
          aria-label="Type your message"
          aria-describedby={maintenanceMode ? "maintenance-message" : undefined}
          maxLength={5000}
          autoComplete="off"
        />
        <button
          onClick={handleSend}
          disabled={disabled || maintenanceMode || !message.trim()}
          className="send-button"
          aria-label="Send message"
          type="button"
        >
          <SendIcon width={16} height={16} />
          <span className="sr-only">Send</span>
        </button>
      </div>
    </div>
  );
};