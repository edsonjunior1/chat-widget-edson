import { Message } from '../types';

const STORAGE_KEY = "chat-widget-messages";

export const saveMessages = (messages: Message[]): void => {
  try {
    const serialized = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error("Failed to save messages:", error);
  }
};

export const loadMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error("Failed to load messages:", error);
    return [];
  }
};

export const clearMessages = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear messages:", error);
  }
};