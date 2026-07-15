// Knowledge base for the Sadeem Energy assistant.
//
// This powers a fully client-side, bilingual (EN/AR) chatbot. Every answer is
// sourced from the site's own content so the assistant never invents facts.
// Add or edit an intent below to teach the assistant something new — no backend
// required. (An optional LLM backend can be wired via VITE_CHAT_API_URL; see
// engine.ts.)

export type Lang = "en" | "ar";

export interface Bilingual {
  en: string;
  ar: string;
}

export interface ChatLink {
  /** Internal route (react-router) — starts with "/". */
  to?: string;
  /** External / protocol URL (mailto:, tel:, https:). Opens in a new tab. */
  href?: string;
  label: Bilingual;
  /** Visual treatment. "whatsapp" renders a distinct green WhatsApp button. */
  variant?: "whatsapp";
}

export interface ChatIntent {
  id: string;
  /** Keywords/phrases that map a user message to this intent, per language. */
  keywords: { en: string[]; ar: string[] };
  answer: Bilingual;
  links?: ChatLink[];
}

export interface QuickReply {
  /** The message that gets "sent" when the chip is tapped. */
  text: Bilingual;
}

/** Company facts reused across several answers. */
export const COMPANY = {
  email: "info@sadeemenergy.com",
  phones: ["+971 50 194 7777", "+971 425 990 11"],
  phoneTels: ["+971501947777", "+97142599011"],
  // WhatsApp business line (mobile) — digits only, for wa.me links.
  whatsapp: "971503751972",
  address: {
    en: "Dubai, Deira, Al Qaizi Building, Office No. 202B",
    ar: "دبي، ديرة، مبنى القيزي، مكتب رقم 202B",
  },
  hours: {
    en: "Sunday – Friday, 9:00 AM – 5:00 PM (Sat & Sun closed)",
    ar: "الإثنين – الجمعة، 9:00 صباحاً – 5:00 مساءً (السبت والأحد إجازة)",
  },
  social: {
    linkedin: "https://ae.linkedin.com/company/sadeemenergy",
    instagram: "https://www.instagram.com/sadeem.energy/",
    youtube: "https://www.youtube.com/@Sadeem_Energy",
    tiktok: "https://www.tiktok.com/@sadeem_energy",
  },
};

export const GREETING: Bilingual = {
  en: "Hi! 👋 I'm the Sadeem Energy assistant. I can tell you about our energy & water solutions, projects, sustainability, and how to get in touch. What would you like to know?",
  ar: "مرحباً! 👋 أنا مساعد سديم للطاقة. يمكنني إخبارك عن حلولنا في الطاقة والمياه، ومشاريعنا، والاستدامة، وكيفية التواصل معنا. كيف أستطيع مساعدتك؟",
};

export const FALLBACK: Bilingual = {
  en: "I'm not fully sure about that one. I can help with our services, projects, sustainability, leadership, or contact details — or I can connect you with a real member of our team. Just say \"talk to a person\".",
  ar: "لست متأكداً تماماً من ذلك. يمكنني المساعدة في خدماتنا أو مشاريعنا أو الاستدامة أو القيادة أو بيانات التواصل — أو يمكنني ربطك بأحد أعضاء فريقنا الحقيقيين. فقط اكتب «التحدث مع موظف».",
};

// Live-agent handoff — connects the visitor to a real member of the team.
// WhatsApp is the fastest real-time channel; call/email/form are fallbacks.
const WA_TEXT = encodeURIComponent("Hello Sadeem Energy, I'd like to speak with a representative.");
export const HANDOFF: { text: Bilingual; links: ChatLink[] } = {
  text: {
    en: "Of course — I'll connect you with a real member of the Sadeem Energy team. WhatsApp is usually the fastest way to reach us during working hours, or you can call, email, or send an inquiry:",
    ar: "بكل سرور — سأوصلك بأحد أعضاء فريق سديم للطاقة الحقيقيين. عادةً يكون واتساب أسرع وسيلة للتواصل خلال ساعات العمل، أو يمكنك الاتصال أو المراسلة أو إرسال استفسار:",
  },
  links: [
    { href: `https://wa.me/${COMPANY.whatsapp}?text=${WA_TEXT}`, label: { en: "Chat on WhatsApp", ar: "الدردشة عبر واتساب" }, variant: "whatsapp" },
    { href: `tel:${COMPANY.phoneTels[0]}`, label: { en: "Call us", ar: "اتصل بنا" } },
    { href: `mailto:${COMPANY.email}`, label: { en: "Email us", ar: "راسلنا" } },
    { to: "/contact", label: { en: "Send an inquiry", ar: "أرسل استفساراً" } },
  ],
};

/** Suggested prompts shown under the greeting / as follow-ups. */
export const QUICK_REPLIES: QuickReply[] = [
  { text: { en: "What services do you offer?", ar: "ما هي خدماتكم؟" } },
  { text: { en: "Tell me about Sadeem Energy", ar: "عرّفني بسديم للطاقة" } },
  { text: { en: "Show me your projects", ar: "اعرض لي مشاريعكم" } },
  { text: { en: "How can I contact you?", ar: "كيف أتواصل معكم؟" } },
  { text: { en: "Sustainability & ESG", ar: "الاستدامة والحوكمة" } },
  { text: { en: "Talk to a real person", ar: "التحدث مع موظف حقيقي" } },
];

export const INTENTS: ChatIntent[] = [
  // ── Services overview ──────────────────────────────────────────────
  {
    id: "services",
    keywords: {
      // Kept intentionally broad but NOT generic verbs like "offer"/"products",
      // so specific solution questions (e.g. "do you offer solar?") win the match.
      en: ["service", "services", "solution", "solutions", "capabilities", "expertise", "what do you do", "what do you offer", "what can you do", "list of services"],
      ar: ["خدمة", "خدمات", "حلول", "حل", "ماذا تعملون", "ماذا تقدمون", "قدرات", "خبرات"],
    },
    answer: {
      en: "Sadeem Energy delivers integrated utility solutions that blend advanced engineering with AI:\n\n• District Cooling — centralized, high-efficiency cooling\n• Water Sustainability — SWRO desalination & the complete water cycle\n• Smart Metering & IoT — real-time AMI infrastructure\n• Solar Energy (Shams) — utility-scale PV & rooftop solar\n• Waste-to-Energy — clean base-load power from waste\n• AI Grid Management — predictive, autonomous grids\n• Radiation Auditing & Safety — nuclear safety & compliance\n• EV Infrastructure — charging networks\n\nWant details on any one?",
      ar: "تقدّم سديم للطاقة حلول مرافق متكاملة تجمع بين الهندسة المتقدمة والذكاء الاصطناعي:\n\n• تبريد المناطق — تبريد مركزي عالي الكفاءة\n• استدامة المياه — تحلية المياه (SWRO) ودورة المياه الكاملة\n• العدادات الذكية وإنترنت الأشياء — بنية قياس لحظية\n• الطاقة الشمسية (شمس) — محطات كهروضوئية ضخمة وأسطح\n• تحويل النفايات إلى طاقة — طاقة نظيفة من النفايات\n• إدارة الشبكة بالذكاء الاصطناعي — شبكات تنبؤية ذاتية\n• تدقيق الإشعاع والسلامة — سلامة نووية وامتثال\n• بنية شحن المركبات الكهربائية\n\nهل تريد تفاصيل عن أيٍّ منها؟",
    },
    links: [{ to: "/services", label: { en: "Explore all services", ar: "استكشف كل الخدمات" } }],
  },

  // ── Talk to a human (live-agent handoff) ───────────────────────────
  {
    id: "human",
    keywords: {
      en: ["human", "agent", "real person", "real human", "representative", "speak to someone", "talk to someone", "talk to a person", "talk to a human", "live agent", "live chat", "employee", "staff", "operator", "advisor", "someone real"],
      ar: ["موظف", "انسان", "إنسان", "بشري", "شخص حقيقي", "وكيل", "ممثل", "مستشار", "تحدث مع شخص", "اتحدث مع موظف", "موظف حقيقي", "مندوب"],
    },
    answer: HANDOFF.text,
    links: HANDOFF.links,
  },

  // ── Individual services ────────────────────────────────────────────
  {
    id: "cooling",
    keywords: {
      en: ["cooling", "district cooling", "chilled", "hvac", "air conditioning"],
      ar: ["تبريد", "تبريد المناطق", "تكييف"],
    },
    answer: {
      en: "Our District Cooling systems provide centralized, high-efficiency cooling for high-density urban developments — cutting energy use versus conventional AC while improving reliability across whole districts.",
      ar: "توفّر أنظمة تبريد المناطق لدينا تبريداً مركزياً عالي الكفاءة للمناطق الحضرية عالية الكثافة — مما يقلّل استهلاك الطاقة مقارنةً بالتكييف التقليدي ويحسّن الموثوقية على مستوى أحياء كاملة.",
    },
    links: [{ to: "/services", label: { en: "District Cooling details", ar: "تفاصيل تبريد المناطق" } }],
  },
  {
    id: "water",
    keywords: {
      en: ["water", "desalination", "swro", "wastewater", "irrigation", "purification", "water cycle"],
      ar: ["مياه", "ماء", "تحلية", "صرف", "ري", "تنقية", "دورة المياه"],
    },
    answer: {
      en: "Our Water Sustainability practice covers the complete water cycle: SWRO desalination, purification, wastewater treatment, industrial water, smart distribution and smart irrigation — engineered for national water security.",
      ar: "تغطّي ممارسة استدامة المياه لدينا دورة المياه الكاملة: تحلية المياه (SWRO)، والتنقية، ومعالجة مياه الصرف، والمياه الصناعية، والتوزيع الذكي، والري الذكي — بما يخدم الأمن المائي الوطني.",
    },
    links: [{ to: "/services", label: { en: "Water solutions", ar: "حلول المياه" } }],
  },
  {
    id: "metering",
    keywords: {
      en: ["meter", "metering", "smart meter", "iot", "ami", "sensors", "monitoring"],
      ar: ["عداد", "عدادات", "عدادات ذكية", "إنترنت الأشياء", "استشعار", "مراقبة"],
    },
    answer: {
      en: "Our Smart Metering & IoT (AMI) infrastructure delivers real-time consumption data and full transparency, giving operators and customers precise, actionable insight into energy and water use.",
      ar: "توفّر بنية العدادات الذكية وإنترنت الأشياء (AMI) لدينا بيانات استهلاك لحظية وشفافية كاملة، مما يمنح المشغّلين والعملاء رؤية دقيقة وقابلة للتنفيذ حول استهلاك الطاقة والمياه.",
    },
    links: [{ to: "/services", label: { en: "Smart metering details", ar: "تفاصيل العدادات الذكية" } }],
  },
  {
    id: "solar",
    keywords: {
      en: ["solar", "shams", "pv", "photovoltaic", "panels", "renewable generation", "csp"],
      ar: ["شمسية", "شمس", "طاقة شمسية", "كهروضوئية", "ألواح", "متجددة"],
    },
    answer: {
      en: "Under our Solar Energy (Shams) programme we build utility-scale PV plants and decentralized rooftop networks, backed by advanced PV technology and AI grid management — part of pioneering Shams Dubai projects.",
      ar: "ضمن برنامج الطاقة الشمسية (شمس)، ننشئ محطات كهروضوئية بحجم المرافق وشبكات أسطح لامركزية، مدعومةً بتقنيات كهروضوئية متقدمة وإدارة شبكة بالذكاء الاصطناعي — ضمن مشاريع شمس دبي الرائدة.",
    },
    links: [{ to: "/services", label: { en: "Solar & generation", ar: "الطاقة الشمسية والتوليد" } }],
  },
  {
    id: "waste",
    keywords: {
      en: ["waste", "waste-to-energy", "waste to energy", "biomass", "bioenergy", "incineration"],
      ar: ["نفايات", "تحويل النفايات", "طاقة حيوية", "كتلة حيوية"],
    },
    answer: {
      en: "Our Waste-to-Energy plants transform urban waste into clean, base-load steam and electricity — reducing landfill while adding reliable low-carbon capacity to the grid.",
      ar: "تحوّل محطات تحويل النفايات إلى طاقة لدينا النفايات الحضرية إلى بخار وكهرباء نظيفة كحِمل أساسي — مما يقلّل من مكبّات النفايات ويضيف قدرة موثوقة ومنخفضة الكربون للشبكة.",
    },
    links: [{ to: "/services", label: { en: "Waste-to-Energy", ar: "تحويل النفايات إلى طاقة" } }],
  },
  {
    id: "grid",
    keywords: {
      en: ["grid", "ai grid", "load balancing", "smart grid", "digital twin", "automation", "electrical infrastructure", "substation", "transmission"],
      ar: ["شبكة", "شبكة ذكية", "ذكاء اصطناعي", "توأم رقمي", "توازن الحمل", "بنية كهربائية", "محطة تحويل", "نقل"],
    },
    answer: {
      en: "Our AI-Driven Grid provides predictive load balancing and autonomous grid management, plus resilient transmission networks, substations and full grid electrification — supported by digital-twin simulation.",
      ar: "توفّر شبكتنا المدارة بالذكاء الاصطناعي توازناً تنبؤياً للأحمال وإدارة ذاتية للشبكة، إلى جانب شبكات نقل مرنة ومحطات تحويل وكهربة شاملة للشبكة — مدعومةً بمحاكاة التوأم الرقمي.",
    },
    links: [{ to: "/services", label: { en: "AI grid management", ar: "إدارة الشبكة بالذكاء الاصطناعي" } }],
  },
  {
    id: "radiation",
    keywords: {
      en: ["radiation", "nuclear safety", "shielding", "dose", "auditing", "radiological"],
      ar: ["إشعاع", "سلامة نووية", "تدريع", "جرعة", "تدقيق إشعاعي"],
    },
    answer: {
      en: "Our Radiation Auditing & Safety service provides state-of-the-art diagnostic surveying, shielding validation and dose monitoring to ensure maximum nuclear safety and full regulatory compliance.",
      ar: "توفّر خدمة تدقيق الإشعاع والسلامة لدينا مسحاً تشخيصياً متطوراً، والتحقق من التدريع، ومراقبة الجرعات لضمان أعلى مستويات السلامة النووية والامتثال التنظيمي الكامل.",
    },
    links: [{ to: "/services", label: { en: "Radiation & safety", ar: "الإشعاع والسلامة" } }],
  },
  {
    id: "nuclear",
    keywords: {
      en: ["nuclear", "peaceful nuclear", "atomic", "reactor"],
      ar: ["نووي", "نووية", "طاقة نووية", "مفاعل"],
    },
    answer: {
      en: "Peaceful nuclear energy is central to Sadeem Energy's vision for a carbon-neutral future. We pair it with advanced renewables and rigorous Radiation Auditing & Safety to deliver dependable, low-carbon base-load power.",
      ar: "تُعدّ الطاقة النووية السلمية محوراً في رؤية سديم للطاقة نحو مستقبل خالٍ من الكربون. نجمعها مع مصادر متجددة متقدمة وتدقيق صارم للإشعاع والسلامة لتوفير طاقة أساسية موثوقة ومنخفضة الكربون.",
    },
    links: [{ to: "/services", label: { en: "See our capabilities", ar: "اطّلع على قدراتنا" } }],
  },
  {
    id: "ev",
    keywords: {
      en: ["ev", "electric vehicle", "charging", "charger", "e-mobility", "mobility"],
      ar: ["مركبات كهربائية", "شحن", "شاحن", "تنقل كهربائي"],
    },
    answer: {
      en: "We design and deploy EV charging infrastructure — from individual chargers to networked corridors — integrated with our smart grid for efficient, future-ready e-mobility.",
      ar: "نصمّم وننشر بنية شحن المركبات الكهربائية — من الشواحن الفردية إلى الممرات المترابطة — مدمجة مع شبكتنا الذكية لتنقّل كهربائي فعّال وجاهز للمستقبل.",
    },
    links: [{ to: "/services", label: { en: "EV infrastructure", ar: "بنية شحن المركبات" } }],
  },

  // ── About / company ────────────────────────────────────────────────
  {
    id: "about",
    keywords: {
      en: ["about", "who are you", "company", "sadeem", "history", "story", "background", "founded", "established"],
      ar: ["من نحن", "عن الشركة", "من انتم", "سديم", "تاريخ", "قصة", "تأسست", "خلفية"],
    },
    answer: {
      en: "Sadeem Energy is a UAE-born utility titan engineering a sustainable, smart-managed energy future. We're the technological heartbeat of the UAE's sustainable urban evolution — managing critical infrastructure across sustainable and peaceful nuclear energy that supports millions of lives and thousands of businesses.",
      ar: "سديم للطاقة شركة مرافق إماراتية المنشأ تهندس مستقبلاً مستداماً للطاقة يُدار بذكاء. نحن النبض التقني للتطور الحضري المستدام في الإمارات — ندير بنية تحتية حيوية في مجالي الطاقة المستدامة والنووية السلمية تدعم ملايين الأرواح وآلاف الأعمال.",
    },
    links: [{ to: "/about", label: { en: "About Sadeem Energy", ar: "عن سديم للطاقة" } }],
  },
  {
    id: "mission_vision",
    keywords: {
      en: ["mission", "vision", "values", "purpose", "goal", "believe"],
      ar: ["رسالة", "رؤية", "قيم", "هدف", "غاية", "نؤمن"],
    },
    answer: {
      en: "Mission: to architect and operate the world's most resilient smart energy infrastructure, using AI and renewables to ensure sustainable urban growth and resource security.\n\nVision: to be the global benchmark for carbon-neutral utility solutions. Our values — Integrity, Innovation, Sustainability and Excellence — guide every megawatt and gallon we deliver.",
      ar: "الرسالة: تصميم وتشغيل أكثر بنى الطاقة الذكية مرونةً في العالم، باستخدام الذكاء الاصطناعي والمصادر المتجددة لضمان نمو حضري مستدام وأمن للموارد.\n\nالرؤية: أن نكون المعيار العالمي لحلول المرافق المحايدة كربونياً. وقيمنا — النزاهة والابتكار والاستدامة والتميّز — توجّه كل ميغاواط وكل جالون نقدّمه.",
    },
    links: [{ to: "/about", label: { en: "Our mission & values", ar: "رسالتنا وقيمنا" } }],
  },
  {
    id: "leadership",
    keywords: {
      en: ["leadership", "ceo", "founder", "chairman", "management", "board", "governance", "team", "director"],
      ar: ["قيادة", "الرئيس التنفيذي", "مؤسس", "رئيس مجلس", "إدارة", "مجلس", "حوكمة", "فريق"],
    },
    answer: {
      en: "Sadeem Energy is led by Dr. Ahmed Mohammed Al Ali, CEO & Founder of Sadeem Energy and Grow Plus Technologies — an expert in peaceful nuclear and sustainable energy. We operate under a world-class governance framework aligned with OECD principles, with dedicated Audit & Risk, Strategy & Investment, Sustainability, and Nomination committees.",
      ar: "يقود سديم للطاقة الدكتور أحمد محمد العلي، الرئيس التنفيذي والمؤسس لسديم للطاقة وشركة Grow Plus Technologies — وهو خبير في الطاقة النووية السلمية والمستدامة. نعمل ضمن إطار حوكمة عالمي المستوى متوافق مع مبادئ OECD، مع لجان متخصصة للتدقيق والمخاطر، والاستراتيجية والاستثمار، والاستدامة، والترشيحات.",
    },
    links: [{ to: "/leadership", label: { en: "Governance & leadership", ar: "الحوكمة والقيادة" } }],
  },

  // ── Sustainability / vision / projects / news ──────────────────────
  {
    id: "sustainability",
    keywords: {
      en: ["sustainability", "esg", "environment", "carbon", "net zero", "green", "climate", "un sdg", "sdg", "recycled"],
      ar: ["استدامة", "حوكمة بيئية", "بيئة", "كربون", "صفر انبعاثات", "مناخ", "أهداف التنمية"],
    },
    answer: {
      en: "Sustainability is embedded in every megawatt we manage. Our ESG strategy spans Environmental (carbon displacement via nuclear & renewables), Social (national workforce training & community engagement) and Governance (the region's most transparent utility framework), and maps directly to the UN Sustainable Development Goals.",
      ar: "الاستدامة جزء من كل ميغاواط نديره. تمتد استراتيجيتنا للحوكمة البيئية والاجتماعية عبر: البيئة (خفض الكربون عبر الطاقة النووية والمتجددة)، والمجتمع (تدريب الكوادر الوطنية وإشراك المجتمع)، والحوكمة (أكثر أطر المرافق شفافيةً في المنطقة)، وترتبط مباشرةً بأهداف الأمم المتحدة للتنمية المستدامة.",
    },
    links: [{ to: "/sustainability", label: { en: "Sustainability & ESG", ar: "الاستدامة والحوكمة" } }],
  },
  {
    id: "vision2050",
    keywords: {
      en: ["2050", "2071", "uae vision", "national", "strategy", "d33", "cop28", "energy strategy", "alignment", "government"],
      ar: ["2050", "2071", "رؤية الإمارات", "وطني", "استراتيجية", "حكومة", "توافق"],
    },
    answer: {
      en: "Sadeem Energy is engineered to execute the national vision. Our operations map to the UAE Energy Strategy 2050, Net Zero 2050, the Dubai Clean Energy Strategy, D33, COP28 outcomes, the Dubai Quality of Life Strategy 2033 and more — with a roadmap reaching toward 2071.",
      ar: "صُمّمت سديم للطاقة لتنفيذ الرؤية الوطنية. ترتبط عملياتنا باستراتيجية الطاقة الإماراتية 2050، والحياد المناخي 2050، واستراتيجية دبي للطاقة النظيفة، وأجندة D33، ومخرجات COP28، واستراتيجية دبي لجودة الحياة 2033 وغيرها — ضمن خارطة طريق تمتد حتى 2071.",
    },
    links: [{ to: "/vision", label: { en: "National vision alignment", ar: "التوافق مع الرؤية الوطنية" } }],
  },
  {
    id: "projects",
    keywords: {
      en: ["project", "projects", "portfolio", "case study", "case studies", "clients", "work", "flagship", "deployments"],
      ar: ["مشروع", "مشاريع", "أعمال", "دراسة حالة", "عملاء", "محفظة"],
    },
    answer: {
      en: "Our portfolio delivers massive-scale energy and water infrastructure for the region's most ambitious urban visions — flagship strategic initiatives alongside diversified urban-impact projects. Take a look at the case portfolio.",
      ar: "تقدّم محفظتنا بنية تحتية للطاقة والمياه بحجم ضخم لأكثر الرؤى الحضرية طموحاً في المنطقة — مبادرات استراتيجية رائدة إلى جانب مشاريع متنوعة ذات أثر حضري. اطّلع على محفظة الأعمال.",
    },
    links: [{ to: "/projects", label: { en: "View projects", ar: "عرض المشاريع" } }],
  },
  {
    id: "news",
    keywords: {
      en: ["news", "press", "media", "announcement", "update", "insights", "blog", "headlines"],
      ar: ["أخبار", "صحافة", "إعلام", "إعلان", "مستجدات", "تحديث"],
    },
    answer: {
      en: "Our newsroom covers the latest technological advancements, strategic partnerships and corporate milestones. For press inquiries or partnership requests you can also reach our administrative office directly.",
      ar: "تغطّي غرفة الأخبار لدينا أحدث التطورات التقنية والشراكات الاستراتيجية والإنجازات المؤسسية. لاستفسارات الصحافة أو طلبات الشراكة، يمكنك أيضاً التواصل مع مكتبنا الإداري مباشرة.",
    },
    links: [{ to: "/news", label: { en: "Latest news", ar: "أحدث الأخبار" } }],
  },
  {
    id: "certifications",
    keywords: {
      en: ["certification", "certifications", "iso", "accreditation", "standards", "compliance", "quality"],
      ar: ["شهادة", "شهادات", "ايزو", "أيزو", "اعتماد", "معايير", "امتثال", "جودة"],
    },
    answer: {
      en: "We hold ISO 9001:2015 (Quality Management), ISO 14001:2015 (Environmental Management) and ISO 45001:2018 (Occupational Health & Safety), and align with UAE government standards and international safety protocols.",
      ar: "نحمل شهادات ISO 9001:2015 (إدارة الجودة)، وISO 14001:2015 (الإدارة البيئية)، وISO 45001:2018 (الصحة والسلامة المهنية)، ونلتزم بالمعايير الحكومية الإماراتية وبروتوكولات السلامة الدولية.",
    },
    links: [{ to: "/about", label: { en: "About & standards", ar: "عن الشركة والمعايير" } }],
  },

  // ── Contact / partnership / careers ────────────────────────────────
  {
    id: "contact",
    keywords: {
      en: ["contact", "email", "phone", "call", "reach", "get in touch", "talk", "inquiry", "enquiry", "support", "hotline", "number"],
      ar: ["تواصل", "اتصال", "بريد", "ايميل", "هاتف", "اتصل", "رقم", "استفسار", "دعم"],
    },
    answer: {
      en: `You can reach the Sadeem Energy team anytime:\n\n📧 ${COMPANY.email}\n📞 ${COMPANY.phones[0]}  /  ${COMPANY.phones[1]}\n📍 ${COMPANY.address.en}\n🕘 ${COMPANY.hours.en}\n\nOr send an inquiry through our contact page and the strategic advisory team will respond within ~12 business hours.`,
      ar: `يمكنك التواصل مع فريق سديم للطاقة في أي وقت:\n\n📧 ${COMPANY.email}\n📞 ${COMPANY.phones[0]}  /  ${COMPANY.phones[1]}\n📍 ${COMPANY.address.ar}\n🕘 ${COMPANY.hours.ar}\n\nأو أرسل استفساراً عبر صفحة التواصل وسيردّ الفريق الاستشاري الاستراتيجي خلال ~12 ساعة عمل.`,
    },
    links: [
      { to: "/contact", label: { en: "Contact page", ar: "صفحة التواصل" } },
      { href: `mailto:${COMPANY.email}`, label: { en: "Email us", ar: "راسلنا" } },
      { href: `tel:${COMPANY.phoneTels[0]}`, label: { en: "Call us", ar: "اتصل بنا" } },
    ],
  },
  {
    id: "location",
    keywords: {
      en: ["location", "address", "where", "office", "map", "directions", "hours", "open", "timing"],
      ar: ["موقع", "عنوان", "أين", "مكتب", "خريطة", "ساعات", "دوام", "توقيت"],
    },
    answer: {
      en: `Our office is at ${COMPANY.address.en}.\n🕘 Working hours: ${COMPANY.hours.en}.`,
      ar: `يقع مكتبنا في ${COMPANY.address.ar}.\n🕘 ساعات العمل: ${COMPANY.hours.ar}.`,
    },
    links: [{ to: "/contact", label: { en: "Contact & directions", ar: "التواصل والاتجاهات" } }],
  },
  {
    id: "partnership",
    keywords: {
      en: ["partner", "partnership", "collaborate", "work with", "invest", "investment", "supplier", "vendor", "tender", "quote", "proposal"],
      ar: ["شراكة", "شريك", "تعاون", "استثمار", "مورد", "عرض سعر", "مناقصة"],
    },
    answer: {
      en: "We welcome strategic partnerships — with government entities, developers, and technology partners — to accelerate the UAE's sustainable vision. Share your scope and our strategic office will follow up.",
      ar: "نرحّب بالشراكات الاستراتيجية — مع الجهات الحكومية والمطوّرين وشركاء التقنية — لتسريع رؤية الإمارات المستدامة. شاركنا نطاق مشروعك وسيتابع معك مكتبنا الاستراتيجي.",
    },
    links: [
      { to: "/contact", label: { en: "Start a partnership", ar: "ابدأ شراكة" } },
      { href: `mailto:${COMPANY.email}`, label: { en: "Email the team", ar: "راسل الفريق" } },
    ],
  },
  {
    id: "careers",
    keywords: {
      en: ["career", "careers", "job", "jobs", "hiring", "vacancy", "vacancies", "apply", "recruit", "internship", "cv", "resume"],
      ar: ["وظيفة", "وظائف", "توظيف", "شاغر", "تقديم", "تدريب", "سيرة ذاتية"],
    },
    answer: {
      en: "Thanks for your interest in joining Sadeem Energy! We invest heavily in developing national talent in sustainable and nuclear energy. Please send your CV and area of interest to info@sadeemenergy.com and our team will be in touch.",
      ar: "شكراً لاهتمامك بالانضمام إلى سديم للطاقة! نستثمر بقوة في تطوير الكوادر الوطنية في مجالي الطاقة المستدامة والنووية. يُرجى إرسال سيرتك الذاتية ومجال اهتمامك إلى info@sadeemenergy.com وسيتواصل معك فريقنا.",
    },
    links: [{ href: `mailto:${COMPANY.email}`, label: { en: "Send your CV", ar: "أرسل سيرتك الذاتية" } }],
  },
  {
    id: "social",
    keywords: {
      en: ["social", "linkedin", "instagram", "youtube", "tiktok", "follow", "facebook", "twitter"],
      ar: ["تواصل اجتماعي", "لينكد", "انستغرام", "يوتيوب", "تيك توك", "متابعة"],
    },
    answer: {
      en: "Follow Sadeem Energy for the latest updates:\n• LinkedIn, Instagram, YouTube and TikTok — all linked in the site footer.",
      ar: "تابع سديم للطاقة لآخر المستجدات:\n• لينكدإن، وإنستغرام، ويوتيوب، وتيك توك — جميعها في تذييل الموقع.",
    },
    links: [
      { href: COMPANY.social.linkedin, label: { en: "LinkedIn", ar: "لينكدإن" } },
      { href: COMPANY.social.instagram, label: { en: "Instagram", ar: "إنستغرام" } },
    ],
  },
];
