import { motion } from "framer-motion";
import { Zap, Droplets, Leaf, TrendingDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const metricsData = [
  { icon: Leaf, value: "12,000+", key: "co2", unit: "TONS" },
  { icon: Zap, value: "5.0+", key: "solar", unit: "MW" },
  { icon: Droplets, value: "2.0M+", key: "water", unit: "L" },
  { icon: TrendingDown, value: "18.5%", key: "cost", unit: "SAVE" },
];

const ImpactMetrics = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Subtle technical background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-12 lg:items-center mb-20 ${isRTL ? "lg:flex-row-reverse text-right" : "text-left"}`}>
          <div className="lg:w-1/2 space-y-4">
            <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
              {t("impact_label")}
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-black text-white leading-tight tracking-tighter">
              {t("impact_title")}
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              {language === 'en' 
                ? "Measurable excellence in sustainability and operational efficiency across our regional infrastructure network."
                : "تميز ملموس في الاستدامة والكفاءة التشغيلية عبر شبكة البنية التحتية الإقليمية لدينا."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[2.5rem] overflow-hidden border border-white/10">
          {metricsData.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 lg:p-12 bg-slate-900/40 hover:bg-white/5 transition-colors group text-center"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                  <m.icon size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl lg:text-5xl font-display font-black text-white tracking-tighter group-hover:text-primary transition-colors">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {m.unit}
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  {language === "en" ? 
                    (m.key === "co2" ? "Tons CO₂ Reduced" : m.key === "solar" ? "Solar Capacity" : m.key === "water" ? "Water Conserved" : "Cost Efficiency") : 
                    (m.key === "co2" ? "أطنان الكربون المخفضة" : m.key === "solar" ? "السعة الشمسية" : m.key === "water" ? "المياه الموفرة" : "كفاءة التكلفة")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
