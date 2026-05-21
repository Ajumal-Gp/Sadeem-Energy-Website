import { motion } from "framer-motion";
import { ShieldCheck, Scale, Award, FileCheck, Landmark, ChevronRight, BarChart3, Building2, Eye, Gavel, Globe2, BookOpen, ExternalLink } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";

const governancePoliciesData = [
  { key: "conduct", icon: ShieldCheck },
  { key: "transparency", icon: Scale },
  { key: "anti_bribery", icon: Award },
  { key: "risk", icon: FileCheck }
];

const committeesData = [
  { key: "audit", icon: BarChart3 },
  { key: "strategy", icon: Building2 },
  { key: "sustain", icon: Eye },
  { key: "nomination", icon: Gavel }
];

const Leadership = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Enterprise Hero - Vision Alignment Style */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            alt="Corporate Governance"
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
                <ShieldCheck size={12} /> {language === 'en' ? 'INSTITUTIONAL EXCELLENCE' : 'التميز المؤسسي'}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {language === "en" ? "Governance for a" : "الحوكمة من أجل"} <br />
                <span className="text-primary/60">{language === "en" ? "Sustainable" : "مستقبل"}</span> {language === "en" ? "Future." : "مستدام."}
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {language === "en" 
                  ? "Sadeem Energy operates under a world-class governance framework designed to ensure transparency, accountability, and operational excellence."
                  : "تعمل سديم للطاقة تحت إطار حوكمة عالمي المستوى مصمم لضمان الشفافية والمساءلة والتميز التشغيلي."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Excellence Hub - Seamless Full-Width Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative min-h-[70vh] flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070" 
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
              alt="Institutional Excellence" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 pt-40 pb-24">
            <div className={`max-w-4xl ${isRTL ? "mr-auto ml-0 text-right" : ""}`}>
              <div className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-8">
                {language === 'en' ? 'OUR STANDARD' : 'معيارنا'}
              </div>
              <h2 className="text-4xl lg:text-7xl font-display font-black text-white mb-8 leading-[0.95] tracking-tighter">
                {language === 'en' ? 'Institutional Excellence.' : 'التميز المؤسسي.'}
              </h2>
              <p className="text-slate-400 text-xl lg:text-2xl font-medium leading-relaxed mb-12">
                {language === 'en' 
                  ? "Operating at the intersection of global best practices and national strategic agility. We build systems that are as resilient as they are efficient."
                  : "نعمل عند نقطة التقاء أفضل الممارسات العالمية والمرونة الاستراتيجية الوطنية. نحن نبني أنظمة تتميز بالمرونة بقدر ما تتميز بالكفاءة."}
              </p>
              <div className={`grid grid-cols-2 gap-12 border-t border-white/10 pt-12 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div>
                  <div className="text-4xl font-display font-black text-white mb-2 tracking-tighter">100%</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">{language === 'en' ? 'Compliance' : 'الامتثال'}</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-black text-secondary mb-2 tracking-tighter">A+</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">{language === 'en' ? 'Risk Rating' : 'تصنيف المخاطر'}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Governance Framework */}
      <Section>
        <SectionHeader
          label={t("lead_pillar_tag")}
          title={t("lead_pillar_title")}
          description={t("lead_pillar_desc")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {governancePoliciesData.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border border-border bg-card shadow-lg hover:shadow-2xl transition-all group hover:border-secondary/30 ${isRTL ? "text-right" : ""}`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors ${isRTL ? "mr-auto ml-0" : ""}`}>
                <policy.icon size={28} className="text-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-display font-black text-foreground mb-4">
                {t(`lead_${policy.key}_title`)}
              </h3>
              <p className="text-muted-foreground font-medium leading-relaxed opacity-90">
                {t(`lead_${policy.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* Strategic Column Insight - Thought Leadership */}
      <Section alt>
        <div className={`max-w-6xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> {language === "en" ? "NATIONAL POLICY & SECURITY" : "السياسة الوطنية والأمن"}
          </div>

          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-white p-8 md:p-12 lg:p-16 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 lg:w-[60%]">
              <span className="text-secondary font-black uppercase tracking-[0.2em] text-xs">
                {language === "en" ? "CHAIRMAN'S OPINION COLUMN" : "مقال الرأي لرئيس مجلس الإدارة"}
              </span>
              <h3 className="text-3xl lg:text-5xl font-display font-black text-slate-900 tracking-tighter leading-tight">
                {language === "en" ? "Energy Strategies and Digital Shield Readiness" : "استراتيجيات الطاقة وجاهزية الدرع الرقمية"}
              </h3>
              <div className={`h-1.5 w-24 bg-primary rounded-full ${isRTL ? "mr-0 ml-auto" : ""}`} />
              
              <p className="text-slate-500 text-lg lg:text-xl leading-relaxed font-medium">
                {language === "en" 
                  ? "Sadeem Energy's corporate governance incorporates cutting-edge cybersecurity principles published at the national level by our Chairman, Dr. Ahmed Mohammed Al Ali. In this strategic column in Al Bayan, he outlines how grid security and digital shielding are the pillars of future national energy sovereignty."
                  : "تتضمن حوكمة الشركات في سديم للطاقة مبادئ الأمن السيبراني المتطورة المنشورة على المستوى الوطني بقلم رئيس مجلس الإدارة، الدكتور أحمد محمد آل علي. في هذا المقال الاستراتيجي في صحيفة البيان، يوضح كيف يمثل أمن الشبكات والدرع الرقمية ركائز سيادة الطاقة الوطنية المستقبلية."}
              </p>

              <div className="pt-4">
                <a
                  href="https://www.albayan.ae/opinions/articles/2024-08-04-1.4914018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {language === "en" ? "Read Column on Al Bayan" : "اقرأ المقال في صحيفة البيان"}
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="lg:w-[40%] flex justify-center shrink-0 w-full">
              <div className="w-full max-w-sm p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200/60 shadow-xl space-y-6 relative overflow-hidden group hover:border-secondary/30 hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 bg-primary/10 text-primary font-black uppercase text-[9px] tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  {language === "en" ? "AL BAYAN" : "البيان"}
                </div>
                <div className="space-y-2 pt-4">
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    {language === "en" ? "PUBLISHED AUGUST 4, 2024" : "نُشر في 4 أغسطس 2024"}
                  </div>
                  <h4 className="text-xl font-display font-black text-slate-800 leading-snug">
                    "{language === "en" ? "The digital shield is as critical to energy resilience as physical transmission." : "الدرع الرقمي لا يقل أهمية عن نقل الطاقة المادي لمرونة قطاع الطاقة."}"
                  </h4>
                </div>
                <div className="border-t border-slate-200/60 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src="/src/assets/dr-ahmed.jpeg" alt="Dr. Ahmed" className="w-full h-full object-cover animate-slow-zoom" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">{language === "en" ? "Dr. Ahmed Mohammed Al Ali" : "د. أحمد محمد آل علي"}</div>
                    <div className="text-[10px] font-bold text-slate-400">{language === "en" ? "Chairman & Columnist" : "رئيس مجلس الإدارة والكاتب"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Strategic Policy & Security Columns (Replacing Compliance Bar) */}
      <Section>
        <SectionHeader
          label={language === "en" ? "STRATEGIC POLICY COLUMNS" : "مقالات السياسة الاستراتيجية"}
          title={language === "en" ? "Governance & National Security Insights" : "رؤى الحوكمة والأمن الوطني"}
          description={
            language === "en"
              ? "Further insights from our Chairman on shaping national energy security, global diplomatic strategy, and critical infrastructure defense."
              : "المزيد من رؤى رئيس مجلس الإدارة حول تشكيل أمن الطاقة الوطني، والاستراتيجية الدبلوماسية العالمية، والدفاع عن البنية التحتية الحيوية."
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              date: "September 2023",
              dateAr: "سبتمبر 2023",
              title: "Energy and Water Security in the GCC",
              titleAr: "أمن الطاقة والمياه في دول مجلس التعاون",
              excerpt: "Analyzing the strategic imperatives for securing critical utility resources across the Gulf Cooperation Council amidst geopolitical shifts.",
              excerptAr: "تحليل الضرورات الاستراتيجية لتأمين موارد المرافق الحيوية في جميع أنحاء مجلس التعاون الخليجي وسط التحولات الجيوسياسية.",
              url: "https://www.albayan.ae/opinions/articles/2023-09-24-1.4732819",
              icon: Globe2
            },
            {
              date: "October 2023",
              dateAr: "أكتوبر 2023",
              title: "Strategic Importance of UAE Hosting COP28",
              titleAr: "الأهمية الاستراتيجية في استضافة الإمارات «كوب 28»",
              excerpt: "Evaluating the diplomatic and policy frameworks that established the UAE as the central global hub for international climate and energy agreements.",
              excerptAr: "تقييم الأطر الدبلوماسية والسياسية التي جعلت من دولة الإمارات المركز العالمي الرئيسي للاتفاقيات الدولية للمناخ والطاقة.",
              url: "https://www.albayan.ae/opinions/articles/2023-10-01-1.4736704",
              icon: Landmark
            },
            {
              date: "February 2020",
              dateAr: "فبراير 2020",
              title: "Combating Nuclear and Biological Terrorism",
              titleAr: "مكافحة الإرهاب النووي والبيولوجي",
              excerpt: "A foundational policy paper on institutional preparedness, regulatory governance, and safeguarding advanced energy infrastructure from extreme threats.",
              excerptAr: "ورقة سياسات تأسيسية حول الاستعداد المؤسسي، والحوكمة التنظيمية، وحماية البنية التحتية المتقدمة للطاقة من التهديدات القصوى.",
              url: "https://www.albayan.ae/opinions/articles/2020-02-10-1.3774545",
              icon: ShieldCheck
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
    </div>
  );
};

export default Leadership;
