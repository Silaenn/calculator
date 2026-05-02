import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "../data/index.ts";
import { body, math, smk, noData, sound } from "@/assets/images/index.ts";
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

// ── Hook: scroll-triggered, fires ONCE only ──
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

  // refs for scroll reveal
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
      case "C": case "DEL": return "button btn-danger";
      case "=": return "button btn-equals";
      case "%": case "÷": case "×": case "-": case "+": case ".": case "+/-":
        return "button btn-operator";
      default: return "button btn-digit";
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
      {/* ══════════════════════════════
          SPACER: Mencegah konten tertutup navbar fixed
      ══════════════════════════════ */}
      <div 
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isNavbarScrolled ? "h-20" : "h-16"
        }`} 
      />

      <div className="main overflow-x-hidden">

        {/* ══════════════════════════════
            HERO SECTION
        ══════════════════════════════ */}
        <div className="hero-section">
          <div className="hero-bubble">CALC!</div>
          <div className="hero-zap">✦ NEW!</div>
          <div className="hero-star">★</div>

          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge animate__animated animate__fadeInDown">
                <img src={smk} style={{ borderRadius: "50%", width: 28, height: 28, objectFit: "cover" }} alt="SMK" />
                SMK PGRI PEKANBARU
              </div>
              <h1 className="hero-title animate__animated animate__fadeInLeft">
                Welcome to<br />
                <span className="hero-title-accent">Calgenius</span>
              </h1>
              <p className="hero-sub animate__animated animate__fadeInLeft">
                by <strong>Deo Silaen</strong> — Kalkulator serba bisa
              </p>
              <button className="hero-cta animate__animated animate__fadeInUp" onClick={() => scrollDown(800)}>
                Lihat Kalkulator ↓
              </button>
            </div>
            <div className="hero-img-wrap animate__animated animate__fadeInRight">
              <img src={math} alt="Kalkulator ilustrasi" className="hero-img" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            MAIN CONTENT SECTION
        ══════════════════════════════ */}
        <main className="main-section" ref={mainRef}>
          {/* Background decorations */}
          <div className="main-bg-deco" aria-hidden="true">
            <div className="main-deco-1" />
            <div className="main-deco-2" />
            <div className="main-deco-3" />
            <div className="main-deco-dots" />
          </div>

          {/* Section heading */}
          <div className={`main-heading-wrap reveal-fade ${mainVisible ? "revealed" : ""}`}>
            <div className="main-section-tag">⚡ Kalkulator Interaktif</div>
            <h2 className="main-heading">Hitung. Warnai. Ekspresikan.</h2>
            <p className="main-subheading">
              Sesuaikan tampilan kalkulator dengan warna favoritmu,
              atau aktifkan mode scientific untuk perhitungan yang lebih kompleks.
            </p>
          </div>

          <div className="containerL">
            {/* ── Panel kiri: Pilih Warna ── */}
            <div
              className={`panel warna reveal-left ${warnaVisible ? "revealed" : ""}`}
              ref={warnaRef}
            >
              <h5>🎨 Pilih Warna</h5>
              <Input
                placeholder="Cari Jenis Warna"
                className="mb-3"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ border: "2px solid var(--nb-black)", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              />
              <div className="swatch-scroll">
                {Object.keys(warna).map((category) => {
                  if (!category.toLowerCase().includes(searchTerm.toLowerCase())) return null;
                  return (
                    <div key={category}>
                      {Object.keys(warna[category]).map((id) => {
                        const { badan, angka, operator } = warna[category][id];
                        const bd = { border: "2px solid var(--nb-black)" };
                        return (
                          <div key={id} className="swatch-group">
                            <div className="swatch-item" style={{ ...bd, backgroundColor: badan, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                              <span className="swatch-label">{badan}</span>
                            </div>
                            <div className="swatch-item" style={{ ...bd, backgroundColor: angka }}>
                              <span className="swatch-label">{angka}</span>
                            </div>
                            <div className="swatch-item" style={{ ...bd, backgroundColor: operator, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                              <span className="swatch-label">{operator}</span>
                            </div>
                            <Button className="btn-ganti" onClick={() => { initializeNextColor(category, id); applyNewColor(); }}>
                              Ganti Warna
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                {Object.keys(warna).every(c => !c.toLowerCase().includes(searchTerm.toLowerCase())) && (
                  <div className="no-data">
                    <img src={noData} width={140} className="mb-4" alt="Tidak ada data" />
                    <p style={{ fontSize: 13, fontWeight: 700 }}>Kategori tidak ditemukan</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Kalkulator ── */}
            <fieldset
              id="container"
              ref={calcRef}
              className={`reveal-up ${calcVisible ? "revealed" : ""}`}
              style={{ backgroundColor: isColorApplied ? calculatorColor.badan : "" }}
            >
              <form name="calculator">
                <audio ref={audioRef} hidden><source src={sound} type="audio/mp3" /></audio>
                <div className="calc-brand">CALGENIUS FX-1</div>
                <input
                  className={`display ${isPopping ? "display-pop" : ""}`}
                  type="text"
                  value={displayValue}
                  readOnly
                  placeholder="0"
                />
                <div className="btn-grid">
                  <button type="button" className="button btn-scientific" onClick={handleScientificModeToggle}>
                    {scientificMode ? "⬅ Simple" : "Scientific ⚗️"}
                  </button>
                  {scientificMode && additionalButtons.map((b, i) => (
                    <button type="button" key={i} className="button btn-sci-extra" onClick={() => handleButtonClick(b.value)}>
                      {b.value}
                    </button>
                  ))}
                  {btnValues.flat().map((btn, i) => (
                    <button
                      className={getButtonClassName(btn)}
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

            {/* ── Panel kanan: Petunjuk ── */}
            <div
              className={`panel petunjuk reveal-right ${petunjukVisible ? "revealed" : ""}`}
              ref={petunjukRef}
            >
              <h5>📖 Petunjuk</h5>
              <div className="flex justify-center mt-3 mb-4">
                <img src={body} width={220} alt="Petunjuk warna"
                  style={{ border: "2.5px solid var(--nb-black)", borderRadius: 8, boxShadow: "4px 4px 0px var(--nb-black)" }}
                />
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                Cari warna dengan ketik salah satu:
              </p>
              <div className="color-tags">
                {["Default","Pastel","Cold","Sky","Rainbow","Coffee"].map((tag) => (
                  <span key={tag} className="color-tag">{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, marginTop: 14, lineHeight: 1.7 }}>
                Pilih warna favoritmu lalu klik <strong>Ganti Warna</strong> untuk mengubah tampilan kalkulator!
              </p>
            </div>
          </div>
        </main>

      </div>
    </>
  );
};

export default HomePage;