import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Droplets, Zap, Activity, Waves, GlassWater, Trash2, Factory, Network, Leaf, Sprout, TrendingUp, Sun, Flame, ArrowRight, ArrowLeft } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

interface CycleItem {
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  icon: any;
}

interface CycleCategory {
  id: string;
  title: { en: string; ar: string };
  icon: any;
  items: CycleItem[];
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

export const LifeCycleChart = () => {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("water");
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const cycles: CycleCategory[] = [
    {
      id: "water",
      title: { en: "Full Water Cycle", ar: "دورة المياه المتكاملة" },
      icon: Droplets,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      accentColor: "#3b82f6",
      items: [
        {
          name: { en: "Desalination", ar: "تحلية المياه" },
          desc: { en: "Advanced sea water reverse osmosis (SWRO) transforming seawater into high-quality source water.", ar: "تحلية مياه البحر المتقدمة بنظام التناضح العكسي لتحويل مياه البحر إلى مياه عالية الجودة." },
          icon: Waves,
        },
        {
          name: { en: "Potabilization", ar: "تنقية مياه الشرب" },
          desc: { en: "Advanced filtration and mineral balance adjustment to deliver clean, safe drinking water.", ar: "عمليات الفلترة المتقدمة وضبط التوازن المعدني لتوفير مياه شرب نظيفة وآمنة." },
          icon: GlassWater,
        },
        {
          name: { en: "Water Waste & Treatment", ar: "معالجة مياه الصرف" },
          desc: { en: "Purifying wastewater to protect public health and recycle resources back into the circular economy.", ar: "تنقية مياه الصرف الصحي لحماية الصحة العامة وإعادة تدوير الموارد في الاقتصاد الدائري." },
          icon: Trash2,
        },
        {
          name: { en: "Industrial Water", ar: "المياه الصناعية" },
          desc: { en: "Customized ultra-pure water solutions tailored to meet the strict demands of manufacturing and factories.", ar: "حلول مياه فائقة النقاء مخصصة لتلبية المتطلبات الصارمة للتصنيع والمصانع." },
          icon: Factory,
        },
        {
          name: { en: "Water Infrastructures", ar: "البنية التحتية للمياه" },
          desc: { en: "Modern underground distribution pipelines, smart pumps, and digital metering systems.", ar: "أنابيب التوزيع الحديثة تحت الأرض، والمضخات الذكية، وأنظمة القياس الرقمية." },
          icon: Network,
        },
        {
          name: { en: "Irrigation", ar: "أنظمة الري" },
          desc: { en: "Smart agricultural water networks and drip systems driving crop optimization and green landscaping.", ar: "شبكات مياه زراعية ذكية وأنظمة ري بالتنقيط تدعم تحسين المحاصيل وتنسيق الحدائق الخضراء." },
          icon: Sprout,
        },
        {
          name: { en: "Development Boost", ar: "تعزيز التنمية" },
          desc: { en: "Unlocking regional growth and environmental stability through water abundance.", ar: "فتح آفاق النمو الإقليمي والاستقرار البيئي من خلال وفرة الموارد المائية." },
          icon: TrendingUp,
        },
      ],
    },
    {
      id: "generation",
      title: { en: "Generation", ar: "توليد الطاقة" },
      icon: Sun,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      accentColor: "#f59e0b",
      items: [
        {
          name: { en: "Photovoltaic Energy", ar: "الطاقة الكهروضوئية" },
          desc: { en: "Utility-scale solar panel arrays capturing clean sunlight and feeding it directly to the national grid.", ar: "مصفوفات الألواح الشمسية الضخمة التي تلتقط ضوء الشمس النظيف وتغذي الشبكة الوطنية مباشرة." },
          icon: Sun,
        },
        {
          name: { en: "Solar Thermal Energy", ar: "الطاقة الشمسية الحرارية" },
          desc: { en: "Concentrated solar plants generating high-temperature steam for base-load electrical generation.", ar: "محطات الطاقة الشمسية المركزة التي تولد بخارًا عالي الحرارة لتوليد الكهرباء الأساسية." },
          icon: Flame,
        },
        {
          name: { en: "Bioenergy", ar: "الطاقة الحيوية" },
          desc: { en: "Sustainable biomass and organic material conversion converting organic wastes into green energy.", ar: "تحويل الكتلة الحيوية والمواد العضوية المستدامة لتحويل النفايات العضوية إلى طاقة خضراء." },
          icon: Leaf,
        },
      ],
    },
    {
      id: "transmission",
      title: { en: "Transmission", ar: "نقل الطاقة" },
      icon: Zap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      accentColor: "#10b981",
      items: [
        {
          name: { en: "Transmission", ar: "نقل الطاقة" },
          desc: { en: "High-voltage long-distance overhead and underground cables designed to transfer bulk power securely.", ar: "كابلات علوية وتحت أرضية ذات جهد عالٍ ومسافات طويلة لنقل كميات ضخمة من الطاقة بأمان." },
          icon: Zap,
        },
        {
          name: { en: "Electrical Infrastructures", ar: "البنية التحتية الكهربائية" },
          desc: { en: "High-tech distribution substations, SCADA automation control, and protective transformers.", ar: "محطات التوزيع الفرعية ذات التقنية العالية، ونظام التحكم الآلي SCADA، والمحولات الواقية." },
          icon: Network,
        },
        {
          name: { en: "Electrification", ar: "الكهربة" },
          desc: { en: "Connecting smart cities, EV charging systems, and industrial hubs to zero-emission power.", ar: "ربط المدن الذكية، وأنظمة شحن السيارات الكهربائية، والمراكز الصناعية بطاقة خالية من الانبعاثات." },
          icon: Activity,
        },
      ],
    },
  ];

  // Reset active step when category changes
  useEffect(() => {
    setActiveStepIdx(0);
  }, [activeTab]);

  const currentCategory = cycles.find((c) => c.id === activeTab) || cycles[0];
  const items = currentCategory.items;
  const activeItem = items[activeStepIdx] || items[0];

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <Section className="!py-20 lg:!py-32 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

      <SectionHeader
        label={language === "en" ? "Sustainable Infrastructure Lifecycle" : "دورة حياة البنية التحتية المستدامة"}
        title={language === "en" ? "Interactive Lifecycle Loop" : "حلقة دورة الحياة التفاعلية"}
        description={
          language === "en"
            ? "Explore how Sadeem Energy builds, operates, and integrates modern water and power solutions to drive regional growth."
            : "استكشف كيف تقوم سديم للطاقة ببناء وتشغيل ودمج حلول المياه والطاقة الحديثة لدفع عجلة النمو الإقليمي."
        }
        className="mb-16"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {cycles.map((cycle) => {
            const Icon = cycle.icon;
            const isActive = activeTab === cycle.id;
            return (
              <button
                key={cycle.id}
                onClick={() => setActiveTab(cycle.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-black text-base transition-all duration-300 border ${
                  isActive
                    ? `${cycle.color} bg-white shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] border-slate-200/80`
                    : "text-slate-400 bg-white/40 hover:bg-white hover:text-slate-700 border-transparent"
                } ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cycle.bgColor}`}>
                  <Icon size={18} className={cycle.color} />
                </div>
                {language === "en" ? cycle.title.en : cycle.title.ar}
              </button>
            );
          })}
        </div>

        {/* Circular Life Cycle View */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 min-h-[500px]">
          {/* Left/Middle: The Circle Layout (Shown on Desktop) */}
          <div className="relative w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] flex items-center justify-center shrink-0">
            {/* Background Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-200 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-slate-100" />
            <div className="absolute inset-12 rounded-full bg-white shadow-inner" />

            {/* Central Display Panel */}
            <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-white shadow-xl border border-slate-50 flex flex-col items-center justify-center p-6 text-center z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeStepIdx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${currentCategory.bgColor}`}>
                    {(() => {
                      const Icon = activeItem.icon;
                      return <Icon size={24} className={currentCategory.color} />;
                    })()}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                    {language === "en" ? "STAGE" : "المرحلة"} {String(activeStepIdx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-base sm:text-lg font-display font-black text-slate-800 leading-tight">
                    {language === "en" ? activeItem.name.en : activeItem.name.ar}
                  </h4>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Connecting line to active item */}
            {items.map((item, idx) => {
              const count = items.length;
              const angle = (idx * 2 * Math.PI) / count - Math.PI / 2; // Offset by -90deg so it starts at the top
              const radius = 170; // Position radius
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = idx === activeStepIdx;
              const ItemIcon = item.icon;

              return (
                <div
                  key={idx}
                  className="absolute z-20"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Outer active ring guide line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-ring"
                      className="absolute -inset-3 rounded-full opacity-35 filter blur-[2px]"
                      style={{ backgroundColor: currentCategory.accentColor }}
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    />
                  )}

                  {/* Node Button */}
                  <button
                    onClick={() => setActiveStepIdx(idx)}
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive
                        ? "bg-white shadow-lg scale-110"
                        : "bg-slate-50 hover:bg-white border-slate-100 hover:border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm"
                    }`}
                    style={{ borderColor: isActive ? currentCategory.accentColor : "" }}
                  >
                    <ItemIcon
                      size={18}
                      className={isActive ? currentCategory.color : "text-slate-400 group-hover:text-slate-600"}
                    />
                  </button>

                  {/* Indicator tooltip dot */}
                  <div
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-white transition-all ${
                      isActive ? "scale-100" : "scale-0"
                    }`}
                    style={{ backgroundColor: currentCategory.accentColor }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right/Middle: Interactive Details & Navigation controls */}
          <div className="flex-1 w-full max-w-xl flex flex-col justify-center space-y-8">
            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {language === "en" ? "Active Node Information" : "معلومات المرحلة النشطة"}
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tighter leading-tight">
                {language === "en" ? activeItem.name.en : activeItem.name.ar}
              </h3>
              <div className="h-1.5 w-24 bg-primary rounded-full" style={{ backgroundColor: currentCategory.accentColor }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeTab}-${activeStepIdx}`}
                initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -15 : 15 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium min-h-[100px]"
              >
                {language === "en" ? activeItem.desc.en : activeItem.desc.ar}
              </motion.p>
            </AnimatePresence>

            {/* Stepper Buttons */}
            <div className={`flex items-center gap-4 ${isRTL ? "justify-end" : "justify-start"}`}>
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-95 shadow-sm"
              >
                {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
              <span className="text-sm font-bold text-slate-400 tracking-wider">
                {String(activeStepIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-95 shadow-sm"
              >
                {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
