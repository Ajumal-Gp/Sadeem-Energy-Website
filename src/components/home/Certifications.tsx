import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { useLanguage } from "@/lib/LanguageContext";

import certIso9001 from "@/assets/cert-iso9001.png";
import certIso14001 from "@/assets/cert-iso14001.png";
import certIso45001 from "@/assets/cert-iso45001.png";

const certificationsData = [
  { image: certIso9001, name: "ISO 9001:2015", key: "iso9001" },
  { image: certIso14001, name: "ISO 14001:2015", key: "iso14001" },
  { image: certIso45001, name: "ISO 45001:2018", key: "iso45001" },
];

const Certifications = () => {
  const { t, language } = useLanguage();

  return (
    <Section alt>
      <SectionHeader
        label={t("cert_label")}
        title={t("cert_title")}
        description={t("cert_desc")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {certificationsData.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="flex flex-col items-center text-center p-4 transition-all duration-300"
          >
            <img
              src={cert.image}
              alt={cert.name}
              loading="lazy"
              width={512}
              height={512}
              className="w-28 h-28 object-contain mb-5"
            />
            <h3 className="font-display font-bold text-foreground text-base mb-1">{cert.name}</h3>
            <p className="text-sm text-muted-foreground font-medium opacity-90">
              {language === "en" ? 
                (cert.key === "iso9001" ? "Quality Management Systems" : cert.key === "iso14001" ? "Environmental Management" : "Health & Safety Systems") : 
                (cert.key === "iso9001" ? "نظم إدارة الجودة" : cert.key === "iso14001" ? "إدارة البيئة" : "نظم الصحة والسلامة")}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Certifications;
