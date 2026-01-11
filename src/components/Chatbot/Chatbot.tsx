import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useChat } from './useChat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Chatbot = () => {
  const isMobile = useIsMobile();
  const {
    messages,
    isOpen,
    isLoading,
    isAtLimit,
    open,
    close,
    sendMessage,
    clearHistory,
    starterQuestions,
  } = useChat();

  if (!isOpen) {
    return (
      <Button
        onClick={open}
        className="fixed bottom-6 right-6 z-50 h-14 px-4 rounded-full shadow-lg hover:shadow-xl transition-all gap-2"
        aria-label="Open chat with MRTek.ai Assistant"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">Chat with MRTek.ai</span>
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        'fixed z-50 flex flex-col bg-background border border-border shadow-2xl overflow-hidden',
        isMobile
          ? 'inset-0 rounded-none'
          : 'bottom-6 right-6 w-96 h-[500px] rounded-lg'
      )}
      role="dialog"
      aria-label="MRTek.ai Chat Assistant"
    >
      <ChatHeader onClose={close} />

      <MessageList
        messages={messages}
        isLoading={isLoading}
        starterQuestions={starterQuestions}
        onStarterClick={sendMessage}
        showStarters={!isAtLimit}
      />

      {isAtLimit ? (
        <div className="p-4 border-t border-border bg-muted/50">
          <p className="text-sm text-muted-foreground text-center mb-2">
            Session limit reached. For deeper help, email michael@mrtek.ai
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="w-full gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Start New Conversation
          </Button>
        </div>
      ) : (
        <>
          <MessageInput
            onSend={sendMessage}
            isLoading={isLoading}
            disabled={isAtLimit}
          />
          <div className="px-4 pb-2 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {50 - messages.filter((m) => m.sender === 'user').length} messages remaining
            </span>
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear chat
            </button>
          </div>
        </>
      )}
    </Card>
  );
};

export default Chatbot;
