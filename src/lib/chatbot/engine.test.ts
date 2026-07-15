import { describe, it, expect } from "vitest";
import { normalize, matchLocal } from "./engine";

describe("normalize", () => {
  it("lowercases and strips punctuation", () => {
    expect(normalize("Hello, World!")).toBe("hello world");
  });

  it("unifies Arabic alef/hamza, taa-marbuta and diacritics", () => {
    // "أهلاً" and "اهلا" should collapse to the same normalized form.
    expect(normalize("أهلاً")).toBe(normalize("اهلا"));
  });
});

describe("matchLocal — English", () => {
  it("greets on a greeting", () => {
    expect(matchLocal("hi there", "en").intent).toBe("greeting");
  });

  it("routes service questions to the services intent", () => {
    expect(matchLocal("What services do you offer?", "en").intent).toBe("services");
  });

  it("matches specific solutions", () => {
    expect(matchLocal("tell me about district cooling", "en").intent).toBe("cooling");
    expect(matchLocal("do you do solar panels?", "en").intent).toBe("solar");
    expect(matchLocal("desalination and water", "en").intent).toBe("water");
  });

  it("prefers the specific solution over the generic services overview", () => {
    // A generic verb like "offer" must not drown out the specific topic.
    expect(matchLocal("Do you offer solar panel installation?", "en").intent).toBe("solar");
    expect(matchLocal("do you offer district cooling", "en").intent).toBe("cooling");
    // But a genuinely broad ask still lands on the overview.
    expect(matchLocal("what services do you offer?", "en").intent).toBe("services");
    expect(matchLocal("what do you do", "en").intent).toBe("services");
  });

  it("surfaces contact details with links", () => {
    const res = matchLocal("how can I contact you", "en");
    expect(res.intent).toBe("contact");
    expect(res.text).toContain("info@sadeemenergy.com");
    expect(res.links && res.links.length).toBeGreaterThan(0);
  });

  it("answers about the CEO / leadership", () => {
    expect(matchLocal("who is the CEO?", "en").intent).toBe("leadership");
  });

  it("routes 'talk to a human' to the live-agent handoff with a WhatsApp link", () => {
    const res = matchLocal("I want to talk to a real person", "en");
    expect(res.intent).toBe("human");
    expect(res.links?.some((l) => l.variant === "whatsapp")).toBe(true);
    expect(matchLocal("can I speak to an agent", "en").intent).toBe("human");
  });

  it("falls back when nothing matches", () => {
    expect(matchLocal("what's the weather on mars", "en").intent).toBe("fallback");
  });
});

describe("matchLocal — Arabic", () => {
  it("greets in Arabic", () => {
    expect(matchLocal("مرحبا", "ar").intent).toBe("greeting");
  });

  it("routes Arabic service questions", () => {
    expect(matchLocal("ما هي خدماتكم؟", "ar").intent).toBe("services");
  });

  it("matches Arabic contact intent and returns Arabic text", () => {
    const res = matchLocal("كيف اتواصل معكم", "ar");
    expect(res.intent).toBe("contact");
    expect(res.text).toContain("info@sadeemenergy.com");
  });

  it("returns localized text per language for the same intent", () => {
    const en = matchLocal("sustainability", "en");
    const ar = matchLocal("الاستدامة", "ar");
    expect(en.intent).toBe("sustainability");
    expect(ar.intent).toBe("sustainability");
    expect(en.text).not.toBe(ar.text);
  });

  it("routes the Arabic human-handoff request", () => {
    expect(matchLocal("أريد التحدث مع موظف", "ar").intent).toBe("human");
  });
});
