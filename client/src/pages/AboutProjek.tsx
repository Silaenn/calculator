import orng from "@/assets/images/orng.png";

const AboutProjek = () => {
  return (
    <div
      className="min-h-screen bg-[var(--nb-teal)] relative overflow-hidden font-['Space_Grotesk'] text-[var(--nb-black)] flex flex-col"
    >
      {/* Spacer — teal (bg halaman ini adalah teal) */}
      <div className="h-16 bg-[var(--nb-teal)] shrink-0" />

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(var(--nb-black) 2px, transparent 2px), linear-gradient(90deg, var(--nb-black) 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        {/* Kotak kuning — lebih kecil & lebih tersembunyi di mobile */}
        <div className="absolute -top-16 -left-16 w-28 h-28 sm:w-44 sm:h-44 md:w-64 md:h-64 bg-[var(--nb-yellow)] border-[8px] border-[var(--nb-black)] rotate-12 opacity-75 z-0" />

        {/* Kotak violet — oke, tapi kecilkan sedikit di mobile */}
        <div className="absolute bottom-0 right-0 w-36 h-16 sm:w-60 sm:h-24 md:w-80 md:h-32 bg-[var(--nb-violet)] border-[8px] border-[var(--nb-black)] -rotate-6 opacity-70 z-0" />

        {/* + — pojok kiri atas, di atas heading bukan di belakang card */}
        <div className="absolute top-[5%] sm:top-[3%] left-[5%] text-4xl sm:text-5xl md:text-6xl font-black opacity-30 animate-pulse rotate-12 z-10 text-[var(--nb-black)]">+</div>

        {/* × — pojok kanan atas */}
        <div className="absolute top-[2%] sm:top-[3%] right-[6%] text-4xl sm:text-5xl md:text-7xl font-black opacity-30 animate-bounce z-10 text-[var(--nb-black)]">×</div>

        {/* - — pojok kiri bawah */}
        <div className="absolute lg:bottom-[25%] md:bottom-[1%] bottom-[.5%] left-[5%] text-4xl sm:text-6xl md:text-8xl font-black opacity-20 animate-pulse z-10 text-[var(--nb-black)]">-</div>

        {/* ÷ — pojok kanan bawah */}
        <div className="absolute lg:bottom-[20%] md:bottom-[3%] bottom-[1%] right-[4%] text-4xl sm:text-5xl md:text-6xl font-black opacity-30 z-10 text-[var(--nb-black)]">÷</div>

        <div className="max-w-4xl mx-auto relative z-10 w-full animate__animated animate__fadeInUp py-12 md:py-20">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[var(--nb-black)] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.15)]">
              About Project
            </h1>
            {/* Underline — yellow (brand accent) */}
            <div className="h-2 w-24 bg-[var(--nb-yellow)] border-[2px] border-[var(--nb-black)] rounded-lg mx-auto" />
          </div>

          {/* Main Card */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 md:p-10 lg:p-12 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[10px_10px_0px_var(--nb-black)] flex flex-col lg:flex-row items-center gap-8 lg:gap-12 hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
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

            <div className="w-full md:max-w-md lg:w-[40%] flex-shrink-0 relative group">
``              <img
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
    </div>
  );
};

export default AboutProjek;