import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const MAX_MESSAGE_LENGTH = 500;

const MessageInput = ({ onSend, isLoading, disabled }: MessageInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !isLoading && !disabled) {
      onSend(trimmed.substring(0, MAX_MESSAGE_LENGTH));
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value.substring(0, MAX_MESSAGE_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder="Ask about AI services, pricing, or how to get started…"
          disabled={isLoading || disabled}
          className="flex-1"
          aria-label="Chat message input"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || disabled}
          size="icon"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      {input.length > MAX_MESSAGE_LENGTH - 50 && (
        <p className="text-xs text-muted-foreground mt-1">
          {input.length}/{MAX_MESSAGE_LENGTH} characters
        </p>
      )}
    </div>
  );
};

export default MessageInput;
