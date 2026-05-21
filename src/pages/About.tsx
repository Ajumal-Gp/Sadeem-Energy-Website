import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Heart, Leaf, Shield, ArrowRight, Award, Quote, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";
import drAhmed from "@/assets/dr-ahmed.jpeg";
import corporateHero from "@/assets/corporate-energy-hero.png";
import ourStoryImg from "@/assets/our-story-infrastructure.png";
import uaeHero from "@/assets/uae-energy-hero.png";
import controlRoom from "@/assets/aus-3.jpg";

const timeline = [
  { year: "2018", title: "foundation", desc: "foundation_desc" },
  { year: "2019", title: "solar", desc: "solar_desc" },
  { year: "2020", title: "cooling", desc: "cooling_desc" },
  { year: "2021", title: "iot", desc: "iot_desc" },
  { year: "2022", title: "twin", desc: "twin_desc" },
  { year: "2023", title: "labs", desc: "labs_desc" },
  { year: "2024", title: "expansion", desc: "expansion_desc" },
  { year: "2025", title: "award", desc: "award_desc" },
];

const values = [
  { icon: Shield, key: "integrity" },
  { icon: Brain, key: "innovation" }, { icon: Leaf, key: "sustainability" },
  { icon: Award, key: "excellence" },
];

const About = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-background">
      {/* Standardized Enterprise Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 z-0">
          <img
            src={controlRoom}
            alt="Corporate Strategic Center"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Brain size={12} /> {language === 'en' ? 'CORPORATE IDENTITY' : 'الهوية المؤسسية'}
              </div>

              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {language === "en" ? "Our Story" : "قصتنا"}
              </h1>

              <div className={`h-2 w-32 bg-primary rounded-full mb-8 ${isRTL ? "mr-0 ml-auto" : ""}`} />

              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {language === "en" ? "Providing Energy For Life" : "توفير الطاقة للحياة"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <Section className="py-24 lg:py-48 bg-white border-b border-slate-100">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
              <Target size={32} className="text-primary" />
            </div>
            <h3 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-8 tracking-tighter">
              {t("about_mission")}
            </h3>
            <p className="text-slate-500 leading-relaxed text-xl lg:text-2xl font-medium opacity-80">
              {t("about_mission_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8">
              <Eye size={32} className="text-secondary" />
            </div>
            <h3 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-8 tracking-tighter">
              {t("about_vision")}
            </h3>
            <p className="text-slate-500 leading-relaxed text-xl lg:text-2xl font-medium opacity-80">
              {t("about_vision_desc")}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Corporate Identity */}
      <Section className="bg-accent/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <SectionHeader
            label={t("about_identity_tag")}
            title={t("about_identity_title")}
            align="center"
          />
          <p className="text-foreground/80 leading-relaxed text-xl mb-12 text-center font-semibold italic">
            {t("about_identity_desc")}
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`flex gap-6 items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-90">
                {t("about_id_1")}
              </p>
            </div>
            <div className={`flex gap-6 items-start ${isRTL ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-90">
                {t("about_id_2")}
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* History Timeline */}
      <Section className="relative overflow-hidden bg-secondary/5">
        <div className="container mx-auto">
          <SectionHeader
            label={t("about_history_tag")}
            title={t("about_history_title")}
            align="center"
          />

          <div className="relative mt-24 max-w-5xl mx-auto">
            {/* Central Spine */}
            <div className={`absolute top-0 bottom-0 w-1 bg-secondary/20 left-1/2 -translate-x-1/2 hidden md:block`} />

            <div className="space-y-12 md:space-y-0 relative">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? (isRTL ? 50 : -50) : (isRTL ? -50 : 50) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between mb-12 md:mb-24 last:mb-0 ${index % 2 === 0 ? (isRTL ? 'md:flex-row' : 'md:flex-row-reverse') : (isRTL ? 'md:flex-row-reverse' : 'md:flex-row')
                    }`}
                >
                  {/* Content Side */}
                  <div className="w-full md:w-[45%] group">
                    <div className={`p-8 rounded-[2rem] border border-border bg-card shadow-lg transition-all duration-500 group-hover:border-secondary/30 group-hover:shadow-2xl group-hover:-translate-y-2 ${isRTL ? 'text-right' : 'text-left'
                      }`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-secondary font-black text-lg">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-display font-black text-foreground group-hover:text-secondary transition-colors">
                          {t(item.title)}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-90">
                        {t(item.desc)}
                      </p>
                    </div>
                  </div>

                  {/* Node on Spine */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 -translate-y-1/2 z-20 hidden md:block">
                    <div className="w-10 h-10 rounded-full bg-background border-4 border-secondary flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-500">
                      <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                    </div>
                  </div>

                  {/* Empty Side (Spacer for zigzag) */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Chairman's Message */}
      <Section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`lg:w-[40%] relative flex items-center justify-center p-12 lg:p-20 bg-gradient-to-br from-[#E0F7F9] to-[#F1F9FB]`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[10px] border-[#A8E6CF]/30 overflow-hidden shadow-xl">
                  <img
                    src={drAhmed}
                    alt={t("about_chairman_name")}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-[#A8E6CF]/20 blur-3xl -z-10 rounded-full" />
              </motion.div>
            </div>

            <div className={`lg:w-[60%] p-8 md:p-12 lg:p-20 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="space-y-8">
                <div>
                  <span className="text-[#00BFA5] font-bold tracking-widest uppercase text-sm block mb-2">
                    {t("about_message_tag")}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-[#1A1A1A] mb-8">
                    {t("about_chairman_name")}
                  </h2>
                </div>

                <div className="relative">
                  <p className="text-[#555555] text-lg md:text-xl leading-relaxed italic">
                    "{t("about_message_content")}"
                  </p>
                </div>

                <div className="pt-10 border-t border-border/50">
                  <p className="text-[#1A1A1A] font-bold text-xl mb-1">
                    {t("about_chairman_expertise")}
                  </p>
                  <p className="text-[#777777] font-medium text-lg">
                    {t("about_chairman_role")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section className="bg-accent/5">
        <SectionHeader
          label={t("about_pillar_tag")}
          title={t("about_pillar_title")}
          description={t("about_pillar_desc")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)"
              }}
              className="text-center p-10 rounded-[2.5rem] border border-border bg-card shadow-sm hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 w-20 h-20 rounded-[2rem] bg-accent flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 transition-transform duration-500">
                <v.icon size={36} className="text-primary" />
              </div>
              <h3 className="relative z-10 text-2xl font-display font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                {language === "en" ? v.key.toUpperCase() : t(`value_${v.key}`)}
              </h3>
              <p className="relative z-10 text-muted-foreground leading-relaxed font-medium text-[15px]">
                {t(`value_${v.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* End of Page */}
    </div>
  );
};

export default About;
