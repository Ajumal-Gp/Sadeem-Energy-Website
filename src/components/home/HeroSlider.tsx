import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Pause, Play, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

import heroBg from "@/assets/hero-bg.jpg";
import serviceSolar from "@/assets/service-solar.jpg";
import uaePrideFinal from "@/assets/POU_6.png";

const heroSlides = [
  {
    image: uaePrideFinal,
    id: 3,
  },
  {
    image: heroBg,
    video: "https://cdn.pixabay.com/video/2020/03/26/34303-401732731_large.mp4",
    id: 1,
  },
  {
    image: serviceSolar,
    video: "https://cdn.pixabay.com/video/2023/10/22/186064-876829774_large.mp4",
    id: 2,
  },
];



const SLIDE_DURATION = 7000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const { t, isRTL } = useLanguage();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    resetProgress();
  }, [resetProgress]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    resetProgress();
  }, [resetProgress]);

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - (progress / 100) * SLIDE_DURATION;
      timerRef.current = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION - (progress / 100) * SLIDE_DURATION);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentSlide, nextSlide]);

  useEffect(() => {
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(pct);
      }, 30);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, currentSlide]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const slideId = heroSlides[currentSlide].id;
  const title = t(`hero_title_${slideId}`);
  const highlight = t(`hero_highlight_${slideId}`);

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#001529]">
      {/* Background images with crossfade */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {heroSlides[currentSlide].video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              key={heroSlides[currentSlide].video}
              className="w-full h-full object-cover"
              poster={heroSlides[currentSlide].image}
            >
              <source src={heroSlides[currentSlide].video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroSlides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent ${isRTL ? "rotate-180" : ""}`} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${isRTL}`}
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-primary text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6">
                {t(`hero_tagline_${slideId}`)}
              </span>
              <h1 className="text-4xl lg:text-7xl font-display font-black text-foreground mb-6 leading-[1.1] tracking-tighter">
                {title.split(highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-secondary italic">
                        {highlight}
                      </span>
                    )}
                  </span>
                ))}
              </h1>
              <p className="text-lg lg:text-2xl text-muted-foreground/80 mb-10 max-w-xl leading-relaxed font-medium">
                {t(`hero_desc_${slideId}`)}
              </p>
              {slideId !== 3 && (
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    to="/services"
                    className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 inline-flex items-center justify-center gap-3"
                  >
                    {t("hero_explore")} <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white border border-border text-foreground px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all inline-flex items-center justify-center shadow-lg"
                  >
                    {t("hero_contact")}
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls - Matching Screenshot */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
        {/* Prev Arrow */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} className={isRTL ? "rotate-180" : ""} />
        </button>

        {/* Play/Pause with Circle */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-white hover:border-white transition-all"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="relative group"
            >
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i === currentSlide 
                    ? "bg-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                    : "bg-white/30 hover:bg-white/50"
                }`} 
              />
              {i === currentSlide && (
                <svg className="absolute -inset-1.5 -rotate-90 w-6 h-6">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="white"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray="56.5"
                    strokeDashoffset={56.5 - (progress / 100) * 56.5}
                    className="transition-all duration-[30ms] ease-linear"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight size={24} className={isRTL ? "rotate-180" : ""} />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
