import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

const testimonials = [
  {
    quote: "Sadeem Energy transformed our facility's energy profile. Their comprehensive audit identified critical inefficiencies, and their solar installation reduced our electricity costs by 22% in the first year.",
    name: "Mohammed Al Rashid",
    role: "Operations Director",
    company: "Al Rashid Industrial Group",
    rating: 5,
  },
  {
    quote: "Their AI-driven monitoring system gave us real-time visibility into our energy consumption across 12 buildings. The insights have been invaluable for our sustainability reporting.",
    name: "Sara Al Maktoum",
    role: "Sustainability Manager",
    company: "Emirates Commercial Properties",
    rating: 5,
  },
  {
    quote: "Working with Sadeem Energy on our water desalination project was exceptional. Their team combined technical expertise with genuine commitment to environmental stewardship.",
    name: "Dr. Khalid Hassan",
    role: "Chief Engineer",
    company: "Gulf Water Technologies",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <Section>
      <SectionHeader
        label="Client Success"
        title="What Our Clients Say"
        description="Hear from organizations that have partnered with us to achieve their sustainability goals."
      />
      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8 lg:p-12 text-center"
          >
            <Quote size={40} className="text-secondary/30 mx-auto mb-6" />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={18} className="text-secondary fill-secondary" />
              ))}
            </div>
            <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 italic">
              "{testimonials[current].quote}"
            </p>
            <div>
              <p className="font-display font-bold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
              <p className="text-sm text-primary font-medium">{testimonials[current].company}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
