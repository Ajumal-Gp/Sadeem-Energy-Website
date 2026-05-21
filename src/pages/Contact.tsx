import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";
import corporateHero from "@/assets/corporate-energy-hero.png";

const SCRIPT_URL = import.meta.env.VITE_CONTACT_SCRIPT_URL || "";

const Contact = () => {
  const { t, isRTL, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      // Create URL-encoded form parameters
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("email", formData.email);
      params.append("phone", formData.phone);
      params.append("subject", formData.subject);
      params.append("message", formData.message);

      // Submit to Google Apps Script Web App
      await fetch(SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz_MOCK_URL/exec", {
        method: "POST",
        mode: "no-cors", // Google Apps Script redirects require no-cors mode to bypass preflight CORS blocks
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      toast.success(t("contact_success_toast"));
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error(t("contact_error_toast"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Mail size={12} /> {t("contact_hero_tag")}
              </div>
              
              <h1 className="text-4xl lg:text-8xl font-display font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                {t("contact_hero_title")}
              </h1>
              
              <p className="text-slate-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium opacity-80">
                {t("contact_hero_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Section>
        <div className={`grid lg:grid-cols-5 gap-12 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-2 space-y-8 ${isRTL ? "text-right" : "text-left"}`}
          >
            <div>
              <h3 className="text-3xl font-display font-black text-foreground mb-8">{t("contact_info_title")}</h3>
              <div className="space-y-8">
                <div className={`flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm border border-primary/20 text-primary">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-lg mb-1">{language === "en" ? "Office Location" : "موقع المكتب"}</h4>
                    <p className="text-muted-foreground font-medium opacity-90">{t("footer_address")}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 shadow-sm border border-secondary/20 text-secondary">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-lg mb-1">{language === "en" ? "Strategic Inquiries" : "الاستفسارات الاستراتيجية"}</h4>
                    <a href="mailto:info@sadeemenergy.com" className="text-primary font-bold hover:underline">info@sadeemenergy.com</a>
                  </div>
                </div>
                <div className={`flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm border border-primary/20 text-primary">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-lg mb-1">{language === "en" ? "Support Hotline" : "خط الدعم"}</h4>
                    <div className="flex flex-col">
                      <a href="tel:+971501947777" className="text-primary font-bold hover:underline">+971 50 194 7777</a>
                      <a href="tel:+97142599011" className="text-primary font-bold hover:underline">+971 425 990 11</a>
                    </div>
                  </div>
                </div>
                <div className={`flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0 text-muted-foreground">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-lg mb-1">{language === "en" ? "Working Hours" : "ساعات العمل"}</h4>
                    <p className="text-muted-foreground font-medium opacity-90">{t("footer_hours")}</p>
                    <p className="text-muted-foreground font-medium opacity-90">{t("footer_closed")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Response */}
            <div className="p-8 rounded-[2rem] bg-card border-2 border-primary/10 shadow-xl relative overflow-hidden group">
              <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} p-4 opacity-5 group-hover:rotate-12 transition-transform`}>
                <Send size={100} />
              </div>
              <h4 className="font-display font-black text-foreground text-xl mb-4">{language === "en" ? "Express Inquiry" : "استفسار سريع"}</h4>
              <p className="text-muted-foreground leading-relaxed font-medium opacity-90">
                {language === "en" ?
                  "Our strategic advisory team prioritizes municipal and industrial inquiries. Expect a comprehensive brief within 12 business hours." :
                  "فريقنا الاستشاري الاستراتيجي يعطي الأولوية للاستفسارات البلدية والصناعية. توقع ملخصاً شاملاً خلال 12 ساعة عمل."}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className={`space-y-6 p-10 lg:p-14 rounded-[3rem] border border-border bg-card shadow-2xl ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-2 mb-8">
                <h3 className="text-3xl font-display font-black text-foreground">{t("contact_form_title")}</h3>
                <p className="text-muted-foreground font-medium opacity-90">
                  {language === "en" ? "State your infrastructure requirements below." : "اذكر متطلبات البنية التحتية الخاصة بك أدناه."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{t("contact_name")} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border border-input bg-background/50 text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all ${isRTL ? "text-right" : ""}`}
                    placeholder={language === "en" ? "Enter full name" : "أدخل الاسم الكامل"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{t("contact_email")} *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border border-input bg-background/50 text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all ${isRTL ? "text-right" : ""}`}
                    placeholder="name@company.ae"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{language === "en" ? "Phone Number" : "رقم الهاتف"}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border border-input bg-background/50 text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all ${isRTL ? "text-right" : ""}`}
                    placeholder="+971 5X XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">{t("contact_subject")} *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border border-input bg-background/50 text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all ${isRTL ? "text-right" : ""}`}
                    placeholder={language === "en" ? "e.g. Smart Grid, District Cooling" : "مثال: الشبكة الذكية، تبريد المناطق"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">{t("contact_message")} *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-5 py-4 rounded-2xl border border-input bg-background/50 text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none ${isRTL ? "text-right" : ""}`}
                  placeholder={language === "en" ? "Outline your project scope..." : "حدد نطاق مشروعك..."}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    {language === "en" ? "Sending..." : "جاري الإرسال..."}
                    <Loader2 size={20} className="animate-spin" />
                  </>
                ) : (
                  <>
                    {t("contact_send")} <Send size={20} className={isRTL ? "rotate-180" : ""} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
