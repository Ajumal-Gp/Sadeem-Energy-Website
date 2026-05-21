import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import logo from "@/assets/sadeem-logo.png";



const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Home", key: "home", path: "/" },
    {
      label: "Services",
      key: "services",
      path: "/services",
      megaMenu: [
        {
          id: "urban",
          label: language === "en" ? "Urban Solutions" : "حلول حضرية",
          content: [
            { title: t("service_cooling"), description: t("service_cooling_desc"), link: "/services" },
            { title: t("service_water"), description: t("service_water_desc"), link: "/services" },
            { title: t("service_ev_full"), description: language === "en" ? "National network of ultra-fast smart EV charging stations." : "شبكة وطنية من محطات شحن المركبات الكهربائية فائقة السرعة.", link: "/services" },
          ]
        },
        {
          id: "smart",
          label: language === "en" ? "Smart Infrastructure" : "بنية تحتية ذكية",
          content: [
            { title: t("service_metering_full"), description: t("service_metering_desc"), link: "/services" },
            { title: t("service_grid_full"), description: t("service_grid_desc"), link: "/services" },
          ]
        },
        {
          id: "renewable",
          label: language === "en" ? "Renewable Energy" : "طاقة متجددة",
          content: [
            { title: t("service_solar_full"), description: t("service_solar_desc"), link: "/services" },
            { title: t("service_waste_full"), description: t("service_waste_desc"), link: "/services" },
          ]
        }
      ]
    },
    { label: "About Us", key: "about", path: "/about" },
    {
      label: "Corporate",
      key: "corporate",
      megaMenu: [
        {
          id: "strategy",
          label: language === "en" ? "Our Foundation" : "أساسنا",
          content: [
            { title: language === "en" ? "Vision Alignment" : "مواءمة الرؤية", description: t("vis_hero_desc"), link: "/vision" },
            { title: language === "en" ? "Leadership & Governance" : "القيادة والحوكمة", description: t("lead_hero_desc"), link: "/leadership" },
          ]
        },
        {
          id: "esg",
          label: language === "en" ? "Sustainability" : "الاستدامة",
          content: [
            { title: language === "en" ? "ESG & Sustainability" : "الاستدامة وESG", description: t("sus_hero_desc"), link: "/sustainability" },
            { title: language === "en" ? "Impact Reports" : "تقارير التأثير", description: t("sus_report"), link: "/sustainability" },
          ]
        }
      ]
    },
    { label: "Projects", key: "projects", path: "/projects" },
    { label: "News", key: "news", path: "/news" },
    { label: "Contact Us", key: "contact", path: "/contact" },
  ];

  const handleLanguageSwitch = () => {
    toggleLanguage();
    toast.success(language === "en" ? "تم تغيير اللغة إلى العربية" : "Language switched to English", {
      duration: 3000,
    });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (item: any) => {
    if (item.megaMenu) {
      setActiveMegaMenu(item.key);
      setActiveSection(item.megaMenu[0].id);
    } else {
      setActiveMegaMenu(null);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt="Sadeem Energy" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" />
        </Link>

        <div className="hidden lg:flex items-center gap-1 xl:gap-4 h-full">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter(item)}
            >
              {item.megaMenu ? (
                <button
                  onDoubleClick={() => item.path && navigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-semibold transition-all relative
                    ${activeMegaMenu === item.key ? "text-primary" : "text-muted-foreground hover:text-primary"}
                  `}
                >
                  {t(`nav_${item.key}`)}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${activeMegaMenu === item.key ? "rotate-180" : ""}`}
                  />
                  {activeMegaMenu === item.key && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-secondary"
                    />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path!}
                  className={`px-3 py-2 text-[15px] font-semibold transition-all relative
                    ${location.pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary"}
                  `}
                >
                  {t(`nav_${item.key}`)}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-secondary"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <button 
            onClick={handleLanguageSwitch}
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-bold">
              {t("lang_toggle")}
            </span>
          </button>

          <button 
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>

          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full text-[15px] font-bold hover:opacity-90 transition-all shadow-sm flex items-center gap-2"
          >
            {t("nav_contact_btn")}
            <ChevronRight size={16} className={isRTL ? "rotate-180" : ""} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl overflow-hidden"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
          >
            {navItems.find(i => i.key === activeMegaMenu)?.megaMenu && (
              <div className="container mx-auto flex min-h-[350px]">
                {/* Sidebar */}
                <div className={`w-1/4 bg-muted/30 p-8 border-border ${isRTL ? "border-l" : "border-r"}`}>
                  <div className="flex flex-col gap-3">
                    {navItems.find(i => i.key === activeMegaMenu)?.megaMenu?.map((section) => (
                      <button
                        key={section.id}
                        onMouseEnter={() => setActiveSection(section.id)}
                        className={`flex items-center justify-between px-6 py-4 rounded-xl text-lg font-bold transition-all text-left
                          ${activeSection === section.id
                            ? "bg-card text-primary shadow-sm translate-x-2"
                            : "text-muted-foreground hover:text-primary hover:bg-card/50"}
                        `}
                      >
                        {section.label}
                        {activeSection === section.id && <ChevronRight size={20} className={`text-secondary ${isRTL ? "rotate-180" : ""}`} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-3/4 p-12 bg-card">
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-12">
                    {navItems
                      .find(i => i.key === activeMegaMenu)
                      ?.megaMenu?.find(s => s.id === activeSection)
                      ?.content.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link || "#"}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group flex flex-col gap-3 text-left"
                        >
                          <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed text-[14px]">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-20 bg-background z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <div key={item.key} className="border-b border-border last:border-0">
                  {item.megaMenu ? (
                    <div className="py-4">
                      <div className="text-lg font-bold text-primary mb-4">
                        {t(`nav_${item.key}`)}
                      </div>
                      <div className="pl-4 space-y-6">
                        {item.megaMenu.map((section) => (
                          <div key={section.id}>
                            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">{section.label}</div>
                            <div className="grid gap-5">
                              {section.content.map((c, idx) => (
                                <Link
                                  key={idx}
                                  to={c.link || "#"}
                                  onClick={() => setMobileOpen(false)}
                                  className="block"
                                >
                                  <div className="font-bold text-foreground mb-1">{c.title}</div>
                                  <div className="text-xs text-muted-foreground">{c.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-lg font-bold text-foreground"
                    >
                      {t(`nav_${item.key}`)}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-8 grid gap-4">
                <button 
                  onClick={handleLanguageSwitch}
                  className="flex items-center gap-2 font-bold text-foreground"
                >
                  <Globe size={20} /> {t("lang_toggle")}
                </button>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-secondary text-secondary-foreground py-4 text-center font-bold rounded-xl"
                >
                  {t("nav_contact_btn")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={language === "en" ? "Search services, corporate..." : "ابحث عن الخدمات، الشركة..."} />
        <CommandList>
          <CommandEmpty>{language === "en" ? "No results found." : "لم يتم العثور على نتائج."}</CommandEmpty>
          <CommandGroup heading={language === "en" ? "Services" : "الخدمات"}>
            {navItems.find(i => i.key === "services")?.megaMenu?.flatMap(m => m.content).map((item, idx) => (
              <CommandItem key={idx} onSelect={() => { navigate(item.link || "/services"); setSearchOpen(false); }}>
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={language === "en" ? "Corporate" : "الشركة"}>
            <CommandItem onSelect={() => { navigate("/vision"); setSearchOpen(false); }}>{language === "en" ? "Vision Alignment" : "مواءمة الرؤية"}</CommandItem>
            <CommandItem onSelect={() => { navigate("/leadership"); setSearchOpen(false); }}>{language === "en" ? "Leadership & Governance" : "القيادة والحوكمة"}</CommandItem>
            <CommandItem onSelect={() => { navigate("/sustainability"); setSearchOpen(false); }}>{language === "en" ? "Sustainability Hub" : "مركز الاستدامة"}</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
