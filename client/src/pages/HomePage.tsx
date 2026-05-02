import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "../data/index.ts";
import { body, math, smk, sound } from "@/assets/images/index.ts";
import { evaluate } from "mathjs";
import { TrashIcon, BackspaceIcon, BeakerIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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
  const [prevExpression, setPrevExpression] = useState("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
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
    if (!displayValue) return;
    try {
      const expr = displayValue
        .replace(/×/g, "*").replace(/÷/g, "/")
        .replace(/(\d+)π/g, (_, p) => `${p} * pi`)
        .replace(/²/g, "**2").replace(/³/g, "**3")
        .replace(/√(\d+(\.\d+)?)/g, (_, p) => `sqrt(${p})`)
        .replace(/(\d+)%/g, (_, p) => `${p} / 100`);
      
      const result = evaluate(expr);
      setPrevExpression(displayValue + " =");
      setDisplayValue(result.toString());
    } catch { 
      setDisplayValue("Error"); 
    }
  };

  const handleButtonClick = (btn: string | number) => {
    const symMap: Record<string, string> = { "π":"π","√":"√","x²":"²","x³":"³" };
    
    // Clear previous expression if starting a new calculation after an "="
    if (prevExpression.includes("=")) {
      setPrevExpression("");
    }

    switch (btn) {
      case "C":   
        setDisplayValue(""); 
        setPrevExpression("");
        break;
      case "DEL": 
        setDisplayValue((v) => v.slice(0, -1)); 
        break;
      case "=":   
        evaluateExpression(); 
        break;
      case "%":   
        setDisplayValue((v) => v.includes("%") ? v : v + "%"); 
        break;
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

          <div className="containerL flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-8 justify-center items-center md:items-start max-w-7xl mx-auto">

            {/* ── Panel kiri: Pilih Warna ── */}
            <div
              className={`panel warna w-full max-w-md bg-white p-6 border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_#000] reveal-left ${warnaVisible ? "revealed" : ""}`}
              ref={warnaRef}
            >
              <h5 className="font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faPalette} className="text-xl" /> Pilih Warna
              </h5>
              <div className="relative mb-6">
                <Input
                  placeholder="Cari Jenis Warna (ex: Pastel, Cold)"
                  className="h-12 border-2 border-black rounded-xl font-bold px-4 focus:ring-0 focus:border-black"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute right-3 top-3 opacity-20">
                  <AdjustmentsHorizontalIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="swatch-scroll max-h-[400px] overflow-y-auto pr-3 space-y-6">
                {Object.keys(warna).map((category) => {
                  if (!category.toLowerCase().includes(searchTerm.toLowerCase())) return null;
                  return (
                    <div key={category} className="space-y-4">
                      <p className="font-black text-xs uppercase opacity-40 mb-2 border-b-2 border-black inline-block">{category}</p>
                      {Object.keys(warna[category]).map((id) => {
                        const { badan, angka, operator } = warna[category][id];
                        return (
                          <div key={id} className="bg-[#f8f8f8] p-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] space-y-3 transition-transform hover:translate-y-1 hover:translate-x-0.5 mb-2">
                            <div className="flex gap-2 h-10">
                              <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: badan }} title="Background" />
                              <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: angka }} title="Digits" />
                              <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: operator }} title="Operators" />
                            </div>
                            {/* Apply button — teal via btn-ganti class */}
                            <Button
                              className="btn-ganti w-full font-black uppercase text-xs rounded-lg h-10 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-y-[2px]"
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
                className={`reveal-up w-full max-w-[360px] sm:max-w-[500px] p-6 sm:p-10 border-[4px] border-black rounded-[3rem] shadow-[16px_16px_0px_#000] transition-all duration-300 ${calcVisible ? "revealed" : ""}`}
                style={{ backgroundColor: isColorApplied ? calculatorColor.badan : "var(--nb-yellow)" }}
              >
                <form name="calculator" onSubmit={(e) => e.preventDefault()}>
                  <audio ref={audioRef} hidden><source src={sound} type="audio/mp3" /></audio>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="calc-brand font-black text-[10px] tracking-[0.4em] uppercase opacity-40">
                      CALGENIUS FX-2.0
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
                      <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
                    </div>
                  </div>

                  <div className="display-container relative w-full mb-8">
                    <div className="absolute top-2 right-6 text-right text-xs font-black opacity-40 h-4 overflow-hidden">
                      {prevExpression}
                    </div>
                    <input
                      className={`display ${isPopping ? "display-pop" : ""} w-full h-24 bg-white border-[4px] border-black rounded-[1.5rem] pt-6 px-6 text-right text-4xl font-black shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] focus:outline-none`}
                      type="text"
                      value={displayValue}
                      readOnly
                      placeholder="0"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {/* Scientific toggle */}
                    <div className="col-span-4">
                      <button
                        type="button"
                        className={`!w-full button flex items-center justify-center gap-2 rounded-xl h-12 font-black uppercase text-xs tracking-widest border-2 border-black transition-all mb-2 ${
                          scientificMode 
                          ? "bg-[var(--nb-teal)] text-black shadow-[4px_4px_0px_#000]" 
                          : "bg-black text-white shadow-[4px_4px_0px_var(--nb-yellow)]"
                        } active:shadow-none active:translate-y-[2px]`}
                        onClick={handleScientificModeToggle}
                      >
                        <BeakerIcon className="w-4 h-4" />
                        {scientificMode ? "Simple Mode" : "Scientific Mode"}
                      </button>
                    </div>

                    {/* Scientific extra buttons */}
                    {scientificMode && (
                      <div className="col-span-4 grid grid-cols-4 gap-3 sm:gap-4 mb-2 animate__animated animate__fadeInDown animate__faster">
                        {additionalButtons.map((b, i) => (
                          <button
                            type="button"
                            key={i}
                            className="button !w-full !h-12 sm:!h-14 flex items-center justify-center border-2 border-black rounded-xl font-black text-xl shadow-[4px_4px_0px_#000] active:shadow-none active:translate-y-[2px] transition-all bg-white hover:bg-gray-50"
                            onClick={() => handleButtonClick(b.value)}
                          >
                            {b.value}
                          </button>
                        ))}
                      </div>
                    )}

                    {btnValues.flat().map((btn, i) => {
                      const isSpecial = ["C", "DEL"].includes(btn as string);
                      const isOperator = ["÷", "×", "-", "+", "=", "%", ".", "+/-"].includes(btn as string);
                      
                      return (
                        <button
                          className={`${getButtonClassName(btn)} !w-full !h-14 sm:!h-16 flex items-center justify-center rounded-2xl border-[3px] border-black font-black text-xl sm:text-2xl shadow-[4px_4px_0px_#000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
                          type="button"
                          key={i}
                          onClick={() => handleButtonClick(btn)}
                          style={getButtonStyle(btn)}
                        >
                          {btn === "C" ? (
                            <TrashIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                          ) : btn === "DEL" ? (
                            <BackspaceIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                          ) : (
                            btn
                          )}
                        </button>
                      );
                    })}
                  </div>
                </form>
              </fieldset>
            </div>

            {/* ── Panel kanan: Panduan Warna ── */}
            <div
              className={`panel petunjuk w-full max-w-md bg-white p-8 border-[3px] border-black rounded-2xl shadow-[8px_8px_0px_#000] reveal-right ${petunjukVisible ? "revealed" : ""}`}
              ref={petunjukRef}
            >
              <h5 className="font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleInfo} className="text-xl" /> Color Guide
              </h5>

              <div className="space-y-6 mb-10">
                {/* Background Guide */}
                <div className="flex items-center gap-4 group">
                  <div 
                    className="w-16 h-16 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000] flex-shrink-0 transition-transform group-hover:rotate-3"
                    style={{ backgroundColor: isColorApplied ? calculatorColor.badan : "var(--nb-yellow)" }}
                  />
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight mb-1">Background (Badan)</p>
                    <p className="text-xs font-medium opacity-70">Warna utama untuk bingkai dan dasar kalkulator.</p>
                  </div>
                </div>

                {/* Digits Guide */}
                <div className="flex items-center gap-4 group">
                  <div 
                    className="w-16 h-16 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000] flex-shrink-0 transition-transform group-hover:-rotate-3"
                    style={{ backgroundColor: isColorApplied ? calculatorColor.angka : "#FAFAFA" }}
                  />
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight mb-1">Digits (Angka)</p>
                    <p className="text-xs font-medium opacity-70">Warna untuk tombol angka 0-9 dan titik desimal.</p>
                  </div>
                </div>

                {/* Operators Guide */}
                <div className="flex items-center gap-4 group">
                  <div 
                    className="w-16 h-16 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000] flex-shrink-0 transition-transform group-hover:rotate-3"
                    style={{ backgroundColor: isColorApplied ? calculatorColor.operator : "var(--nb-teal)" }}
                  />
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight mb-1">Operators (Simbol)</p>
                    <p className="text-xs font-medium opacity-70">Warna untuk tombol fungsi (+, -, ×, ÷, =, dll).</p>
                  </div>
                </div>
              </div>

              <p className="font-black text-sm uppercase mb-4 border-b-2 border-black inline-block">Style Categories:</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Default","Pastel","Cold","Sky","Rainbow","Coffee"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--nb-yellow)] border-2 border-black rounded-lg font-bold text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] transition-transform cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="text-sm font-medium leading-relaxed bg-[#f0f0f0] p-4 rounded-xl border-2 border-black border-dashed">
                <p><strong>Tips:</strong> Gunakan kategori di atas pada kolom pencarian di panel kiri untuk menemukan tema yang spesifik!</p>
              </div>
            </div>

          </div>
        </main>

      </div>
    </>
  );
};

export default HomePage;