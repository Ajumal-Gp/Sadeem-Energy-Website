import { motion } from "framer-motion";
import { Shield, Award, Leaf, TrendingUp, Users, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";

const reasonsData = [
  { icon: Shield, key: "trusted" },
  { icon: Leaf, key: "sustain" },
  { icon: TrendingUp, key: "roi" },
  { icon: Award, key: "exp" },
  { icon: Users, key: "support" },
  { icon: Clock, key: "rapid" },
];

const WhyChooseUs = () => {
  const { t, isRTL } = useLanguage();

  return (
    <Section className="!py-20 lg:!py-32">
      <SectionHeader
        label={t("why_label")}
        title={t("why_title")}
        description={t("why_desc")}
        className="mb-16"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reasonsData.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`group relative p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:border-primary/20 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
          >
            {/* Elegant Corner Accent */}
            <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-24 h-24 bg-slate-50 rounded-bl-[4rem] group-hover:bg-primary/5 transition-colors duration-500`} />
            
            <div className={`relative z-10 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner ${isRTL ? "mr-0 ml-auto" : ""}`}>
              <r.icon size={24} className="text-slate-900 group-hover:text-white transition-colors duration-500" />
            </div>
            
            <div className="relative z-10 space-y-3">
              <h3 className="text-xl lg:text-2xl font-display font-black text-slate-900 group-hover:text-primary transition-colors">
                {t(`reason_${r.key}`)}
              </h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-medium opacity-90">
                {t(`reason_${r.key}_desc`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default WhyChooseUs;
