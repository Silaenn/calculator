import orng from "@/assets/images/orng.png";

const AboutProjek = () => {
  return (
    <>
      <div className="h-16 bg-[var(--nb-blue)]" />
      
      {/* Container with Blue Background & Layered Decor */}
      <div className="min-h-screen bg-[var(--nb-blue)] relative overflow-hidden p-6 md:p-12 font-['Space_Grotesk'] text-[var(--nb-black)]">
        
        {/* Geometric Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.1]" 
             style={{ backgroundImage: "linear-gradient(var(--nb-black) 2px, transparent 2px), linear-gradient(90deg, var(--nb-black) 2px, transparent 2px)", backgroundSize: "40px 40px" }} />

        {/* Sharp Angled Overlays */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[var(--nb-pink)] border-[8px] border-[var(--nb-black)] rotate-12 opacity-80 z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-32 bg-[var(--nb-yellow)] border-[8px] border-[var(--nb-black)] -rotate-6 z-0" />

        {/* Floating Mathematical Operators */}
        <div className="absolute top-[10%] left-[20%] text-6xl font-black opacity-30 animate-pulse rotate-12 z-0">+</div>
        <div className="absolute top-[20%] right-[15%] text-7xl font-black opacity-30 animate-bounce z-0">×</div>
        <div className="absolute bottom-[20%] left-[15%] text-8xl font-black opacity-20 animate-pulse delay-700 z-0">-</div>
        <div className="absolute bottom-[30%] right-[10%] text-6xl font-black opacity-30 animate-spin-slow z-0">÷</div>

        <div className="my-16 max-w-4xl mx-auto relative z-10 w-full animate__animated animate__fadeInUp">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-[var(--nb-white)] drop-shadow-[4px_4px_0px_var(--nb-black)]">
              About Project
            </h1>
            <div className="h-2 w-24 bg-[var(--nb-black)] rounded-lg mx-auto" />
          </div>

          {/* Main Card */}
          <div className="bg-[var(--nb-white)] p-8 border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[10px_10px_0px_var(--nb-black)] flex flex-col md:flex-row gap-8 hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex-1">
              <h3 className="font-['Space_Mono'] text-xl font-bold mb-4 uppercase underline underline-offset-4 decoration-[var(--nb-yellow)] decoration-4">CalGenius FX-1</h3>
              <p className="font-semibold text-lg leading-relaxed mb-6">
                Selamat datang di website <strong>CalGenius</strong>. Proyek ini dikembangkan sebagai bagian dari Uji Kompetensi Keahlian (UKK) di <strong>SMKS PGRI Pekanbaru</strong>. 
              </p>
              <p className="font-medium text-slate-700 leading-relaxed mb-6">
                CalGenius lebih dari sekadar alat hitung. Kami merancang pengalaman belajar matematika yang mendalam dan interaktif. Dengan fitur kustomisasi warna, kami ingin membuktikan bahwa teknologi dan kreativitas mampu mengubah persepsi pembelajaran matematika menjadi lebih menyenangkan dan relevan bagi siswa.
              </p>
              <div className="inline-block px-4 py-2 bg-[var(--nb-purple)] text-white border-[3px] border-[var(--nb-black)] rounded-lg shadow-[3px_3px_0px_var(--nb-black)] font-['Space_Mono'] font-black text-sm uppercase tracking-wider hover:bg-[var(--nb-yellow)] hover:text-black transition-colors cursor-pointer">
                Happy Coding! ☕💻
              </div>
            </div>

            <div className="md:w-1/3 flex-shrink-0 relative group">
              <img
                src={orng}
                className="w-full h-auto border-[3px] border-[var(--nb-black)] rounded-lg shadow-[5px_5px_0px_var(--nb-black)] group-hover:rotate-3 group-hover:scale-105 transition-all duration-300"
                alt="About Project"
              />
              <div className="absolute -top-3 -right-3 bg-[var(--nb-yellow)] border-[2px] border-[var(--nb-black)] p-2 rounded-lg text-xs font-bold rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
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
