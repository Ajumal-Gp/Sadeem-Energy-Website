import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { CalendarDays, ArrowRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import newsHero from "@/assets/news-hero.png";
import makeItEmirates from "@/assets/make-it-in-emirates.jpeg";
import masdarLogo from "@/assets/MASDAR.jpeg";

const newsItems = [
  {
    date: "May, 2026",
    dateAr: "مايو 2026",
    category: "Events",
    categoryAr: "فعاليات",
    title: "Sadeem Energy at 'Make it in the Emirates' Forum",
    titleAr: "سديم للطاقة في منتدى 'اصنع في الإمارات'",
    excerpt: "Sadeem Energy proudly participated in the 'Make it in the Emirates' forum, showcasing our commitment to local manufacturing and sustainable energy infrastructure development in the UAE.",
    excerptAr: "شاركت سديم للطاقة بفخر في منتدى 'اصنع في الإمارات'، حيث استعرضت التزامنا بالتصنيع المحلي وتطوير البنية التحتية للطاقة المستدامة في الإمارات.",
    image: makeItEmirates,
  },
  {
    date: "May, 2026",
    dateAr: "يناير 2026",
    category: "Strategic",
    categoryAr: "استراتيجي",
    title: "Strategic Discussions with MASDAR",
    titleAr: "مناقشات استراتيجية مع مصدر",
    excerpt: "Great talks with Masdar regarding how to drive effectiveness within the UAE Strategy, and exploring avenues to deepen our involvement and collaboration in achieving national goals.",
    excerptAr: "محادثات مثمرة مع مصدر حول كيفية تعزيز الفعالية ضمن استراتيجية دولة الإمارات، واستكشاف سبل تعميق مشاركتنا وتعاوننا في تحقيق الأهداف الوطنية.",
    image: masdarLogo,
  },
  {
    date: "October 16-20, 2025",
    dateAr: "16-20 أكتوبر 2025",
    category: "Events",
    categoryAr: "فعاليات",
    title: "Strategic Participation in GITEX Global",
    titleAr: "مشاركة استراتيجية في معرض جيتكس جلوبال",
    excerpt: "Sadeem Energy participated in GITEX Global, showcasing innovative energy solutions and digital transformation initiatives that are shaping the future.",
    excerptAr: "شاركت سديم للطاقة في معرض جيتكس جلوبال، حيث استعرضت حلول الطاقة المبتكرة ومبادرات التحول الرقمي.",
    image: "/Gitex.png",
  },
  {
    date: "January, 2025",
    dateAr: "يناير 2025",
    category: "Compliance",
    categoryAr: "امتثال",
    title: "Zayed Sustainability Prize Awards Ceremony",
    titleAr: "حفل توزيع جوائز جائزة زايد للاستدامة",
    excerpt: "Sadeem Energy was honored to participate in the Zayed Sustainability Prize awards ceremony, celebrating global pioneers in sustainable solutions.",
    excerptAr: "تشرفت سديم للطاقة بالمشاركة في حفل توزيع جوائز جائزة زايد للاستدامة، احتفاءً بالرواد العالميين في الحلول المستدامة.",
    image: "/Zayed_prize_Caremony.png",
  },
  {
    date: "March 15, 2024",
    dateAr: "15 مارس 2024",
    category: "Strategic",
    categoryAr: "استراتيجي",
    title: "Benchmark in District Cooling Efficiency",
    titleAr: "معيار في كفاءة تبريد المناطق",
    excerpt: "Our latest operational audit confirms a record-breaking efficiency rating across our primary metropolitan cooling networks.",
    excerptAr: "تؤكد أحدث عمليات التدقيق التشغيلي لدينا تحقيق معدل كفاءة قياسي عبر شبكات التبريد الرئيسية لدينا.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80",
  },
  {
    date: "February 19-22, 2024",
    dateAr: "19-23 فبراير 2024",
    category: "Innovation",
    categoryAr: "ابتكار",
    title: "Strengthening Innovation in the Agri-Food Sector",
    titleAr: "تعزيز الابتكار في قطاع الأغذية والزراعة",
    excerpt: "Participated in strategic initiatives for strengthening innovation within the agri-food sector industry, focusing on sustainable energy integration.",
    excerptAr: "المشاركة في مبادرات استراتيجية لتعزيز الابتكار في قطاع الصناعات الغذائية والزراعية، مع التركيز على تكامل الطاقة المستدامة.",
    image: "/agrifood_live_v2.jpg",
  },
  {
    date: "Nov 30 - Dec 12, 2023",
    dateAr: "30 نوفمبر - 12 ديسمبر 2023",
    category: "Events",
    categoryAr: "فعاليات",
    title: "Sadeem Energy Participates in COP28 UAE",
    titleAr: "سديم للطاقة تشارك في مؤتمر COP28 في الإمارات",
    excerpt: "COP28 was held in Dubai, UAE, from November 30 to December 12, 2023, at Expo City Dubai, serving as a critical UN climate summit focused on accelerating energy transition.",
    excerptAr: "شاركت سديم للطاقة في مؤتمر COP28 الذي عقد في دبي، الإمارات العربية المتحدة، في الفترة من 30 نوفمبر إلى 12 ديسمبر 2023، في مدينة إكسبو دبي.",
    image: "/cop28_live.jpg",
  },
  {
    date: "October 2-5, 2023",
    dateAr: "2-5 أكتوبر 2023",
    category: "Technology",
    categoryAr: "تقنية",
    title: "AI-Driven Energy Transformation Summit",
    titleAr: "قمة التحول الطاقي المدفوع بالذكاء الاصطناعي",
    excerpt: "Sadeem Energy experts participated in the AI-Driven Energy Transformation forum, discussing the role of advanced analytics in optimizing grid performance.",
    excerptAr: "شارك خبراء سديم للطاقة في منتدى التحول الطاقي المدفوع بالذكاء الاصطناعي، لمناقشة دور التحليلات المتقدمة في تحسين أداء الشبكة.",
    image: "/ai_energy_summit.png",
  },
];

const EnergyGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,51,102,0.05)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

const News = () => {
  const { t, isRTL, language } = useLanguage();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Precise calculation to stop at the last card:
  // (Total Cards * Card Width + Total Gaps) / Viewport Width
  // For 8 cards, roughly -52% to -55% is ideal for 1080p.
  // Fine-tuned to stop exactly at the last card's edge
  const xBase = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
  const x = useSpring(xBase, {
    stiffness: 40,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  return (
    <div className="bg-white min-h-screen relative">
      <EnergyGrid />

      {/* Hero Section */}
      {/* Standardized Seamless Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,163,224,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,184,28,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Globe2 size={12} /> {t("news_hero_tag")}
              </div>

              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {t("news_hero_title")}
              </h1>

              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {t("news_hero_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <div className="pt-24 bg-white">
        <SectionHeader
          label={t("news_head_tag")}
          title={t("news_head_title")}
        />
      </div>

      {/* Horizontal Parallax Gallery */}
      <section ref={targetRef} className="relative h-[500vh] bg-white">
        <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center overflow-hidden">
          <motion.div
            style={{ x, willChange: "transform" }}
            className={`flex gap-8 lg:gap-12 px-[5vw] lg:px-[10vw] ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {newsItems.map((item, i) => (
              <NewsCard key={i} item={item} i={i} isRTL={isRTL} language={language} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Minimalist Media Relations CTA */}
      <section className="py-24 lg:py-48 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              {t("news_cta_title")}
            </div>

            <h2 className="text-3xl lg:text-6xl font-display font-black text-slate-900 tracking-tighter leading-[0.95]">
              {t("news_cta_title")}
            </h2>

            <p className="text-slate-500 text-lg lg:text-2xl font-medium leading-relaxed max-w-2xl mx-auto opacity-80">
              {t("news_cta_desc")}
            </p>

            <div className="pt-6">
              <Link to="/contact" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
                {t("news_cta_btn")} <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const NewsCard = ({ item, i, isRTL, language }: { item: any; i: number; isRTL: boolean; language: string }) => {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({
    target: ref,
  });

  const imageX = useTransform(scrollXProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      className="w-[85vw] min-w-[320px] lg:w-[450px] shrink-0 bg-card rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-700 border border-border group flex flex-col card-hover"
    >
      <div className="relative h-[220px] lg:h-[300px] overflow-hidden bg-slate-100">
        <motion.img
          src={item.image}
          alt={item.title}
          style={{ x: imageX, scale: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        <div className={`absolute top-6 ${isRTL ? "right-6" : "left-6"}`}>
          <span className={`px-5 py-2 rounded-full ${item.category === "Compliance" || item.category === "Recognition" ? "bg-secondary text-secondary-foreground" : "bg-accent text-white"} text-[10px] font-black uppercase tracking-[0.15em] shadow-2xl backdrop-blur-md`}>
            {language === "en" ? item.category : item.categoryAr}
          </span>
        </div>

        <div className={`absolute bottom-6 ${isRTL ? "right-6" : "left-6"}`}>
          <div className={`flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-widest ${isRTL ? "flex-row-reverse" : ""}`}>
            <CalendarDays size={14} className="text-secondary" />
            <span>{language === "en" ? item.date : (item.dateAr || item.date)}</span>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 flex flex-col flex-1 relative bg-card">
        <h3 className={`text-xl lg:text-2xl font-display font-black text-foreground mb-3 lg:mb-4 leading-tight group-hover:text-accent transition-colors ${isRTL ? "text-right" : "text-left"}`}>
          {language === "en" ? item.title : item.titleAr}
        </h3>

        <p className={`text-muted-foreground text-xs lg:text-sm leading-relaxed mb-6 lg:mb-8 flex-1 opacity-80 group-hover:opacity-100 transition-opacity ${isRTL ? "text-right" : "text-left"}`}>
          {language === "en" ? item.excerpt : item.excerptAr}
        </p>

        <div className={`mt-auto ${isRTL ? "text-right" : "text-left"}`}>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-3 text-accent text-xs font-black uppercase tracking-[0.2em] group/link hover:gap-5 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {language === "en" ? "READ MORE" : "اقرأ المزيد"}
            <ArrowRight size={18} className={`${isRTL ? "rotate-180" : ""} group-hover/link:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default News;
