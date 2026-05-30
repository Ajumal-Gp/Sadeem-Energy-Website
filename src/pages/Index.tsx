import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Recycle, BarChart3, Droplets, Thermometer, Brain, ArrowRight, Building2, Factory, Landmark, Zap, Globe2, ShieldCheck } from "lucide-react";

import { Section, SectionHeader } from "@/components/Section";
import AnimatedCounter from "@/components/AnimatedCounter";
import PartnersCarousel from "@/components/PartnersCarousel";
import HeroSlider from "@/components/home/HeroSlider";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Certifications from "@/components/home/Certifications";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import { GovernmentAlignment } from "@/components/home/GovernmentAlignment";
import { useLanguage } from "@/lib/LanguageContext";

import serviceSolar from "@/assets/service-solar.jpg";
import serviceWaste from "@/assets/service-waste.jpg";
import serviceWater from "@/assets/service-water.jpg";
import serviceCooling from "@/assets/service-cooling.jpg";
import serviceAuditing from "@/assets/service-auditing.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceNuclear from "@/assets/service-nuclear.jpg";


const servicesData = [
  { icon: Thermometer, key: "cooling", image: serviceCooling },
  { icon: BarChart3, key: "metering", image: serviceAuditing },
  { icon: Sun, key: "solar", image: serviceSolar },
  { icon: Recycle, key: "waste", image: serviceWaste },
  { icon: Droplets, key: "water", image: serviceWater },
  { icon: ShieldCheck, key: "radiation", image: serviceNuclear },
  { icon: Brain, key: "grid", image: serviceAi },
];

const statsData = [
  { value: "2018", key: "established" },
  { value: "1.5M", key: "connections" },
  { value: "99.9%", key: "reliability" },
  { value: "45%", key: "carbon" },
];

const industriesData = [
  { icon: Landmark, key: "gov" },
  { icon: Zap, key: "real" },
  { icon: Building2, key: "ind" },
  { icon: Factory, key: "hosp" },
];

const Home = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-white overflow-x-hidden">
      <HeroSlider />

      {/* Elegant Compact Stats Bar */}
      <section className="relative z-30 pt-12 lg:pt-16 container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-50">
          {statsData.map((s, i) => (
            <div key={i} className="py-8 lg:py-10 px-6 text-center group">
              <div className="text-3xl lg:text-4xl font-display font-black text-slate-900 mb-1 tracking-tight group-hover:text-primary transition-colors">
                <AnimatedCounter value={s.value} label="" className="!p-0 !bg-transparent !shadow-none !border-none !text-slate-900" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {t(`stats_${s.key}`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Compact Elegant Version */}
      <WhyChooseUs />

      {/* Elegant Services Grid */}
      <Section className="!py-20 lg:!py-32">
        <SectionHeader
          label={t("services_label")}
          title={t("services_title")}
          description={t("services_desc")}
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/services"
                className="group relative block aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 shadow-xl"
              >
                <img
                  src={svc.image}
                  alt={t(`service_${svc.key}`)}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                <div className={`absolute inset-0 p-8 lg:p-10 flex flex-col justify-end ${isRTL ? "text-right" : "text-left"}`}>
                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                      <svc.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-display font-black text-white group-hover:text-primary transition-colors duration-500 leading-tight">
                        {t(`service_${svc.key}`)}
                      </h3>
                      <p className="text-sm text-white/70 font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 max-w-[240px]">
                        {t(`service_${svc.key}_desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Impact Metrics - Elegant Data View */}
      <ImpactMetrics />

      {/* Government Alignment */}
      <GovernmentAlignment />

      {/* Sectors We Serve - Elegant High-Density Grid */}
      <Section className="bg-white !py-16 lg:!py-24 border-y border-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
              <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                {t("ind_label")}
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tighter">
                {t("ind_title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            {industriesData.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 lg:p-12 group hover:bg-slate-900 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col gap-10 h-full justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                    <ind.icon size={28} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-black text-slate-900 group-hover:text-white transition-colors duration-500 leading-tight">
                    {t(`ind_${ind.key}`)}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications */}
      <Certifications />

      {/* Partners & Clients - Elegant Presentation */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className={`lg:w-1/3 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                {language === 'en' ? 'OUR NETWORK' : 'شبكتنا'}
              </div>
              <h2 className="text-4xl font-display font-black text-slate-900 leading-tight">
                {t("cta_title")}
              </h2>
            </div>
            <div className="lg:w-2/3">
              <PartnersCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Compact CTA */}
      <section className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-10"
          >
            <h2 className="text-4xl lg:text-7xl font-display font-black text-white leading-[0.95] tracking-tighter">
              {t("cta_title")}
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto italic">
              "{t("cta_desc")}"
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <Link
                to="/contact"
                className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4"
              >
                {t("cta_btn")} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white/20 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/5 transition-all flex items-center justify-center"
              >
                {t("cta_success")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
