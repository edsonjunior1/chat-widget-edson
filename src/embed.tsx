import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from './components/ChatWidget';
import './styles/widget.scss';

interface WidgetConfig {
  apiKey?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left';
  isOnline?: string;
  maintenanceMode?: string;
}

function findCurrentScript(): HTMLScriptElement | null {
  if (document.currentScript) {
    return document.currentScript as HTMLScriptElement;
  }
  
  const scripts = document.getElementsByTagName('script');
  for (let i = scripts.length - 1; i >= 0; i--) {
    const script = scripts[i];
    if (script.src && script.src.includes('widget.js')) {
      return script;
    }
  }
  
  return null;
}

function initChatWidget() {
  const script = findCurrentScript();
  
  const config: WidgetConfig = {
    apiKey: script?.getAttribute('data-api-key') || undefined,
    primaryColor: script?.getAttribute('data-primary-color') || '#007bff',
    position: (script?.getAttribute('data-position') as any) || 'bottom-right',
    isOnline: script?.getAttribute('data-online') || 'true',
    maintenanceMode: script?.getAttribute('data-maintenance') || 'false'
  };

  let container = document.getElementById('chat-widget-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'chat-widget-container';
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(
    <ChatWidget
      apiKey={config.apiKey}
      primaryColor={config.primaryColor}
      position={config.position}
      isOnline={config.isOnline === 'true'}
      maintenanceMode={config.maintenanceMode === 'true'}
    />
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
  setTimeout(initChatWidget, 0);
}