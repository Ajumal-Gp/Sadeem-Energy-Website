import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Building2, ExternalLink } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";
import mbrSolar from "@/assets/proj-mbr-solar.png";
import solarImg from "@/assets/service-solar.jpg";
import coolingImg from "@/assets/service-cooling.jpg";
import waterImg from "@/assets/service-water.jpg";
import infrastructureImg from "@/assets/our-story-infrastructure.png";
import dubaiCleanEnergyImg from "@/assets/dubai-clean-energy.png";
import auditingImg from "@/assets/service-auditing.jpg";

const projects = [
  {
    title: "Supply & installation of solar panels for Warsan Nursery",
    titleAr: "توريد وتركيب الألواح الشمسية لمشتل ورسان",
    client: "Dubai Municipality",
    clientAr: "بلدية دبي",
    category: "Sustainable Energy",
    image: solarImg,
    desc: "Implementation of advanced solar power systems to enhance energy efficiency at Warsan Nursery.",
    descAr: "تنفيذ أنظمة طاقة شمسية متطورة لتعزيز كفاءة الطاقة في مشتل ورسان التابع لبلدية دبي.",
    metrics: [
      { label: "Solar Power", value: "150 kW" },
      { label: "CO2 Saved", value: "45 Tons" },
      { label: "Efficiency", value: "85%" },
    ],
    featured: true,
  },
  {
    title: "Capacitor bank replacement and panel modification in DM STP",
    titleAr: "استبدال مجموعة المكثفات وتعديل اللوحات في محطة بلدية دبي",
    client: "Dubai Municipality",
    clientAr: "بلدية دبي",
    category: "Grid Optimization",
    image: infrastructureImg,
    desc: "Large-scale retrofit of capacitor banks and panel modifications in substations at the Dubai Municipality STP.",
    descAr: "تحديث واسع النطاق لمجموعات المكثفات وتعديلات الألواح في المحطات الفرعية التابعة لمحطة معالجة مياه الصرف الصحي ببلدية دبي.",
    metrics: [
      { label: "Power Factor", value: "0.98" },
      { label: "Substations", value: "8 Units" },
      { label: "Loss Reduc.", value: "22%" },
    ],
    featured: true,
  },
  {
    title: "Upgrading and replacing water booster pumps at the Mounted Police Station",
    titleAr: "ترقية واستبدال مضخات تقوية المياه في مركز شرطة الخيالة",
    client: "Dubai Police",
    clientAr: "شرطة دبي",
    category: "Water Infrastructure",
    image: waterImg,
    desc: "Strategic upgrade of water pressure systems and booster pump replacement for Dubai Police facilities.",
    descAr: "ترقية استراتيجية لأنظمة ضغط المياه واستبدال مضخات التقوية لمنشآت شرطة دبي.",
    metrics: [
      { label: "Pump Units", value: "12 Stations" },
      { label: "Power Saved", value: "35%" },
      { label: "Pressure", value: "Optimized" },
    ],
    featured: true,
  },
  {
    title: "Supply and installation of central water cooling systems and ice-making equipment at various locations",
    titleAr: "توريد وتركيب أنظمة تبريد المياه ومعدات صنع الثلج",
    client: "Dubai Police",
    clientAr: "شرطة دبي",
    category: "Cooling Systems",
    image: coolingImg,
    desc: "Comprehensive installation of centralized water cooling and industrial ice-making equipment for Dubai Police.",
    descAr: "تركيب شامل لأنظمة تبريد المياه المركزية ومعدات صنع الثلج الصناعية لصالح شرطة دبي.",
    metrics: [
      { label: "Cooling Units", value: "15 Locations" },
      { label: "Ice Capacity", value: "2 Tons/Day" },
      { label: "Status", value: "Active" },
    ],
    featured: false,
  },
  {
    title: "I-Beam Structure Solar Car Park Shades 530KWP",
    titleAr: "مظلات مواقف سيارات شمسية بهيكل I-Beam بقدرة 530 كيلوواط",
    client: "Hamdan Bin Mohammed Smart University",
    clientAr: "جامعة حمدان بن محمد الذكية",
    category: "Solar Infrastructure",
    image: mbrSolar,
    desc: "State-of-the-art I-Beam structured solar car park shades providing sustainable energy and vehicle protection.",
    descAr: "مظلات مواقف سيارات شمسية متطورة بهيكل I-Beam توفر طاقة مستدامة وحماية للمركبات.",
    metrics: [
      { label: "Total PV", value: "530 kWp" },
      { label: "Shading Area", value: "2.8K sqm" },
      { label: "Usage", value: "100% Self" },
    ],
    featured: false,
  },
  {
    title: "Additional carport for solar shades project",
    titleAr: "مظلة إضافية لمشروع المظلات الشمسية",
    client: "Hamdan Bin Mohammed Smart University",
    clientAr: "جامعة حمدان بن محمد الذكية",
    category: "Smart Campus",
    image: dubaiCleanEnergyImg,
    desc: "Expansion of existing solar shade infrastructure with additional carports for increased clean energy generation.",
    descAr: "توسعة البنية التحتية القائمة للمظلات الشمسية مع مظلات إضافية لزيادة توليد الطاقة النظيفة.",
    metrics: [
      { label: "Additional PV", value: "120 kW" },
      { label: "New Spaces", value: "45 Slots" },
      { label: "Completion", value: "2024" },
    ],
    featured: false,
  },
  {
    title: "FANR Consultation",
    titleAr: "استشارات الهيئة الاتحادية للرقابة النووية",
    client: "Kangaroo Plastics Middle East LLC",
    clientAr: "كانجارو للبلاستيك الشرق الأوسط ذ.م.م",
    category: "Industrial Safety",
    image: auditingImg,
    desc: "Specialized FANR consultation and compliance services for industrial safety and radiation protection.",
    descAr: "خدمات استشارية متخصصة وامتثال للهيئة الاتحادية للرقابة النووية للسلامة الصناعية والحماية من الإشعاع.",
    metrics: [
      { label: "Audit Score", value: "100%" },
      { label: "Compliance", value: "FANR Standard" },
      { label: "Renewal", value: "Completed" },
    ],
    featured: false,
  },
];

const Projects = () => {
  const { t, isRTL, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="bg-white min-h-screen">
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
                <Globe2 size={12} /> {t("proj_hero_tag")}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {t("proj_hero_title")}
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {t("proj_hero_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flagship Projects - Bento Grid */}
      <Section className="!py-20 lg:!py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured Project (Large) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 group relative rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-200 shadow-xl h-[500px] lg:h-[700px]"
          >
            <img src={featured[0].image} alt={featured[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
              <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/30">{featured[0].category}</span>
                <h3 className="text-3xl lg:text-6xl font-display font-black text-white leading-none tracking-tighter">
                  {language === "en" ? featured[0].title : featured[0].titleAr}
                </h3>
                <div className="flex gap-12 pt-6 border-t border-white/20">
                   {featured[0].metrics.map((m, idx) => (
                     <div key={idx} className={`${isRTL ? "text-right" : "text-left"}`}>
                        <div className="text-2xl lg:text-4xl font-display font-black text-white">{m.value}</div>
                        <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">{language === "en" ? m.label : "معيار"}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Projects Stack */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:gap-12">
            {featured.slice(1, 3).map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 shadow-lg flex-1 h-[300px] lg:h-auto"
              >
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{p.category}</span>
                    <h3 className="text-xl lg:text-2xl font-display font-black text-white leading-tight">
                      {language === "en" ? p.title : p.titleAr}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                       <Building2 size={10} /> {language === "en" ? p.client : p.clientAr}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Portfolio Gallery */}
      <Section className="bg-slate-50 border-y border-slate-200">
        <SectionHeader
          label={t("proj_urban_tag")}
          title={t("proj_urban_title")}
          description={t("proj_urban_desc")}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 lg:mt-24">
          {other.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`group flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 ${isRTL ? "text-right" : "text-left"}`}
            >
              <div className="h-64 lg:h-80 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{p.category}</span>
                   <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 leading-tight">
                     {language === "en" ? p.title : p.titleAr}
                   </h3>
                   <p className="text-slate-500 text-sm lg:text-base font-medium leading-relaxed line-clamp-3">
                     {language === "en" ? p.desc : p.descAr}
                   </p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                   <div className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t("proj_client")}</span>
                      <span className="text-xs font-black text-slate-900">{language === "en" ? p.client : p.clientAr}</span>
                   </div>
                   <Link to="/contact" className="group/btn inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                      {t("proj_inquire")} 
                      <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Minimalist Projects CTA */}
      <section className="py-24 lg:py-48 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              {language === 'en' ? 'NEXT STEPS' : 'الخطوات التالية'}
            </div>
            
            <h2 className="text-3xl lg:text-7xl font-display font-black text-slate-900 tracking-tighter leading-[0.95]">
              {t("proj_cta_title")}
            </h2>
            
            <p className="text-slate-500 text-lg lg:text-2xl font-medium leading-relaxed max-w-2xl mx-auto opacity-80">
              {t("proj_cta_desc")}
            </p>
            
            <div className="pt-6">
              <Link to="/contact" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
                {t("nav_contact_btn")} <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;




