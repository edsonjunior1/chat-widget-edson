export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatWidgetProps {
  apiKey?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left';
  isOnline?: boolean;
  maintenanceMode?: boolean;
  onMessageSent?: (message: string) => void;
}