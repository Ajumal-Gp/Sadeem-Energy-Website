import { motion } from "framer-motion";
import { Globe, Sun, Landmark, ArrowRight, CheckCircle, BarChart3, TrendingUp, ShieldCheck, Zap, Cpu, Leaf, GraduationCap, Building2, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";
import corporateHero from "@/assets/corporate-energy-hero.png";
import uaePrideHero from "@/assets/uae-pride-hero.png";

import dubaiCleanEnergyImg from "@/assets/dubai-clean-energy.png";

const horizons = [
  {
    id: "horizon-energy",
    key: "energy_climate",
    title: { en: "Energy & Climate Neutrality", ar: "الطاقة والحياد المناخي" },
    desc: { en: "Leading the transition to a carbon-neutral future through nuclear and renewable integration.", ar: "قيادة التحول نحو مستقبل محايد للكربون من خلال تكامل الطاقة النووية والمتجددة." },
    color: "bg-emerald-950",
    textColor: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070",
    initiatives: [
      { id: 4, key: "vis_strat_4", icon: Leaf },
      { id: 1, key: "vis_strat_1", icon: Sun },
      { id: 3, key: "vis_strat_3", icon: Zap },
      { id: 5, key: "vis_strat_5", icon: Globe }
    ]
  },
  {
    id: "horizon-economy",
    key: "economy_innovation",
    title: { en: "Economic Vitality & Innovation", ar: "الحيوية الاقتصادية والابتكار" },
    desc: { en: "Fueling the D33 agenda and the industrial strategy through smart utility management.", ar: "دعم أجندة D33 والاستراتيجية الصناعية من خلال إدارة المرافق الذكية." },
    color: "bg-slate-900",
    textColor: "text-secondary",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2070",
    initiatives: [
      { id: 7, key: "vis_strat_7", icon: Landmark },
      { id: 9, key: "vis_strat_9", icon: TrendingUp },
      { id: 8, key: "vis_strat_8", icon: Cpu }
    ]
  },
  {
    id: "horizon-resources",
    key: "resource_security",
    title: { en: "Resource Security & Quality of Life", ar: "أمن الموارد وجودة الحياة" },
    desc: { en: "Ensuring water and food security for a growing and thriving nation.", ar: "ضمان الأمن المائي والغذائي لأمة متنامية ومزدهرة." },
    color: "bg-blue-950",
    textColor: "text-blue-400",
    image: dubaiCleanEnergyImg,
    initiatives: [
      { id: 2, key: "vis_strat_2", icon: GraduationCap },
      { id: 6, key: "vis_strat_6", icon: Building2 }
    ]
  }
];

const timelineEvents = [
  { year: "2031", label: { en: "We the UAE 2031", ar: "نحن الإمارات 2031" }, target: "40% Green Energy" },
  { year: "2033", label: { en: "Dubai D33", ar: "دبي D33" }, target: "Economic Doubling" },
  { year: "2050", label: { en: "Net Zero 2050", ar: "الحياد المناخي 2050" }, target: "Carbon Neutrality" },
  { year: "2071", label: { en: "UAE Centennial", ar: "مئوية الإمارات" }, target: "Global Leadership" },
];

const dashboardMetricsData = [
  { key: "renew", value: 65, color: "bg-primary", icon: Zap },
  { key: "water", value: 28, color: "bg-primary", icon: Leaf },
  { key: "grid", value: 99.9, color: "bg-primary", icon: ShieldCheck },
  { key: "gdp", value: 4.2, color: "bg-primary", icon: TrendingUp },
];

const VisionAlignment = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen relative">
      {/* Services-Style Hero Section - Text Only */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2070" 
            alt="Strategic Background" 
            className="w-full h-full object-cover grayscale opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
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
                <Globe2 size={12} /> {t("vis_hero_tag")}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {language === 'en' ? 'National Strategy Hub.' : 'مركز الاستراتيجية الوطنية.'}
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {t("vis_hero_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Section className="bg-white !py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900">
            {t("vis_convergence_title")}
          </h2>
          <p className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            {t("vis_convergence_desc")}
          </p>
        </div>
      </Section>

      {/* Strategic Horizons - Large Format */}
      <div className="space-y-4 px-4 pb-24">
        {horizons.map((horizon, idx) => (
          <motion.section
            key={horizon.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative rounded-[3.5rem] overflow-hidden min-h-[600px] flex items-center ${horizon.color}`}
          >
            <div className="absolute inset-0 z-0">
              <img src={horizon.image} className="w-full h-full object-cover opacity-20 mix-blend-luminosity" alt={horizon.title.en} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-12 lg:px-24 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className={`${isRTL ? "lg:order-2 text-right" : "text-left"}`}>
                  <span className={`text-xs font-black uppercase tracking-[0.3em] mb-6 block ${horizon.textColor}`}>
                    {t("vis_horizon_tag")} 0{idx + 1}
                  </span>
                  <h3 className="text-4xl lg:text-7xl font-display font-black text-white mb-8 leading-tight">
                    {language === "en" ? horizon.title.en : horizon.title.ar}
                  </h3>
                  <p className="text-white/60 text-xl lg:text-2xl font-medium mb-12 leading-relaxed">
                    {language === "en" ? horizon.desc.en : horizon.desc.ar}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {horizon.initiatives.map((init, i) => (
                    <motion.div
                      key={init.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                        <init.icon size={24} />
                      </div>
                      <h4 className="text-lg font-display font-black text-white mb-2 leading-tight">
                        {t(init.key)}
                      </h4>
                      <div className="h-0.5 w-8 bg-white/20 group-hover:w-full group-hover:bg-secondary transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Minimized Roadmap Section */}
      <Section className="bg-slate-950 text-white relative overflow-hidden !py-16">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent" />
        
        <SectionHeader
          title={t("vis_roadmap_title")}
          description={t("vis_roadmap_desc")}
          label={t("vis_roadmap_tag")}
          align="center"
        />

        <div className="relative mt-12">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-5xl font-display font-black text-white/5 mb-[-1rem] group-hover:text-secondary/10 transition-colors">
                  {event.year}
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:border-secondary group-hover:scale-105 transition-all shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,184,28,0.5)]" />
                </div>
                <h4 className="text-lg font-display font-black text-white mb-1 tracking-tight">
                  {language === "en" ? event.label.en : event.label.ar}
                </h4>
                <p className={`text-secondary text-[10px] font-black uppercase tracking-widest opacity-80 ${isRTL ? "tracking-normal" : ""}`}>
                  {event.target}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Metrics Dashboard */}
      <Section className="bg-white">
        <SectionHeader
          title={t("vis_dashboard_title")}
          description={t("vis_dashboard_desc")}
          label={t("vis_dashboard_tag")}
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboardMetricsData.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all"
            >
              <div className={`w-20 h-20 rounded-[2rem] ${metric.color} flex items-center justify-center mb-8 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                <metric.icon size={36} className="text-white" />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                {t(`vis_metric_${metric.key}`)}
              </h4>
              <div className="text-6xl font-display font-black text-slate-900 mb-8">
                {metric.key === 'grid' ? metric.value : metric.value}%
              </div>

              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: metric.key === 'grid' ? '100%' : `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${metric.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Institutional CTA */}
      <section className="py-20 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-black text-white leading-tight tracking-tighter">
              {t("vis_cta_title_alt")}
            </h2>
            
            <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              {t("vis_cta_desc_alt")}
            </p>
            
            <div className="pt-4">
              <Link
                to="/contact"
                className={`bg-primary text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 shadow-xl transition-all inline-flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("vis_cta_btn")} <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VisionAlignment;
