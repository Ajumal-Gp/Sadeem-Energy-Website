import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import { X, Send, Sparkles, ArrowUpRight, ExternalLink, Headset } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { getResponse, type ChatTurn } from "@/lib/chatbot/engine";
import { GREETING, HANDOFF, QUICK_REPLIES, type ChatLink } from "@/lib/chatbot/knowledge";
import assistantAnimation from "@/assets/assistant-lottie.json";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  links?: ChatLink[];
}

const uid = () => Math.random().toString(36).slice(2);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const UI = {
  title: { en: "Sadeem Assistant", ar: "مساعد سديم" },
  subtitle: { en: "Online · replies instantly", ar: "متصل · يرد فوراً" },
  placeholder: { en: "Ask about our energy solutions…", ar: "اسأل عن حلول الطاقة لدينا…" },
  open: { en: "Chat with us", ar: "تحدث معنا" },
  send: { en: "Send", ar: "إرسال" },
  close: { en: "Close chat", ar: "إغلاق المحادثة" },
  suggested: { en: "Suggested questions", ar: "أسئلة مقترحة" },
  human: { en: "Talk to a real person", ar: "التحدث مع موظف حقيقي" },
} as const;

// WhatsApp glyph (lucide-react ships no brand icons).
const WhatsAppIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Renders the dotLottie digital-assistant icon in isolation. Memoized and prop-less
// so its internal load state never re-renders — and stalls — the launcher animation.
const AssistantLottie = memo(() => {
  const { View } = useLottie(
    { animationData: assistantAnimation, loop: true, autoplay: true },
    { width: "100%", height: "100%" },
  );
  return <>{View}</>;
});
AssistantLottie.displayName = "AssistantLottie";

const Chatbot = () => {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed the greeting the first time the panel is opened.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: uid(), role: "bot", text: GREETING[language] }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Let sibling floating buttons (e.g. scroll-to-top) yield the corner while open.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("sadeem-chat-toggle", { detail: { open } }));
  }, [open]);

  // Focus the input when the panel opens; close on Escape.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || isTyping) return;

    const history: ChatTurn[] = messages.map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Resolve the reply, but keep the typing indicator up long enough to feel natural.
    const [res] = await Promise.all([getResponse(text, language, history), wait(650)]);

    setIsTyping(false);
    setMessages((prev) => [...prev, { id: uid(), role: "bot", text: res.text, links: res.links }]);
  };

  const handleLink = (link: ChatLink) => {
    if (link.to) {
      navigate(link.to);
      setOpen(false);
    } else if (link.href) {
      window.open(link.href, link.href.startsWith("http") ? "_blank" : "_self", "noopener,noreferrer");
    }
  };

  // Live-agent handoff: drop the "connect with our team" card into the thread.
  const triggerHandoff = () => {
    setMessages((prev) => [...prev, { id: uid(), role: "bot", text: HANDOFF.text[language], links: HANDOFF.links }]);
  };

  const lastIsBot = messages.length > 0 && messages[messages.length - 1].role === "bot";
  const showSuggestions = !isTyping && lastIsBot;

  const botJustify = isRTL ? "justify-end" : "justify-start";
  const userJustify = isRTL ? "justify-start" : "justify-end";

  return (
    <>
      {/* Launcher — fully transparent: only the animated assistant floats, no backdrop.
          Visible by default (no entrance animation that could stall at opacity:0). */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={UI.open[language]}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-20 h-20 group transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          {/* Animated digital assistant (drop-shadow gives depth without a background) */}
          <span className="relative z-10 w-20 h-20 pointer-events-none drop-shadow-lg">
            <AssistantLottie />
          </span>
        </button>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            dir={isRTL ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed z-50 flex flex-col overflow-hidden bg-card shadow-2xl border border-border
                       bottom-0 right-0 left-0 h-[85vh] rounded-t-[2rem]
                       sm:bottom-6 sm:right-6 sm:left-auto sm:w-[400px] sm:h-[600px] sm:max-h-[80vh] sm:rounded-[1.75rem]"
            role="dialog"
            aria-label={UI.title[language]}
          >
            {/* Header */}
            <div className="relative shrink-0 hero-gradient text-white px-5 py-4">
              <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                <div className="relative w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                  <Sparkles size={22} className="text-secondary" />
                </div>
                <div className={cn("flex-1 min-w-0", isRTL ? "text-right" : "text-left")}>
                  <h3 className="font-display font-black text-base leading-tight truncate">{UI.title[language]}</h3>
                  <p className="text-[11px] font-medium text-white/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    {UI.subtitle[language]}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={UI.close[language]}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Live-agent handoff bar */}
            <button
              onClick={triggerHandoff}
              className={cn(
                "shrink-0 flex items-center justify-center gap-2 py-2.5 text-xs font-bold border-b border-border bg-secondary/15 text-primary hover:bg-secondary/25 transition-colors",
                isRTL && "flex-row-reverse",
              )}
            >
              <Headset size={15} />
              {UI.human[language]}
            </button>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/30">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "bot" ? botJustify : userJustify)}>
                  <div className={cn("max-w-[85%] flex flex-col gap-2", m.role === "user" && "items-end")}>
                    <div
                      className={cn(
                        "px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm",
                        m.role === "bot"
                          ? "bg-card text-foreground rounded-2xl rounded-tl-md border border-border"
                          : "bg-primary text-white rounded-2xl rounded-tr-md",
                        isRTL && "text-right",
                      )}
                    >
                      {m.text}
                    </div>

                    {/* Contextual links */}
                    {m.links && m.links.length > 0 && (
                      <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                        {m.links.map((link, i) => {
                          const isWa = link.variant === "whatsapp";
                          return (
                            <button
                              key={i}
                              onClick={() => handleLink(link)}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
                                isWa
                                  ? "bg-[#25D366] text-white border-[#25D366] hover:bg-[#1da851]"
                                  : "bg-secondary/15 text-primary border-secondary/40 hover:bg-secondary hover:text-secondary-foreground",
                              )}
                            >
                              {isWa && <WhatsAppIcon size={14} />}
                              {link.label[language]}
                              {!isWa && (link.to ? <ArrowUpRight size={13} /> : <ExternalLink size={12} />)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className={cn("flex", botJustify)}>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/50"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && (
                <div className="pt-1">
                  <p className={cn("text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2", isRTL ? "text-right" : "text-left")}>
                    {UI.suggested[language]}
                  </p>
                  <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                    {QUICK_REPLIES.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => send(q.text[language])}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-card border border-border
                                   text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
                      >
                        {q.text[language]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border bg-card p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={UI.placeholder[language]}
                  aria-label={UI.placeholder[language]}
                  className={cn(
                    "flex-1 min-w-0 px-4 py-3 rounded-2xl border border-input bg-background text-sm font-medium text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",
                    isRTL && "text-right",
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label={UI.send[language]}
                  className="w-11 h-11 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center
                             hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={18} className={isRTL ? "rotate-180" : ""} />
                </button>
              </form>
              <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-70">
                {language === "en"
                  ? "Sadeem Energy · Sustainable · Dependable · Nuclear"
                  : "سديم للطاقة · مستدام · موثوق · نووي"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
