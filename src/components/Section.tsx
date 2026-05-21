import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  alt?: boolean;
}

const Section = ({ children, className = "", id, alt }: SectionProps) => (
  <section id={id} className={`py-20 lg:py-28 ${alt ? "section-alt" : ""} ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionHeader = ({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="text-center max-w-4xl mx-auto mb-20"
  >
    {label && (
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[2px] w-8 bg-secondary/40" />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
          {label}
        </span>
        <div className="h-[2px] w-8 bg-secondary/40" />
      </div>
    )}
    <h2 className="text-4xl lg:text-5xl font-display font-black text-foreground mb-8 leading-tight tracking-tighter">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto font-medium opacity-80 italic">
        {description}
      </p>
    )}
  </motion.div>
);

export { Section, SectionHeader };
