import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import logo from "@/assets/sadeem-logo.png";

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const socialLinks = [
    { icon: <Linkedin size={18} />, url: "https://ae.linkedin.com/company/sadeemenergy", label: "LinkedIn" },
    { icon: <Instagram size={18} />, url: "https://www.instagram.com/sadeem.energy/", label: "Instagram" },
    { icon: <Youtube size={18} />, url: "https://www.youtube.com/@Sadeem_Energy", label: "YouTube" },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ), url: "https://www.tiktok.com/@sadeem_energy", label: "TikTok"
    }
  ];

  return (
    <footer className="hero-gradient text-primary-foreground">
      {/* Certifications Bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-primary-foreground/60">
            <span className="flex items-center gap-2">🛡️ ISO 9001:2015 — Quality Management</span>
            <span className="flex items-center gap-2">🌱 ISO 14001:2015 — Environmental Management</span>
            <span className="flex items-center gap-2">⚠️ ISO 45001:2018 — Occupational Health & Safety</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
            <img src={logo} alt="Sadeem Energy" className={`h-20 w-auto brightness-0 invert ${isRTL ? "mr-0 ml-auto" : ""}`} />
            <p className="text-base opacity-80 leading-relaxed font-medium">
              {t("footer_tagline")}
            </p>
            <p className="text-sm opacity-60 leading-relaxed italic">
              {t("footer_desc")}
            </p>

            {/* Social Links */}
            <div className={`flex items-center gap-4 pt-2 ${isRTL ? "justify-end" : "justify-start"}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-display font-black text-secondary uppercase tracking-tight">{t("footer_quick_links")}</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: t("nav_home"), path: "/" },
                { label: t("nav_services"), path: "/services" },
                { label: t("nav_about"), path: "/about" },
                { label: t("nav_projects"), path: "/projects" },
                { label: t("nav_news"), path: "/news" },
                { label: t("nav_contact"), path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium opacity-80 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-display font-black text-secondary uppercase tracking-tight">{t("footer_expertise")}</h4>
            <div className="flex flex-col gap-3 text-sm font-medium opacity-80">
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_cooling_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_metering_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_solar_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_waste_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_water_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_grid_full")}</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">{t("service_ev_full")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <h4 className="text-lg font-display font-black text-secondary uppercase tracking-tight">{t("footer_contact")}</h4>
            <div className="flex flex-col gap-3 text-sm font-medium opacity-80">
              <div className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{t("footer_address")}</span>
              </div>
              <a href="mailto:info@sadeemenergy.com" className={`flex items-center gap-2 hover:text-secondary transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                <Mail size={16} className="shrink-0" />
                <span>info@sadeemenergy.com</span>
              </a>
              <div className={`flex flex-col gap-2 ${isRTL ? "items-end" : "items-start"}`}>
                <a href="tel:+971501947777" className={`flex items-center gap-2 hover:text-secondary transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Phone size={16} className="shrink-0" />
                  <span>+971 50 194 7777</span>
                </a>
                <a href="tel:+97142599011" className={`flex items-center gap-2 hover:text-secondary transition-colors ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Phone size={16} className="shrink-0 opacity-0" />
                  <span>+971 425 990 11</span>
                </a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs opacity-60">{t("footer_hours")}</p>
              <p className="text-xs opacity-60">{t("footer_closed")}</p>
            </div>
          </div>
        </div>

        <div className={`border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold opacity-60 ${isRTL ? "flex-row-reverse" : ""}`}>
          <span>© {new Date().getFullYear()} Sadeem Energy. {t("footer_rights")}</span>
          <span className="text-secondary italic">{t("footer_partner")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
