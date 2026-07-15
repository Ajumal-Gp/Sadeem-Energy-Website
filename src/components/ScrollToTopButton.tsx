import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Yield the corner to the chat panel while it is open so the two never overlap.
    const onChatToggle = (e: Event) => setChatOpen((e as CustomEvent<{ open: boolean }>).detail?.open ?? false);
    window.addEventListener("sadeem-chat-toggle", onChatToggle);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("sadeem-chat-toggle", onChatToggle);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !chatOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "hsl(var(--secondary))",
            boxShadow: "0 0 20px rgba(255, 184, 28, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 z-50 w-12 h-12 rounded-2xl bg-primary text-white shadow-2xl flex items-center justify-center transition-all duration-300 group overflow-hidden"
          aria-label="Scroll to top"
        >
          <div className="relative z-10">
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-accent opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
          
          {/* Pulsing ring effect */}
          <span className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-10 -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
