import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">MRTek.ai Assistant</h3>
          <p className="text-xs text-primary-foreground/80">
            Ask about AI digital assistants, cloud, or how to get started
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8"
      >
        <X className="w-4 h-4" />
        <span className="sr-only">Close chat</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
