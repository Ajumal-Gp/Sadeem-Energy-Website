import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Sun, Recycle, Droplets, Thermometer, Brain, ArrowRight, Phone, BarChart3, Zap, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";

import serviceSolar from "@/assets/service-solar.jpg";
import serviceWaste from "@/assets/service-waste.jpg";
import serviceWater from "@/assets/service-water.jpg";
import serviceCooling from "@/assets/service-cooling.jpg";
import serviceAuditing from "@/assets/service-auditing.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceNuclear from "@/assets/service-nuclear.jpg";
import corporateHero from "@/assets/corporate-energy-hero.png";


const processData = [
  { 
    step: "01", 
    key: "strategy",
    title: { en: "Energy Strategy", ar: "استراتيجية الطاقة" },
    desc: { 
      en: "In-depth baseline analysis and sustainability benchmarking to align with national energy goals.",
      ar: "تحليل خط الأساس المتعمق وقياس الاستدامة للتوافق مع أهداف الطاقة الوطنية."
    }
  },
  { 
    step: "02", 
    key: "blueprint",
    title: { en: "Digital Blueprint", ar: "المخطط الرقمي" },
    desc: { 
      en: "Designing smart infrastructure and AI-driven grid management systems tailored to specific asset needs.",
      ar: "تصميم بنية تحتية ذكية وأنظمة إدارة شبكة مدفوعة بالذكاء الاصطناعي مصممة خصيصًا لاحتياجات الأصول."
    }
  },
  { 
    step: "03", 
    key: "build",
    title: { en: "Engineering Build", ar: "البناء الهندسي" },
    desc: { 
      en: "Precision deployment of SWRO, District Cooling, and Waste-to-Energy infrastructure by specialist teams.",
      ar: "النشر الدقيق لبنية التحتية لـ SWRO والتبريد المركزي وتحويل النفايات إلى طاقة بواسطة فرق متخصصة."
    }
  },
  { 
    step: "04", 
    key: "integration",
    title: { en: "Smart Integration", ar: "التكامل الذكي" },
    desc: { 
      en: "Seamlessly connecting assets via AMI infrastructure and IoT gateways for real-time monitoring.",
      ar: "ربط الأصول بسلاسة عبر بنية AMI التحتية وبوابات إنترنت الأشياء للمراقبة في الوقت الفعلي."
    }
  },
  { 
    step: "05", 
    key: "evolution",
    title: { en: "Strategic Evolution", ar: "التطور الاستراتيجي" },
    desc: { 
      en: "Continuous optimization through Digital Twin technology and predictive performance balancing.",
      ar: "التحسين المستمر من خلال تقنية التوأم الرقمي وموازنة الأداء التنبؤية."
    }
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

const ServiceItem = ({ svc, i, t, isRTL, language }: any) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 lg:gap-24 items-center py-16 lg:px-20`}
    >
      {/* Image Container */}
      <div className="lg:w-1/2 w-full relative">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
          <motion.img
            style={{ y, scale: 1.25 }}
            src={svc.image}
            alt={t(`service_${svc.key}`)}
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`lg:w-1/2 w-full space-y-10 relative z-10 ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="space-y-6">
          <h3 className="text-5xl lg:text-7xl font-display font-black text-slate-900 leading-[1.1] tracking-tighter">
            {t(`service_${svc.key}`)}
          </h3>
          <div className={`h-2 w-32 bg-primary rounded-full ${isRTL ? "mr-0 ml-auto" : ""}`} />
        </div>

        <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed font-medium">
          {t(`service_${svc.key}_desc`)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          {svc.assets.map((asset: string, j: number) => (
            <div
              key={j}
              className={`flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-slate-50/50 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Zap size={14} className="text-primary" />
              </div>
              <span className="text-base font-bold text-slate-700">
                {asset}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-4 text-xl font-black text-primary uppercase tracking-widest ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {t("svc_discuss")}
            <ArrowRight size={24} className={`${isRTL ? "rotate-180" : ""} group-hover:translate-x-2 transition-transform`} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const { t, isRTL, language } = useLanguage();
  const servicesRef = useRef(null);

  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start center", "end center"],
  });

  const pathHeight = useSpring(useTransform(servicesScroll, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 });

  const servicesData = [
    { 
      key: "cooling", 
      image: serviceCooling, 
      assets: language === "en" 
        ? ["Centralized Chiller Plants", "ETS Stations", "Underground Networks", "TES Storage"]
        : ["محطات تبريد مركزية", "محطات نقل الطاقة", "شبكات تحت الأرض", "تخزين الطاقة الحرارية"]
    },
    { 
      key: "metering", 
      image: serviceAuditing, 
      assets: language === "en"
        ? ["AMI Infrastructure", "IoT Gateways", "Real-time Analytics", "Multi-utility Support"]
        : ["بنية AMI التحتية", "بوابات إنترنت الأشياء", "تحليلات فورية", "دعم مرافق متعددة"]
    },
    { 
      key: "solar", 
      image: serviceSolar, 
      assets: language === "en"
        ? ["Shams Dubai Compliance", "Utility-scale PV", "Inverter Systems", "Performance AI"]
        : ["امتثال شمس دبي", "خلايا شمسية ضخمة", "أنظمة العواكس", "أداء مدعوم بالذكاء الاصطناعي"]
    },
    { 
      key: "waste", 
      image: serviceWaste, 
      assets: language === "en"
        ? ["Combustion Technology", "Steam Turbines", "Flue Gas Treatment", "Carbon Capture Ready"]
        : ["تقنية الاحتراق", "توربينات بخارية", "معالجة غاز المداخن", "جاهز لالتقاط الكربون"]
    },
    { 
      key: "water", 
      image: serviceWater, 
      assets: language === "en"
        ? ["SWRO Desalination", "Smart Pumping", "Pressure Management", "Quality Monitoring"]
        : ["تحلية SWRO", "مضخات ذكية", "إدارة الضغط", "مراقبة الجودة"]
    },
    { 
      key: "radiation", 
      image: serviceNuclear, 
      assets: language === "en"
        ? ["Diagnostic Shielding Audits", "Personal Dose Monitoring", "FANR Compliance Surveying", "Isotopic Source Verification"]
        : ["تدقيق درع التشخيص", "مراقبة الجرعات الشخصية", "مسح امتثال FANR", "التحقق من المصدر النظيري"]
    },
    { 
      key: "grid", 
      image: serviceAi, 
      assets: language === "en"
        ? ["Predictive Balancing", "Fault Detection", "Digital Twin", "Demand Mitigation"]
        : ["موازنة تنبؤية", "كشف الأعطال", "التوأم الرقمي", "تخفيف الطلب"]
    },
  ];


  return (
    <div className="bg-white min-h-screen relative">
      <EnergyGrid />
      
      {/* Standardized Seamless Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,163,224,0.08)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(255,184,28,0.08)_0%,transparent_70%)] blur-3xl" />
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
                <Globe2 size={12} /> {language === 'en' ? 'OUR CAPABILITIES' : 'قدراتنا'}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {language === 'en' ? 'Pioneering Smart Energy Solutions' : 'حلول طاقة ذكية رائدة'}
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {language === 'en' 
                  ? "From the world's largest district cooling networks to AI-managed smart grids, we provide the infrastructure that powers the future of nations."
                  : "من أكبر شبكات التبريد في العالم إلى الشبكات الذكية التي يديرها الذكاء الاصطناعي، نوفر البنية التحتية التي تدعم مستقبل الأمم."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <div ref={servicesRef} className="container mx-auto px-4 relative z-10 py-32">
        <div className={`absolute top-20 bottom-20 ${isRTL ? "right-4" : "left-4"} w-px bg-slate-100 hidden lg:block`}>
          <motion.div 
            style={{ height: pathHeight }}
            className="w-full bg-primary" 
          />
        </div>

        <div className="space-y-24">
          {servicesData.map((svc, i) => (
            <ServiceItem key={i} svc={svc} i={i} t={t} isRTL={isRTL} language={language} />
          ))}
        </div>
      </div>

      {/* Delivery Process */}
      <Section className="!py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <SectionHeader
          label={t("svc_delivery_tag")}
          title={t("svc_delivery_title")}
          description={t("svc_delivery_desc")}
        />
        <div className="relative mt-24">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2 z-0" />
          <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
            {processData.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-all text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-black mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  {p.step}
                </div>
                <h4 className="text-xl font-display font-black text-slate-900 mb-4 uppercase tracking-tighter">
                  {language === "en" ? p.title.en : p.title.ar}
                </h4>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                  {language === "en" ? p.desc.en : p.desc.ar}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-2xl lg:text-4xl text-slate-900 font-display font-black leading-tight tracking-tight italic">
                "{t("svc_cta_desc")}"
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-6 justify-center pt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Link
                  to="/contact"
                  className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  {t("quick_partner")} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                </Link>
                <a
                  href="tel:+97142599011"
                  className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <Phone size={20} /> {t("svc_expert")}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
