import { useState, useCallback, useEffect } from 'react';
import { Message } from './types';
import { WELCOME_MESSAGE, STARTER_QUESTIONS } from './knowledgeBase';
import {
  trackChatbotOpened,
  trackMessageSent,
  trackConversationComplete,
  trackQuestion,
} from './analytics';
import { supabase } from '@/integrations/supabase/client';

const MAX_MESSAGES_PER_SESSION = 50;
const STORAGE_KEY = 'mrtek_chat_history';

interface StoredChat {
  messages: Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
  messageCount: number;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [ledToContact, setLedToContact] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredChat = JSON.parse(stored);
        const restoredMessages = parsed.messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(restoredMessages);
        setMessageCount(parsed.messageCount);
      } else {
        // Initialize with welcome message
        const welcomeMessage: Message = {
          id: generateId(),
          content: WELCOME_MESSAGE,
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    } catch {
      // If parsing fails, start fresh
      const welcomeMessage: Message = {
        id: generateId(),
        content: WELCOME_MESSAGE,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const toStore: StoredChat = {
        messages: messages.map((m) => ({
          ...m,
          timestamp: m.timestamp.toISOString(),
        })),
        messageCount,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages, messageCount]);

  const open = useCallback(() => {
    setIsOpen(true);
    if (!sessionStartTime) {
      setSessionStartTime(new Date());
    }
    trackChatbotOpened();
  }, [sessionStartTime]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (sessionStartTime && messages.length > 1) {
      const duration = Date.now() - sessionStartTime.getTime();
      trackConversationComplete(messageCount, duration, ledToContact);
    }
  }, [sessionStartTime, messages.length, messageCount, ledToContact]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const welcomeMessage: Message = {
      id: generateId(),
      content: WELCOME_MESSAGE,
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setMessageCount(0);
    setLedToContact(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (messageCount >= MAX_MESSAGES_PER_SESSION) {
        const limitMessage: Message = {
          id: generateId(),
          content:
            "It looks like we've had a long session! For deeper help, please reach out to Michael directly at michael@mrtek.ai and we'll follow up with you personally.",
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, limitMessage]);
        setLedToContact(true);
        return;
      }

      const userMessage: Message = {
        id: generateId(),
        content,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessageCount((prev) => prev + 1);
      setIsLoading(true);

      trackMessageSent(content.length, messages.length + 1);
      trackQuestion(content);

      try {
        // Get conversation history for context
        const conversationHistory = [...messages, userMessage].map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content,
        }));

        const { data, error } = await supabase.functions.invoke('mrtek-chat', {
          body: { messages: conversationHistory },
        });

        if (error) throw error;

        const assistantMessage: Message = {
          id: generateId(),
          content: data.response || "I'm sorry, I couldn't process that. Please try again or reach out to michael@mrtek.ai for help.",
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Check if response mentions contact
        if (
          data.response?.toLowerCase().includes('michael@mrtek.ai') ||
          data.response?.toLowerCase().includes('linkedin')
        ) {
          setLedToContact(true);
        }
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage: Message = {
          id: generateId(),
          content:
            "I'm having trouble connecting right now. Please try again in a moment, or reach out directly to michael@mrtek.ai.",
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, messageCount]
  );

  const isAtLimit = messageCount >= MAX_MESSAGES_PER_SESSION;

  return {
    messages,
    isOpen,
    isLoading,
    messageCount,
    isAtLimit,
    open,
    close,
    sendMessage,
    clearHistory,
    starterQuestions: STARTER_QUESTIONS,
  };
};
