import { AnalyticsPayload } from './types';

// Sanitize question for analytics (remove PII, limit length)
const sanitizeQuestion = (question: string): string => {
  // Remove potential email addresses
  let sanitized = question.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
  // Remove potential phone numbers
  sanitized = sanitized.replace(/(\+?1?\s*[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g, '[PHONE]');
  // Limit length
  return sanitized.substring(0, 200);
};

// Detect question category based on keywords
export const detectQuestionCategory = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('budget') || lowerQuestion.includes('fee')) {
    return 'pricing';
  }
  if (lowerQuestion.includes('service') || lowerQuestion.includes('offer') || lowerQuestion.includes('assistant') || lowerQuestion.includes('ai')) {
    return 'services';
  }
  if (lowerQuestion.includes('process') || lowerQuestion.includes('start') || lowerQuestion.includes('begin') || lowerQuestion.includes('how do') || lowerQuestion.includes('90 day')) {
    return 'process';
  }
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('call') || lowerQuestion.includes('reach') || lowerQuestion.includes('talk')) {
    return 'contact';
  }
  if (lowerQuestion.includes('implement') || lowerQuestion.includes('integration') || lowerQuestion.includes('setup')) {
    return 'implementation';
  }
  if (lowerQuestion.includes('support') || lowerQuestion.includes('help') || lowerQuestion.includes('issue')) {
    return 'support';
  }
  
  return 'general';
};

export const trackEvent = (event: string, properties: Record<string, unknown> = {}): void => {
  const payload: AnalyticsPayload = {
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
    },
  };

  // Log for development
  console.log('[Chatbot Analytics]', payload);

  // Wire to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, payload.properties);
  }

  // Wire to any custom analytics if available
  if (typeof window !== 'undefined' && (window as any).trackEvent) {
    (window as any).trackEvent(event, payload.properties);
  }
};

export const trackChatbotOpened = (): void => {
  trackEvent('chatbot_opened', {
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

export const trackMessageSent = (messageLength: number, conversationLength: number): void => {
  trackEvent('chatbot_message_sent', {
    message_length: messageLength,
    conversation_length: conversationLength,
  });
};

export const trackConversationComplete = (
  messageCount: number,
  durationMs: number,
  ledToContact: boolean
): void => {
  trackEvent('chatbot_conversation_complete', {
    message_count: messageCount,
    duration_seconds: Math.round(durationMs / 1000),
    led_to_contact: ledToContact,
  });
};

export const trackQuestion = (question: string): void => {
  const category = detectQuestionCategory(question);
  trackEvent('chatbot_question', {
    category,
    question: sanitizeQuestion(question),
  });
};
