export type Sender = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
}

export interface AnalyticsPayload {
  event: string;
  properties: Record<string, unknown>;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isOpen: boolean;
  isLoading: boolean;
  messageCount: number;
  sessionStartTime: Date | null;
}

export interface StarterQuestion {
  id: string;
  text: string;
  category: 'services' | 'pricing' | 'process' | 'contact';
}
