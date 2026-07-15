// Lightweight intent-matching engine for the Sadeem Energy assistant.
//
// Everything runs in the browser — no API keys, no backend required — so the
// bot works on static hosting exactly like the rest of the site. If a remote
// LLM endpoint is configured via VITE_CHAT_API_URL, `getResponse` will try it
// first and gracefully fall back to the local knowledge base on any failure.

import {
  INTENTS,
  FALLBACK,
  GREETING,
  type ChatIntent,
  type ChatLink,
  type Lang,
} from "./knowledge";

export interface BotResponse {
  text: string;
  links?: ChatLink[];
  /** Intent id that matched, or "greeting" / "fallback". Useful for testing. */
  intent: string;
}

/**
 * Normalize free text for robust matching.
 * - lowercases and collapses whitespace
 * - strips Arabic diacritics (tashkeel) and the tatweel
 * - unifies alef/hamza, taa-marbuta and alef-maqsura variants
 * - drops punctuation so "hi!" == "hi"
 */
export function normalize(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, "") // tashkeel + tatweel
    .replace(/[آأإٱ]/g, "ا") // آ أ إ ٱ -> ا
    .replace(/ة/g, "ه") // ة -> ه
    .replace(/ى/g, "ي") // ى -> ي
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // punctuation/emoji -> space
    // Strip the Arabic definite article "ال" (and attached prepositions و/ف/ب/ك)
    // so "الشبكة"/"بالذكاء" match the keywords "شبكة"/"ذكاء".
    .replace(/(^|\s)(?:و|ف|ب|ك)?ال(?=[؀-ۿ])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

const GREETING_WORDS = [
  "hi", "hello", "hey", "yo", "hiya", "greetings", "good morning",
  "good evening", "good afternoon", "salam", "salaam", "assalam",
  "مرحبا", "مرحبتين", "اهلا", "أهلا", "السلام", "هلا", "صباح", "مساء",
];

const THANKS_WORDS = [
  "thanks", "thank you", "thankyou", "thx", "appreciate", "cheers",
  "شكرا", "شكرًا", "مشكور", "يعطيك", "ممتن",
];

const THANKS_REPLY: Record<Lang, string> = {
  en: "You're welcome! 😊 Is there anything else I can help you with — services, projects, or getting in touch?",
  ar: "على الرحب والسعة! 😊 هل هناك أي شيء آخر أستطيع مساعدتك به — الخدمات أو المشاريع أو التواصل؟",
};

/** True when the whole message is essentially a greeting. */
function isGreeting(norm: string): boolean {
  if (!norm) return false;
  const words = norm.split(" ");
  if (words.length > 4) return false;
  return GREETING_WORDS.some((g) => {
    const gn = normalize(g);
    return norm === gn || words.includes(gn) || norm.startsWith(gn + " ");
  });
}

function isThanks(norm: string): boolean {
  return THANKS_WORDS.some((w) => norm.includes(normalize(w)));
}

/** Score how well a message matches an intent. Higher = better. */
function scoreIntent(norm: string, intent: ChatIntent): number {
  const keywords = [...intent.keywords.en, ...intent.keywords.ar];
  let score = 0;
  for (const kw of keywords) {
    const nkw = normalize(kw);
    if (!nkw) continue;
    if (nkw.includes(" ")) {
      // Multi-word phrase: strong signal when the full phrase appears.
      if (norm.includes(nkw)) score += 3 + nkw.split(" ").length;
    } else {
      // Single word: match on token boundaries to avoid false positives.
      const re = new RegExp(`(^|\\s)${escapeRegExp(nkw)}(\\s|$)`, "u");
      if (re.test(norm)) score += 2;
      else if (nkw.length >= 5 && norm.includes(nkw)) score += 1; // partial/substring
    }
  }
  return score;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Resolve a user message to a response using the local knowledge base.
 * Deterministic and synchronous — safe to unit test.
 */
export function matchLocal(message: string, lang: Lang): BotResponse {
  const norm = normalize(message);

  if (isGreeting(norm)) {
    return { text: GREETING[lang], intent: "greeting" };
  }
  if (isThanks(norm)) {
    return { text: THANKS_REPLY[lang], intent: "thanks" };
  }

  let best: ChatIntent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = scoreIntent(norm, intent);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (best && bestScore > 0) {
    return { text: best.answer[lang], links: best.links, intent: best.id };
  }
  return { text: FALLBACK[lang], intent: "fallback" };
}

const REMOTE_URL: string | undefined = import.meta.env?.VITE_CHAT_API_URL;

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/**
 * Get a response for a user message.
 *
 * If VITE_CHAT_API_URL is set, POSTs { message, lang, history } and expects
 * `{ reply: string }` back (an easy hook for an Ollama/OpenAI proxy later).
 * On any error — or when no endpoint is configured — it falls back to the
 * local knowledge base so the assistant always works.
 */
export async function getResponse(
  message: string,
  lang: Lang,
  history: ChatTurn[] = [],
): Promise<BotResponse> {
  if (REMOTE_URL) {
    try {
      const res = await fetch(REMOTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, lang, history }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.reply === "string" && data.reply.trim()) {
          return { text: data.reply, intent: "remote", links: data.links };
        }
      }
    } catch {
      // Silent fall-through to the local knowledge base.
    }
  }
  return matchLocal(message, lang);
}
