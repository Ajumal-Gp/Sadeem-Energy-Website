import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const clients = [
  { name: "Dubai Municipality", fullName: "Dubai Municipality", logo: "/clients/dmLogo.png" },
  { name: "Dubai Police", fullName: "Dubai Police", logo: "/clients/Dubai-Police-Logo.png" },
  { name: "HBMSU", fullName: "Hamdan Bin Mohammed Smart University", logo: "/clients/HBMSU-logo.jpg" },
  { name: "Kangaroo Plastics", fullName: "Kangaroo Plastics Middle East LLC", logo: "/clients/kangaroo-lastic-logo.jpg" },
];


const PartnerLogo = ({ item, isRTL }: { item: { name: string; fullName: string; logo: string }, isRTL: boolean }) => (
  <motion.div
    className="flex-shrink-0 w-64 h-36 bg-white rounded-[2.5rem] flex items-center justify-center px-8 py-6 cursor-pointer relative group overflow-hidden"
    whileHover={{
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.12)",
      scale: 1.02
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <img
        src={item.logo}
        alt={item.fullName}
        className="max-w-full max-h-[70%] w-auto h-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
      />
    </div>

    <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">{item.name}</span>
    </div>
  </motion.div>
);

const CarouselRow = ({ items, direction = "left", isRTL }: { items: any[], direction?: "left" | "right", isRTL: boolean }) => {
  const tripled = [...items, ...items, ...items];

  // Adjust scroll direction based on RTL
  const effectiveDirection = isRTL ? (direction === "left" ? "right" : "left") : direction;
  const animationClass = effectiveDirection === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="relative overflow-hidden py-4">
      <div className={`flex gap-10 ${animationClass}`} style={{ width: "max-content" }}>
        {tripled.map((item, i) => (
          <PartnerLogo key={`${direction}-${i}`} item={item} isRTL={isRTL} />
        ))}
      </div>
    </div>
  );
};

const PartnersCarousel = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="space-y-16">
      {/* Clients Row */}
      <div className="space-y-6">
        <div className={`flex items-center justify-center gap-4 px-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/40">
            {t("part_clients")}
          </h3>
        </div>
        <CarouselRow items={clients} direction="left" isRTL={isRTL} />
      </div>


    </div>
  );
};

export default PartnersCarousel;
