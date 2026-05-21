import { motion } from "framer-motion";
import { Globe, Sun, Landmark } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";

const alignmentsData = [
  {
    icon: Globe,
    key: "net_zero",
  },
  {
    icon: Sun,
    key: "dubai_clean",
  },
  {
    icon: Landmark,
    key: "we_uae",
  },
];

export const GovernmentAlignment = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <Section className="!py-20 lg:!py-32 border-b border-slate-50">
      <SectionHeader
        label={t("vis_nat_label")}
        title={t("vis_nat_title")}
        description={t("vis_nat_desc")}
        className="mb-16"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {alignmentsData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`group p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:bg-slate-50 transition-all duration-500 flex flex-col items-center text-center ${isRTL ? "lg:border-r lg:border-l-0" : "lg:border-l lg:border-r-0"} first:border-l-0 first:border-r-0`}
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 rounded-2xl bg-primary/5 group-hover:bg-primary transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <item.icon size={28} className="text-primary group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-display font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
              {language === "en" ? 
                (item.key === "net_zero" ? "UAE Net Zero by 2050" : item.key === "dubai_clean" ? "Dubai Clean Energy 2050" : "We The UAE 2031") : 
                (item.key === "net_zero" ? "الإمارات للحياد المناخي 2050" : item.key === "dubai_clean" ? "دبي للطاقة النظيفة 2050" : "نحن الإمارات 2031")}
            </h3>
            
            <p className="text-sm text-slate-500 leading-relaxed font-medium opacity-90 max-w-[240px]">
              {language === "en" ? 
                "Strategic commitment to powering the national transition to a sustainable future." : 
                "التزام استراتيجي بقيادة التحول الوطني نحو مستقبل مستدام."}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};