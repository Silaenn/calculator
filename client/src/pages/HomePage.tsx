import React, { useRef } from "react";
import { math, smk } from "@/assets/images/index.ts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/hooks/useTheme";
import Calculator from "@/components/calculator/Calculator";
import ThemeSelector from "@/components/calculator/ThemeSelector";
import ColorGuide from "@/components/calculator/ColorGuide";

interface HomePageProps {
  isNavbarScrolled?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isNavbarScrolled = false }) => {
  const { calculatorColor, isColorApplied, applyTheme } = useTheme();

  const mainRef = useRef<HTMLElement>(null);
  const warnaRef = useRef<HTMLDivElement>(null);
  const calcRef = useRef<HTMLFieldSetElement>(null);
  const petunjukRef = useRef<HTMLDivElement>(null);

  const mainVisible = useScrollReveal(mainRef as React.RefObject<HTMLElement>, 0.05);
  const warnaVisible = useScrollReveal(warnaRef as React.RefObject<HTMLElement>, 0.1);
  const calcVisible = useScrollReveal(calcRef as React.RefObject<HTMLElement>, 0.1);
  const petunjukVisible = useScrollReveal(petunjukRef as React.RefObject<HTMLElement>, 0.1);

  const scrollDown = (pos: number) => window.scrollTo({ top: pos, behavior: "smooth" });

  return (
    <div className="main overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="hero-section min-h-[100svh] relative flex flex-col overflow-hidden">
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-transparent shrink-0 ${
            isNavbarScrolled ? "h-24 md:h-20" : "h-16"
          }`}
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.09] z-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--nb-black) 1.8px, transparent 1.8px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="absolute -bottom-20 -right-20 w-[460px] h-[460px] bg-[var(--nb-teal)] border-[4px] border-[var(--nb-black)] rounded-full opacity-[0.18] pointer-events-none z-0" />

        <div className="hero-bubble">CALC!</div>
        <div className="hero-zap">✦ NEW!</div>
        <div className="hero-star">★</div>

        <div className="flex-1 flex flex-col justify-center py-16 px-4 sm:px-8 relative z-10">
          <div className="hero-inner flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
            <div className="hero-content z-10 flex-1 ">
              <div className="hero-badge animate__animated animate__fadeInDown inline-flex items-center gap-2 px-4 py-2 mb-5">
                <img src={smk} className="rounded-full w-[22px] h-[22px] object-cover" alt="SMK" />
                <span className="font-black text-[10px] sm:text-xs tracking-widest">SMK PGRI PEKANBARU</span>
              </div>

              <h1 className="hero-title animate__animated animate__fadeInLeft mb-3 uppercase tracking-tighter leading-[1.05]">
                Welcome to<br />
                <span className="hero-title-accent">Calgenius</span>
              </h1>

              <p className="hero-sub animate__animated animate__fadeInLeft mb-8 max-w-md">
                by <strong>Deo Silaen</strong> — Kalkulator interaktif serba bisa dengan kustomisasi warna favoritmu!
              </p>

              <button
                className="hero-cta animate__animated animate__fadeInUp"
                onClick={() => scrollDown(1100)}
              >
                Let's Calculate ↓
              </button>
            </div>

            <div className="hero-img-wrap animate__animated animate__fadeInRight relative flex-shrink-0">
              <div className="absolute inset-0 bg-[var(--nb-teal)] rounded-full blur-[80px] opacity-25 animate-pulse"></div>
              <img
                src={math}
                alt="Kalkulator ilustrasi"
                className="hero-img w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <main className="main-section py-20 px-6" ref={mainRef}>
        <div className="main-bg-deco" aria-hidden="true">
          <div className="main-deco-1" />
          <div className="main-deco-2" />
          <div className="main-deco-3" />
          <div className="main-deco-dots" />
        </div>

        <div className={`main-heading-wrap reveal-fade mb-20 text-center ${mainVisible ? "revealed" : ""}`}>
          <div className="main-section-tag inline-block px-4 py-1 mb-4">
            ⚡ Kalkulator Interaktif
          </div>
          <h2 className="main-heading text-3xl sm:text-5xl font-black uppercase mb-4 tracking-tighter">
            Hitung. Warnai. Ekspresikan.
          </h2>
          <p className="main-subheading text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Sesuaikan tampilan kalkulator dengan warna favoritmu,
            atau aktifkan mode scientific untuk perhitungan yang lebih kompleks.
          </p>
        </div>

        <div className="containerL flex flex-row flex-wrap xl:flex-nowrap gap-6 md:gap-8 xl:gap-12 justify-center items-start md:items-stretch xl:items-stretch max-w-7xl mx-auto w-full px-4">
          <ThemeSelector 
            onApply={applyTheme} 
            visible={warnaVisible} 
            containerRef={warnaRef} 
          />

          <div className="w-full xl:flex-[1.5] flex justify-center min-w-0 order-1 xl:order-2 mx-auto xl:mx-0 relative">
            <Calculator 
              theme={calculatorColor} 
              isColorApplied={isColorApplied} 
              calcVisible={calcVisible} 
              calcRef={calcRef} 
            />
          </div>

          <ColorGuide 
            theme={calculatorColor} 
            isColorApplied={isColorApplied} 
            visible={petunjukVisible} 
            containerRef={petunjukRef} 
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
