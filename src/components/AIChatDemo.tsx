import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Generate unique session ID for conversation tracking
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const AIChatDemo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionId] = useState(() => generateSessionId());
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to understand your business workflow and help identify automation opportunities. Let's start - what's your name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [clientName, setClientName] = useState("");
  const [conversationEnded, setConversationEnded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const exampleQuestions = [
    "I need to automate customer service responses",
    "How can I automate invoice processing?",
    "Necesito automatizar el seguimiento de leads",
    "¿Cómo automatizar la gestión de inventario?",
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  // Check authentication and set up listener
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleExampleClick = (question: string) => {
    setInput(question);
    setShowExamples(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    
    // Capture client name from first user message
    if (!clientName && messages.length === 1) {
      setClientName(input.trim());
    }
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setShowExamples(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(session ? { "Authorization": `Bearer ${session.access_token}` } : {}),
          },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            sessionId: sessionId,
            clientName: clientName || input.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
        let assistantMessage = "";

        if (reader) {
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantMessage += content;
                  
                  // Check if AI is closing the conversation
                  if (assistantMessage.includes("[CLOSE_CONVERSATION]")) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "assistant",
                        content: "This conversation has been closed due to inappropriate usage. Please start a new conversation if you have genuine automation needs.",
                      },
                    ]);
                    setIsLoading(false);
                    setInput("");
                    return;
                  }
                  
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    
                    if (lastMessage?.role === "assistant") {
                      newMessages[newMessages.length - 1] = {
                        role: "assistant",
                        content: assistantMessage,
                      };
                    } else {
                      newMessages.push({
                        role: "assistant",
                        content: assistantMessage,
                      });
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      }

      // Check if conversation ended (contains WhatsApp link)
      if (assistantMessage.includes("wa.me") && !conversationEnded) {
        setConversationEnded(true);
        // Send email with conversation
        const finalMessages = [...updatedMessages, { role: "assistant", content: assistantMessage }];
        try {
          await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-conversation-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                clientName: clientName || "Cliente Anónimo",
                messages: finalMessages,
              }),
            }
          );
          console.log("Conversation email sent successfully");
        } catch (emailError) {
          console.error("Error sending conversation email:", emailError);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="ai-demo" className="py-12 md:py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Bot className="w-4 h-4" />
            Live AI Demo
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Try Our AI Assistant
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Talk to me in the message box below.{" "}
            <button 
              onClick={() => inputRef.current?.focus()}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Click here to try it!
            </button>
          </p>
        </div>

        {/* WhatsApp-style container with gradient background */}
        <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto relative">
          {/* Compact gradient background */}
          <div className="absolute -inset-4 bg-gradient-to-b from-[#075E54] via-[#128C7E] to-transparent rounded-[2.5rem] opacity-20 blur-2xl" />
          <div className="absolute -inset-2 bg-gradient-to-b from-[#075E54]/30 to-[#128C7E]/30 rounded-[2.5rem]" />
          
          <Card className="relative border-4 border-white/10 shadow-2xl bg-white rounded-3xl overflow-hidden">
            {/* WhatsApp header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">OneHands AI Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
              {session && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  className="text-white hover:bg-white/20"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* WhatsApp chat pattern background */}
            <div className="bg-[#ECE5DD] relative" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23ece5dd'/%3E%3Cpath d='M20 20h60v60H20z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")`,
            }}>
              <ScrollArea ref={scrollAreaRef} className="h-[200px] md:h-[400px] lg:h-[450px] p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                          message.role === "user"
                            ? "bg-[#DCF8C6] text-gray-900 rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none"
                        }`}
                      >
                        {message.role === "assistant" && message.content.includes("[WHATSAPP_BUTTON]") ? (
                          <div className="space-y-3">
                            {message.content.split(/\[WHATSAPP_BUTTON\]|\[\/WHATSAPP_BUTTON\]/).map((part, i) => {
                              if (part.startsWith("https://wa.me/")) {
                                return (
                                  <a
                                    key={i}
                                    href={part.trim()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold rounded-lg transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    Contactar por WhatsApp
                                  </a>
                                );
                              }
                              return part && (
                                <p key={i} className="text-sm whitespace-pre-wrap break-words">
                                  {part}
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        )}
                        <p className="text-[10px] text-gray-500 mt-1 text-right">
                          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

          {/* WhatsApp input area */}
          <div className="bg-[#F0F0F0] p-3 border-t border-gray-200">
            {showExamples && messages.length === 1 && (
              <div className="mb-2">
                <p className="text-xs text-gray-600 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {exampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick(question)}
                      className="text-xs h-auto py-1 px-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="flex-shrink-0 bg-[#25D366] hover:bg-[#20BD5C] text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
