import orng from "@/assets/images/orng.png";

const AboutProjek = () => {
  return (
    <>
      {/* Spacer — teal (bg halaman ini adalah teal) */}
      <div className="h-16 bg-[var(--nb-teal)]" />

      {/* ══════════════════════════════
          About Page — Teal Background
          Teal = confirm/success tone,
          cocok untuk halaman "tentang projek"
          yang sifatnya informatif & positif.
      ══════════════════════════════ */}
      <div
        className="min-h-screen bg-[var(--nb-teal)] relative overflow-hidden p-6 md:p-12 font-['Space_Grotesk'] text-[var(--nb-black)] flex flex-col items-center justify-center"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(var(--nb-black) 2px, transparent 2px), linear-gradient(90deg, var(--nb-black) 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Angled overlays — yellow (primary brand) & violet (special) */}
        <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-64 sm:h-64 bg-[var(--nb-yellow)] border-[8px] border-[var(--nb-black)] rotate-12 opacity-75 z-0" />
        <div className="absolute bottom-0 right-0 w-48 h-20 sm:w-80 sm:h-32 bg-[var(--nb-violet)] border-[8px] border-[var(--nb-black)] -rotate-6 opacity-70 z-0" />

        {/* Floating math operators — readable di atas teal */}
        <div className="absolute top-[10%] left-[10%] sm:left-[20%] text-4xl sm:text-6xl font-black opacity-25 animate-pulse rotate-12 z-0 text-[var(--nb-black)]">+</div>
        <div className="absolute top-[20%] right-[10%] sm:right-[15%] text-5xl sm:text-7xl font-black opacity-25 animate-bounce z-0 text-[var(--nb-black)]">×</div>
        <div className="absolute bottom-[20%] left-[10%] sm:left-[15%] text-6xl sm:text-8xl font-black opacity-15 animate-pulse delay-700 z-0 text-[var(--nb-black)]">-</div>
        <div className="absolute bottom-[15%] right-[5%] sm:right-[10%] text-4xl sm:text-6xl font-black opacity-25 z-0 text-[var(--nb-black)]">÷</div>

        <div className="max-w-4xl mx-auto relative z-10 w-full animate__animated animate__fadeInUp py-20">

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[var(--nb-black)] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.15)]">
              About Project
            </h1>
            {/* Underline — yellow (brand accent) */}
            <div className="h-2 w-24 bg-[var(--nb-yellow)] border-[2px] border-[var(--nb-black)] rounded-lg mx-auto" />
          </div>

          {/* Main Card */}
          <div className="bg-[#FAF9F6] p-6 sm:p-10 md:p-12 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[10px_10px_0px_var(--nb-black)] flex flex-col lg:flex-row gap-10 hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex-1 space-y-6">
              {/* Title underline — yellow (primary brand) */}
              <h3 className="font-['Space_Mono'] text-xl md:text-2xl font-black uppercase underline underline-offset-4 decoration-[var(--nb-yellow)] decoration-4">
                CalGenius FX-1
              </h3>
              <p className="font-bold text-base md:text-lg leading-relaxed text-slate-900">
                Selamat datang di website <strong>CalGenius</strong>. Proyek ini dikembangkan sebagai bagian dari Uji Kompetensi Keahlian (UKK) di <strong>SMKS PGRI Pekanbaru</strong>.
              </p>
              <p className="font-medium text-sm md:text-base text-slate-700 leading-relaxed">
                CalGenius lebih dari sekadar alat hitung. Kami merancang pengalaman belajar matematika yang mendalam dan interaktif. Dengan fitur kustomisasi warna, kami ingin membuktikan bahwa teknologi dan kreativitas mampu mengubah persepsi pembelajaran matematika menjadi lebih menyenangkan dan relevan bagi siswa.
              </p>

              {/* CTA badge — violet (special), hover ke yellow (brand) */}
              <div className="inline-block px-6 py-3 bg-[var(--nb-violet)] text-[var(--nb-white)] border-[3px] border-[var(--nb-black)] rounded-2xl shadow-[4px_4px_0px_var(--nb-black)] font-['Space_Mono'] font-black text-sm uppercase tracking-wider hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)] transition-all cursor-pointer active:scale-95">
                Happy Coding! ☕💻
              </div>
            </div>

            <div className="lg:w-2/5 flex-shrink-0 relative group">
              <img
                src={orng}
                className="w-full h-auto border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[8px_8px_0px_var(--nb-black)] group-hover:rotate-3 group-hover:scale-[1.02] transition-all duration-300"
                alt="About Project"
              />
              {/* Hover badge — yellow (brand) */}
              <div className="absolute -top-4 -right-4 bg-[var(--nb-yellow)] border-[3px] border-[var(--nb-black)] px-4 py-2 rounded-xl text-xs md:text-sm font-black rotate-12 opacity-0 group-hover:opacity-100 transition-all shadow-[2px_2px_0px_var(--nb-black)]">
                UKK 2026
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutProjek;