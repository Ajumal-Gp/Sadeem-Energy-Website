import { describe, it, expect } from "vitest";
import { matchLocal } from "./engine";

// A wide battery of realistic questions (EN + AR) → the intent each resolves to.
// [question, language, expectedIntent]
const cases: [string, "en" | "ar", string][] = [
  // Greetings
  ["hi", "en", "greeting"],
  ["hello there", "en", "greeting"],
  ["good morning", "en", "greeting"],
  // Services + specific solutions
  ["what services do you offer?", "en", "services"],
  ["what do you do", "en", "services"],
  ["tell me about your solutions", "en", "services"],
  ["do you offer solar panel installation?", "en", "solar"],
  ["district cooling systems", "en", "cooling"],
  ["I need chilled water cooling", "en", "cooling"],
  ["desalination and water treatment", "en", "water"],
  ["smart meters and IoT", "en", "metering"],
  ["AMI infrastructure", "en", "metering"],
  ["waste to energy plants", "en", "waste"],
  ["AI grid management", "en", "grid"],
  ["digital twin and load balancing", "en", "grid"],
  ["radiation auditing and shielding", "en", "radiation"],
  ["peaceful nuclear energy", "en", "nuclear"],
  ["EV charging stations", "en", "ev"],
  // Company
  ["tell me about Sadeem Energy", "en", "about"],
  ["who are you", "en", "about"],
  ["our mission and vision", "en", "mission_vision"],
  ["what are your values", "en", "mission_vision"],
  ["who is the CEO?", "en", "leadership"],
  ["corporate governance", "en", "leadership"],
  ["sustainability and ESG", "en", "sustainability"],
  ["carbon net zero", "en", "sustainability"],
  ["UAE energy strategy 2050", "en", "vision2050"],
  ["national vision alignment", "en", "vision2050"],
  ["show me your projects", "en", "projects"],
  ["case studies portfolio", "en", "projects"],
  ["latest news and press", "en", "news"],
  ["ISO certifications", "en", "certifications"],
  // Contact / people
  ["how can I contact you?", "en", "contact"],
  ["what is your email", "en", "contact"],
  ["phone number", "en", "contact"],
  ["where is your office", "en", "location"],
  ["working hours", "en", "location"],
  ["I want a partnership", "en", "partnership"],
  ["become a supplier", "en", "partnership"],
  ["are you hiring", "en", "careers"],
  ["send my CV", "en", "careers"],
  ["follow you on linkedin", "en", "social"],
  // Human handoff
  ["talk to a real person", "en", "human"],
  ["can I speak to an agent", "en", "human"],
  ["I want to chat with an employee", "en", "human"],
  // Thanks + fallback
  ["thanks a lot", "en", "thanks"],
  ["thank you", "en", "thanks"],
  ["what's the weather on mars", "en", "fallback"],
  ["asdfghjkl qwerty", "en", "fallback"],

  // Arabic
  ["مرحبا", "ar", "greeting"],
  ["ما هي خدماتكم؟", "ar", "services"],
  ["تبريد المناطق", "ar", "cooling"],
  ["تحلية المياه", "ar", "water"],
  ["عدادات ذكية", "ar", "metering"],
  ["مشروع طاقة شمسية", "ar", "solar"],
  ["تحويل النفايات إلى طاقة", "ar", "waste"],
  ["الشبكة الذكية بالذكاء الاصطناعي", "ar", "grid"],
  ["تدقيق إشعاعي", "ar", "radiation"],
  ["طاقة نووية سلمية", "ar", "nuclear"],
  ["من نحن", "ar", "about"],
  ["قيم الشركة", "ar", "mission_vision"],
  ["الرئيس التنفيذي", "ar", "leadership"],
  ["الاستدامة", "ar", "sustainability"],
  ["رؤية الإمارات 2050", "ar", "vision2050"],
  ["اعرض لي مشاريعكم", "ar", "projects"],
  ["آخر الأخبار", "ar", "news"],
  ["شهادات الأيزو", "ar", "certifications"],
  ["كيف أتواصل معكم؟", "ar", "contact"],
  ["أين يقع مكتبكم؟", "ar", "location"],
  ["أريد شراكة", "ar", "partnership"],
  ["الوظائف والتوظيف", "ar", "careers"],
  ["أريد التحدث مع موظف", "ar", "human"],
  ["شكراً", "ar", "thanks"],
];

describe("chatbot QA battery", () => {
  it("routes a wide range of questions to sensible intents", () => {
    let pass = 0;
    const rows: string[] = [];
    const fails: string[] = [];
    for (const [q, lang, expected] of cases) {
      const { intent } = matchLocal(q, lang);
      const ok = intent === expected;
      if (ok) pass++;
      else fails.push(`  ✗ [${lang}] "${q}"  → ${intent}  (expected ${expected})`);
      rows.push(`${ok ? "✓" : "✗"} | ${lang} | ${intent.padEnd(14)} | ${q}`);
    }
    console.log("\n===== CHATBOT QA RESULTS =====\n" + rows.join("\n"));
    console.log(`\nMATCHED: ${pass}/${cases.length}`);
    if (fails.length) console.log("\nMismatches:\n" + fails.join("\n"));

    // Handoff also carries the (updated) WhatsApp number.
    const handoff = matchLocal("talk to a real person", "en");
    const wa = handoff.links?.find((l) => l.variant === "whatsapp");
    console.log("\nWhatsApp handoff link: " + wa?.href);
    expect(wa?.href).toContain("971503751972");

    expect(pass).toBeGreaterThanOrEqual(Math.floor(cases.length * 0.9));
  });
});
