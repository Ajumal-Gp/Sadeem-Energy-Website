import { motion } from "framer-motion";
import { Leaf, Users, Shield, BarChart3, Download, FileText, Globe, Zap, Droplets, Heart, BookOpen, ExternalLink } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";
import uaeEnergyHero from "@/assets/uae-energy-hero.png";

const esgPillarsData = [
  { key: "env", icon: Leaf },
  { key: "soc", icon: Users },
  { key: "gov", icon: Shield }
];

const carbonMetricsData = [
  { key: "avoided", value: "450k", suffix: "Tons", icon: Leaf, color: "text-primary" },
  { key: "renew", value: "65", suffix: "%", icon: Zap, color: "text-primary" },
  { key: "water", value: "28", suffix: "%", icon: Droplets, color: "text-primary" },
  { key: "waste", value: "92", suffix: "%", icon: BarChart3, color: "text-primary" },
];

const reportsData = [
  { year: "2024", key: "annual_report", size: "4.2 MB", type: "PDF", fileUrl: "/reports/sustainability_annual_2024.pdf" },
  { year: "2023", key: "impact_study", size: "3.8 MB", type: "PDF", fileUrl: "/reports/sustainability_impact_2023.pdf" },
  { year: "2023", key: "gov_review", size: "2.1 MB", type: "PDF", fileUrl: "/reports/governance_report_2023.pdf" },
  { year: "2022", key: "community_dashboard", size: "5.5 MB", type: "PDF", fileUrl: "/reports/community_investment_2022.pdf" },
];

const Sustainability = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Enterprise Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 z-0">
          <img
            src={uaeEnergyHero}
            alt="Sustainability Infrastructure"
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
                <Leaf size={12} /> {t("sus_hero_tag")}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {language === "en" ? "Sustainovation." : "الابتكار المستدام."} <br />
                <span className="text-primary/60">
                  {language === "en" ? "Driven by Impact." : "مدفوع بالتأثير."}
                </span>
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {t("sus_hero_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carbon Dashboard */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carbonMetricsData.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card border border-border rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all ${isRTL ? "text-right" : ""}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <metric.icon size={24} className={metric.color} />
              </div>
              <div className="text-4xl font-display font-black text-primary mb-2">
                {metric.value}{metric.suffix}
              </div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {language === "en" ?
                  (metric.key === "avoided" ? t("sus_metric_carbon") : metric.key === "renew" ? t("service_solar") : metric.key === "water" ? t("sus_metric_water") : t("service_waste")) :
                  (metric.key === "avoided" ? t("sus_metric_carbon") : metric.key === "renew" ? t("service_solar") : metric.key === "water" ? t("sus_metric_water") : t("service_waste"))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ESG Pillars */}
      <Section alt>
        <SectionHeader
          label={t("about_pillar_tag")}
          title={t("sus_esg_title")}
          description={t("sus_hero_desc")}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {esgPillarsData.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card border border-border rounded-[2.5rem] p-10 shadow-lg relative overflow-hidden group ${isRTL ? "text-right" : ""}`}
            >
              <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} p-8 opacity-5 group-hover:scale-110 transition-transform`}>
                <pillar.icon size={120} />
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 ${isRTL ? "mr-auto ml-0" : ""}`}>
                <pillar.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-3xl font-display font-black text-foreground mb-6">
                {t(`sus_pillar_${pillar.key}`)}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 opacity-90">
                {t(`sus_pillar_${pillar.key}_desc`)}
              </p>
              <ul className={`space-y-4 ${isRTL ? "flex flex-col items-end" : ""}`}>
                {[1, 2, 3].map((j) => (
                  <li key={j} className={`flex items-center gap-3 font-bold text-foreground/80 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    {language === "en" ? 
                      (pillar.key === "env" ? (j === 1 ? "Net Zero 2050 Alignment" : j === 2 ? "Carbon Displacement" : "Resource Circularity") :
                       pillar.key === "soc" ? (j === 1 ? "National Talent Development" : j === 2 ? "Community Impact" : "Safety Leadership") :
                       (j === 1 ? "Ethical Compliance" : j === 2 ? "Strategic Oversight" : "Policy Transparency")) :
                      (pillar.key === "env" ? (j === 1 ? "المواءمة مع الحياد المناخي 2050" : j === 2 ? "إزاحة الكربون" : "دائرية الموارد") :
                       pillar.key === "soc" ? (j === 1 ? "تطوير المواهب الوطنية" : j === 2 ? "التأثير المجتمعي" : "قيادة السلامة") :
                       (j === 1 ? "الامتثال الأخلاقي" : j === 2 ? "الرقابة الاستراتيجية" : "شفافية السياسات"))}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Commitment Section */}
      <Section>
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className={`grid lg:grid-cols-2 gap-16 items-center relative z-10 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : ""}>
              <span className="text-secondary font-black uppercase tracking-widest text-sm mb-4 block">
                {t("sus_un_tag")}
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-black mb-8 leading-tight">
                {t("sus_un_title")}
              </h2>
              <p className="text-white/70 text-xl leading-relaxed mb-10 opacity-90">
                {t("sus_un_desc")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <Globe size={40} className="mx-auto mb-4 text-secondary" />
                <div className="text-3xl font-display font-black mb-1">100%</div>
                <div className="text-xs font-bold text-white/60 uppercase">{language === "en" ? "Policy Compliance" : "الامتثال للسياسات"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <Heart size={40} className="mx-auto mb-4 text-secondary" />
                <div className="text-3xl font-display font-black mb-1">AED 50M</div>
                <div className="text-xs font-bold text-white/60 uppercase">{language === "en" ? "Community Investment" : "الاستثمار المجتمعي"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center col-span-2">
                <Users size={40} className="mx-auto mb-4 text-secondary" />
                <div className="text-3xl font-display font-black mb-1">2,500+</div>
                <div className="text-xs font-bold text-white/60 uppercase">{language === "en" ? "National Engineers Trained" : "تدريب المهندسين الوطنيين"}</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Chairman's Column Insights - Sustainability columns */}
      <Section alt>
        <SectionHeader
          label={language === "en" ? "CHAIRMAN'S SCIENTIFIC COLUMNS" : "الرؤية العلمية لرئيس مجلس الإدارة"}
          title={language === "en" ? "The Science & Strategy of Sustainability" : "العلم والاستراتيجية من أجل الاستدامة"}
          description={
            language === "en"
              ? "Dr. Ahmed Mohammed Al Ali's published insights in Al Bayan Newspaper detail the intersection of advanced technology, peaceful nuclear developments, and clean energy strategies."
              : "توضح الرؤى المنشورة للدكتور أحمد محمد آل علي في صحيفة البيان نقطة الالتقاء بين التكنولوجيا المتقدمة، والتطورات النووية السلمية، واستراتيجيات الطاقة النظيفة."
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              date: "July 2024",
              dateAr: "يوليو 2024",
              title: "The Boom in AI Technologies and Sustainable Energy",
              titleAr: "طفرة تقنيات الذكاء الاصطناعي والطاقة المستدامة",
              excerpt: "An in-depth column on how generative artificial intelligence and neural computing networks optimize smart grid efficiency and accelerate resource sustainability.",
              excerptAr: "مقال معمق حول كيفية مساهمة الذكاء الاصطناعي التوليدي وشبكات الحوسبة العصبية في تحسين كفاءة الشبكات الذكية وتسريع استدامة الموارد.",
              url: "https://www.albayan.ae/opinions/articles/2024-07-18-1.4906171",
              icon: Zap
            },
            {
              date: "April 2024",
              dateAr: "أبريل 2024",
              title: "Nuclear Tech and the Future of Sustainable Agriculture",
              titleAr: "التقنيات النووية وتعزيز مستقبل التنمية الزراعية المستدامة",
              excerpt: "Exploring the strategic applications of peaceful nuclear technology and safe atomic isotopes in augmenting food production and agricultural adaptation.",
              excerptAr: "استكشاف التطبيقات الاستراتيجية للتكنولوجيا النووية السلمية والنظائر الذرية الآمنة في زيادة الإنتاج الغذائي والتكيف الزراعي.",
              url: "https://www.albayan.ae/opinions/articles/2024-04-21-1.4858429",
              icon: Leaf
            },
            {
              date: "January 2024",
              dateAr: "يناير 2024",
              title: "Artificial Intelligence and Clean Energy",
              titleAr: "الذكاء الاصطناعي والطاقة النظيفة",
              excerpt: "Analyzing the role of predictive models, machine learning, and automation in load balancing and clean energy generation forecasting.",
              excerptAr: "تحليل دور النماذج التنبؤية، والتعلم الآلي، والأتمتة في موازنة الأحمال والتنبؤ بتوليد الطاقة النظيفة.",
              url: "https://www.albayan.ae/opinions/articles/2024-01-07-1.4796105",
              icon: Globe
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-card border border-border p-10 rounded-[2.5rem] shadow-lg flex flex-col justify-between group hover:border-secondary/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="space-y-6">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors`}>
                    <item.icon size={22} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    {language === "en" ? item.date : item.dateAr}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-display font-black text-slate-800 leading-snug group-hover:text-primary transition-colors">
                    {language === "en" ? item.title : item.titleAr}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed opacity-90">
                    {language === "en" ? item.excerpt : item.excerptAr}
                  </p>
                </div>
              </div>

              <div className={`pt-6 mt-8 border-t border-slate-100 flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {language === "en" ? "AL BAYAN COLUMN" : "العمود في البيان"}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.15em] group/link hover:gap-3 transition-all ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  {language === "en" ? "READ ARTICLE" : "اقرأ المقال"}
                  <ExternalLink size={14} className="group-hover/link:translate-y-[-2px] group-hover/link:translate-x-[2px] transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reports & Downloads */}
      <Section>
        <SectionHeader
          label={t("vis_dashboard_tag")}
          title={t("sus_report_title")}
          description={t("sus_report_desc")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportsData.map((report, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`bg-card border border-border p-8 rounded-3xl shadow-md flex flex-col justify-between ${isRTL ? "text-right" : ""}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 ${isRTL ? "mr-auto ml-0" : ""}`}>
                  <FileText className="text-accent" />
                </div>
                <div className="text-secondary font-black text-lg mb-2">{report.year}</div>
                <h4 className="text-xl font-display font-black text-foreground mb-4 leading-tight">
                  {t(`sus_${report.key}`)}
                </h4>
              </div>
              <div className={`flex items-center justify-between pt-6 border-t border-border ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="text-xs font-bold text-muted-foreground uppercase">{report.size} • {report.type}</span>
                <a href={report.fileUrl} download className="text-primary hover:text-secondary transition-colors inline-flex" aria-label={`Download ${report.year} report`}>
                  <Download size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-foreground mb-8">
            {t("sus_cta_title")}
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-12 opacity-90">
            {t("sus_cta_desc")}
          </p>
          <a href="/reports/sustainability_annual_2024.pdf" download className="inline-block bg-primary text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
            {t("sus_report")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
