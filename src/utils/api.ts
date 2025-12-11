import '../styles/widget.scss';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class ChatApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'ChatApiError';
    this.code = code;
    this.status = status;
  }
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const sendMessageToLLM = async (
  message: string,
  apiKey?: string,
  conversationHistory?: ChatMessage[]
): Promise<string> => {
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new ChatApiError('Message cannot be empty', 'INVALID_MESSAGE');
  }

  if (message.length > 5000) {
    throw new ChatApiError('Message is too long. Maximum 5000 characters allowed.', 'MESSAGE_TOO_LONG');
  }

  if (apiKey) {
    const cleanApiKey = apiKey.trim();
    
    if (!cleanApiKey || cleanApiKey.length < 20) {
      throw new ChatApiError('API key appears to be invalid. Please check your API key.', 'INVALID_API_KEY');
    }

    if (cleanApiKey === 'SUA_API_KEY_AQUI' || cleanApiKey.includes('your-api-key')) {
      throw new ChatApiError('Please replace the placeholder API key with your actual OpenAI API key.', 'INVALID_API_KEY');
    }

    try {
      const messages: ChatMessage[] = conversationHistory 
        ? [...conversationHistory, { role: 'user', content: message.trim() }]
        : [{ role: 'user', content: message.trim() }];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        }),
        signal: AbortSignal.timeout(60000)
      });

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch (e) {
          const text = await response.text();
          console.error('OpenAI API Error Response:', text);
        }
        
        const errorCode = errorData.error?.code || errorData.error?.type;
        const errorMessage = errorData.error?.message || 'Unknown error';

        if (errorCode === 'insufficient_quota' || errorMessage.includes('quota')) {
          throw new ChatApiError(
            'You have exceeded your OpenAI API quota. Please check your plan and billing details at https://platform.openai.com/account/billing',
            'INSUFFICIENT_QUOTA',
            402
          );
        }

        if (response.status === 401) {
          throw new ChatApiError(
            `Authentication failed (401): ${errorMessage}. Please verify your API key is correct and active.`,
            'INVALID_API_KEY',
            401
          );
        } else if (response.status === 429) {
          if (errorCode === 'rate_limit_exceeded') {
            throw new ChatApiError(
              'Rate limit exceeded. You have exceeded your OpenAI API rate limit. Please try again later.',
              'RATE_LIMIT',
              429
            );
          } else {
            throw new ChatApiError(
              errorMessage || 'Rate limit exceeded. Please try again later.',
              'RATE_LIMIT',
              429
            );
          }
        } else if (response.status === 500) {
          throw new ChatApiError(
            'OpenAI server error. Please try again later.',
            'SERVER_ERROR',
            500
          );
        } else if (response.status === 400) {
          throw new ChatApiError(
            errorMessage || 'Invalid request. Please check your message.',
            'BAD_REQUEST',
            400
          );
        }
        
        throw new ChatApiError(
          errorMessage || `API request failed with status ${response.status}`,
          errorCode || 'API_ERROR',
          response.status
        );
      }

      const data = await response.json();
      
      const assistantMessage = data.choices?.[0]?.message?.content;
      
      if (!assistantMessage) {
        throw new ChatApiError('No response from ChatGPT', 'NO_RESPONSE');
      }

      return assistantMessage;
    } catch (error) {
      if (error instanceof ChatApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ChatApiError('Request timeout. Please try again.', 'TIMEOUT', 408);
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ChatApiError('Network error. Please check your connection.', 'NETWORK_ERROR');
      }

      throw new ChatApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
        'UNKNOWN_ERROR'
      );
    }
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    "Hello! How can I help you today?",
    "I understand your question. Let me think...",
    "That's a great question! Here's the answer:",
    "Thank you for your message. I'll help you with that.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)] + 
    ` (You said: "${message}")`;
};