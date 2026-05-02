import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "../data/index.ts";
import { body, math, smk, sound } from "@/assets/images/index.ts";
import { evaluate } from "mathjs";

const btnValues = [
  ["C", "DEL", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

type calculator = {
  badan: string;
  angka: string;
  operator: string;
};

function useScrollReveal(ref: React.RefObject<HTMLElement>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return visible;
}

interface HomePageProps {
  isNavbarScrolled?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isNavbarScrolled = false }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [isPopping, setIsPopping] = useState(false);
  const [calculatorColor, setCalculatorColor] = useState<calculator>({ badan: "", angka: "", operator: "" });
  const [nextColor, setNextColor] = useState<calculator>({ badan: "", angka: "", operator: "" });
  const [isColorApplied, setIsColorApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scientificMode, setScientificMode] = useState(false);
  const [additionalButtons, setAdditionalButtons] = useState<{ value: string }[]>([]);

  const mainRef     = useRef<HTMLElement>(null);
  const warnaRef    = useRef<HTMLDivElement>(null);
  const calcRef     = useRef<HTMLFieldSetElement>(null);
  const petunjukRef = useRef<HTMLDivElement>(null);

  const mainVisible     = useScrollReveal(mainRef as React.RefObject<HTMLElement>, 0.05);
  const warnaVisible    = useScrollReveal(warnaRef as React.RefObject<HTMLElement>, 0.1);
  const calcVisible     = useScrollReveal(calcRef as React.RefObject<HTMLElement>, 0.1);
  const petunjukVisible = useScrollReveal(petunjukRef as React.RefObject<HTMLElement>, 0.1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playClickSound = () => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); }
  };

  useEffect(() => {
    setIsPopping(true);
    const t = setTimeout(() => setIsPopping(false), 150);
    return () => clearTimeout(t);
  }, [displayValue]);

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string> } }) =>
    setSearchTerm(e.target.value);

  const initializeNextColor = (category: string, id: string) =>
    setNextColor(warna[category][id] as calculator);

  const applyNewColor = () => {
    setIsColorApplied(true);
    setCalculatorColor(nextColor);
    localStorage.setItem("calculatorColor", JSON.stringify(nextColor));
  };

  useEffect(() => { if (nextColor.badan) applyNewColor(); }, [nextColor]);

  useEffect(() => {
    const stored = localStorage.getItem("calculatorColor");
    if (stored) { setCalculatorColor(JSON.parse(stored)); setIsColorApplied(true); }
  }, []);

  const getButtonClassName = (btn: string | number) => {
    switch (btn) {
      case "C": case "DEL":                           return "button btn-danger";
      case "=":                                        return "button btn-equals";
      case "%": case "÷": case "×": case "-":
      case "+": case ".": case "+/-":                  return "button btn-operator";
      default:                                         return "button btn-digit";
    }
  };

  const getButtonStyle = (btn: string | number) => {
    if (!isColorApplied) return {};
    if (typeof btn === "number" || (typeof btn === "string" && btn >= "0" && btn <= "9"))
      return { backgroundColor: calculatorColor.angka };
    if (["%","÷","×","-","+",".","÷","+/-","=","C","DEL"].includes(btn as string))
      return { backgroundColor: calculatorColor.operator };
    return {};
  };

  const handleScientificModeToggle = () => {
    setScientificMode((p) => !p);
    setAdditionalButtons(!scientificMode
      ? [{ value: "π" }, { value: "√" }, { value: "x²" }, { value: "x³" }]
      : []);
    playClickSound();
  };

  const evaluateExpression = () => {
    try {
      const expr = displayValue
        .replace(/×/g, "*").replace(/÷/g, "/")
        .replace(/(\d+)π/g, (_, p) => `${p} * pi`)
        .replace(/²/g, "**2").replace(/³/g, "**3")
        .replace(/√(\d+(\.\d+)?)/g, (_, p) => `sqrt(${p})`)
        .replace(/(\d+)%/g, (_, p) => `${p} / 100`);
      setDisplayValue(evaluate(expr).toString());
    } catch { setDisplayValue("Error"); }
  };

  const handleButtonClick = (btn: string | number) => {
    const symMap: Record<string, string> = { "π":"π","√":"√","x²":"²","x³":"³" };
    switch (btn) {
      case "C":   setDisplayValue(""); break;
      case "DEL": setDisplayValue((v) => v.slice(0, -1)); break;
      case "=":   evaluateExpression(); break;
      case "%":   setDisplayValue((v) => v.includes("%") ? v : v + "%"); break;
      case "+/-":
        setDisplayValue((v) => {
          if (v.includes("+") || v.includes("-")) {
            const i = Math.max(v.lastIndexOf("+"), v.lastIndexOf("-"));
            const a = v.substring(0, i + 1);
            let b = v.substring(i + 1);
            b = b.startsWith("-") ? b.slice(1) : "-" + b;
            return a + b;
          }
          return v.startsWith("-") ? v.slice(1) : "-" + v;
        });
        break;
      default:
        if (symMap[btn as string]) setDisplayValue((v) => v + symMap[btn as string]);
        else setDisplayValue((v) => v + btn);
    }
    playClickSound();
  };

  const scrollDown = (pos: number) => window.scrollTo({ top: pos, behavior: "smooth" });

  return (
    <>
      {/* Spacer navbar */}
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[var(--nb-yellow)] ${
          isNavbarScrolled ? "h-24 md:h-20" : "h-16"
        }`}
      />

      <div className="main overflow-x-hidden">

        {/* ══════════════════════════════
            HERO SECTION
        ══════════════════════════════ */}
        <div className="hero-section min-h-[90vh] py-20 px-6 sm:px-12 relative flex flex-col justify-center overflow-hidden">
          {/* Decorative elements — warna sesuai sistem */}
          <div className="hero-bubble hidden lg:flex">CALC!</div>
          <div className="hero-zap hidden lg:block">✦ NEW!</div>
          <div className="hero-star hidden lg:block">★</div>

          <div className="hero-inner flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full">
            <div className="hero-content md:text-center lg:text-left z-10 flex-1">
              {/* Badge */}
              <div className="hero-badge animate__animated animate__fadeInDown inline-flex items-center gap-2 px-4 py-2 mb-6">
                <img src={smk} style={{ borderRadius: "50%", width: 24, height: 24, objectFit: "cover" }} alt="SMK" />
                <span className="font-black text-xs sm:text-sm tracking-widest">SMK PGRI PEKANBARU</span>
              </div>

              {/* Title */}
              <h1 className="hero-title animate__animated animate__fadeInLeft text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.1] uppercase tracking-tighter">
                Welcome to<br />
                {/* hero-title-accent = white + black shadow di atas yellow bg */}
                <span className="hero-title-accent">Calgenius</span>
              </h1>

              <p className="hero-sub animate__animated animate__fadeInLeft text-base sm:text-xl font-bold mb-10 max-w-xl mx-auto lg:mx-0">
                by <strong>Deo Silaen</strong> — Kalkulator interaktif serba bisa dengan kustomisasi warna favoritmu!
              </p>

              {/* CTA — black bg, yellow shadow (brand) */}
              <button
                className="hero-cta animate__animated animate__fadeInUp"
                onClick={() => scrollDown(1100)}
              >
                Let's Calculate ↓
              </button>
            </div>

            <div className="hero-img-wrap animate__animated animate__fadeInRight w-full max-w-[300px] sm:max-w-[450px] lg:max-w-[500px] relative">
              {/* Glow blob — teal, bukan pink */}
              <div className="absolute inset-0 bg-[var(--nb-teal)] rounded-full blur-[80px] opacity-25 animate-pulse"></div>
              <img
                src={math}
                alt="Kalkulator ilustrasi"
                className="hero-img w-full h-auto relative z-10 drop-shadow-[20px_20px_0px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            MAIN CONTENT SECTION
        ══════════════════════════════ */}
        <main className="main-section py-20 px-6" ref={mainRef}>
          <div className="main-bg-deco" aria-hidden="true">
            <div className="main-deco-1" />
            <div className="main-deco-2" />
            <div className="main-deco-3" />
            <div className="main-deco-dots" />
          </div>

          {/* Section heading */}
          <div className={`main-heading-wrap reveal-fade mb-20 text-center ${mainVisible ? "revealed" : ""}`}>
            {/* Tag — violet (special) */}
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

          <div className="containerL flex flex-col lg:flex-row gap-12 items-center lg:items-start max-w-7xl mx-auto">

            {/* ── Panel kiri: Pilih Warna ── */}
            <div
              className={`panel warna w-full max-w-md bg-white p-6 border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_#000] reveal-left ${warnaVisible ? "revealed" : ""}`}
              ref={warnaRef}
            >
              <h5 className="font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="text-2xl">🎨</span> Pilih Warna
              </h5>
              <Input
                placeholder="Cari Jenis Warna (ex: Pastel, Cold)"
                className="mb-6 h-12 border-2 border-black rounded-xl font-bold px-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="swatch-scroll max-h-[400px] overflow-y-auto pr-2 space-y-4">
                {Object.keys(warna).map((category) => {
                  if (!category.toLowerCase().includes(searchTerm.toLowerCase())) return null;
                  return (
                    <div key={category} className="space-y-4">
                      <p className="font-black text-xs uppercase opacity-40 mb-2 border-b-2 border-black inline-block">{category}</p>
                      {Object.keys(warna[category]).map((id) => {
                        const { badan, angka, operator } = warna[category][id];
                        return (
                          <div key={id} className="bg-[#f8f8f8] p-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] space-y-3">
                            <div className="flex gap-2 h-10">
                              <div className="flex-1 rounded-lg border-2 border-black" style={{ backgroundColor: badan }} />
                              <div className="flex-1 rounded-lg border-2 border-black" style={{ backgroundColor: angka }} />
                              <div className="flex-1 rounded-lg border-2 border-black" style={{ backgroundColor: operator }} />
                            </div>
                            {/* Apply button — teal via btn-ganti class */}
                            <Button
                              className="btn-ganti w-full font-black uppercase text-xs rounded-lg h-10"
                              onClick={() => { initializeNextColor(category, id); applyNewColor(); }}
                            >
                              Apply Theme
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Kalkulator ── */}
            <div className="flex-1 flex justify-center w-full">
              <fieldset
                id="container"
                ref={calcRef}
                className={`reveal-up w-full max-w-[360px] sm:max-w-[400px] p-6 sm:p-8 border-[4px] border-black rounded-[2.5rem] shadow-[12px_12px_0px_#000] ${calcVisible ? "revealed" : ""}`}
                style={{ backgroundColor: isColorApplied ? calculatorColor.badan : "var(--nb-yellow)" }}
              >
                <form name="calculator">
                  <audio ref={audioRef} hidden><source src={sound} type="audio/mp3" /></audio>
                  <div className="calc-brand font-black text-xs tracking-[0.3em] text-center mb-6 opacity-30">
                    CALGENIUS FX-1
                  </div>
                  <input
                    className={`display ${isPopping ? "display-pop" : ""} w-full h-20 bg-white border-[3px] border-black rounded-2xl mb-8 px-6 text-right text-3xl font-black shadow-inner`}
                    type="text"
                    value={displayValue}
                    readOnly
                    placeholder="0"
                  />
                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {/* Scientific toggle — black bg, yellow shadow */}
                    <button
                      type="button"
                      className="col-span-2 button btn-scientific bg-black text-white rounded-xl h-12 sm:h-14 font-black uppercase text-xs tracking-widest border-2 border-black shadow-[4px_4px_0px_var(--nb-yellow)] active:shadow-none transition-all mb-2"
                      onClick={handleScientificModeToggle}
                    >
                      {scientificMode ? "Simple" : "Scientific"}
                    </button>

                    {/* Scientific extra buttons — teal via btn-sci-extra */}
                    {scientificMode && additionalButtons.map((b, i) => (
                      <button
                        type="button"
                        key={i}
                        className="button btn-sci-extra border-2 border-black rounded-xl h-12 sm:h-14 font-black text-xl shadow-[3px_3px_0px_#000] active:shadow-none transition-all"
                        onClick={() => handleButtonClick(b.value)}
                      >
                        {b.value}
                      </button>
                    ))}

                    {btnValues.flat().map((btn, i) => (
                      <button
                        className={`${getButtonClassName(btn)} flex items-center justify-center rounded-xl sm:rounded-2xl h-14 sm:h-16 border-[3px] border-black font-black text-xl sm:text-2xl shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
                        type="button"
                        key={i}
                        value={String(btn)}
                        onClick={() => handleButtonClick(btn)}
                        style={getButtonStyle(btn)}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </form>
              </fieldset>
            </div>

            {/* ── Panel kanan: Petunjuk ── */}
            <div
              className={`panel petunjuk w-full max-w-md bg-white p-8 border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_#000] reveal-right ${petunjukVisible ? "revealed" : ""}`}
              ref={petunjukRef}
            >
              <h5 className="font-black uppercase tracking-widest mb-6">📖 Quick Guide</h5>
              <div className="flex justify-center mt-3 mb-8">
                <div className="relative group">
                  {/* Rotated bg — yellow (primary brand) */}
                  <div className="absolute inset-0 bg-[var(--nb-yellow)] border-2 border-black rounded-xl rotate-3 group-hover:rotate-0 transition-all"></div>
                  <img
                    src={body}
                    width={220}
                    alt="Petunjuk warna"
                    className="relative border-[3px] border-black rounded-xl shadow-[4px_4px_0px_#000]"
                  />
                </div>
              </div>
              <p className="font-black text-sm uppercase mb-4 border-b-2 border-black inline-block">Color Categories:</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Default","Pastel","Cold","Sky","Rainbow","Coffee"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--nb-yellow)] border-2 border-black rounded-lg font-bold text-xs uppercase shadow-[2px_2px_0px_#000]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium leading-relaxed bg-[var(--nb-bg)] p-4 rounded-xl border-2 border-black border-dashed">
                Pilih warna favoritmu lalu klik <strong>Apply Theme</strong> untuk mengubah tampilan kalkulator secara real-time!
              </p>
            </div>

          </div>
        </main>

      </div>
    </>
  );
};

export default HomePage;