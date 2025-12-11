import React from 'react';
import '../styles/widget.scss';

interface StatusIndicatorProps {
  isOnline: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline }) => {
  return (
    <div className="status-indicator">
      <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
      <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
};