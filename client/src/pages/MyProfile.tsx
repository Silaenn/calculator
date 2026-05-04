import { html, css, js, react, deo } from "@/assets/images/index.ts";
import FeedbackDialog from "@/components/FeedbackDialog";

const MyProfile = () => {
  return (
    <section
      className="min-h-screen font-['Space_Grotesk'] pb-20 relative overflow-hidden animate__animated animate__fadeIn"
      style={{ backgroundColor: "var(--nb-violet)" }}
    >
      {/* Spacer — violet (bg halaman ini) */}
      <div className="h-16" style={{ backgroundColor: "var(--nb-violet)" }} />

      {/* ══════════════════════════════
          My Profile — Violet Background
          Violet = special/identity.
          Halaman tentang diri sendiri
          layak dapat warna "istimewa".
      ══════════════════════════════ */}

      {/* Diagonal stripe pattern — lebih subtle di violet */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--nb-black), var(--nb-black) 2px, transparent 2px, transparent 20px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating math symbols — white, lebih readable di violet */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* Kiri atas - diluar container */}
        <div className="absolute top-[10%] left-[2%] sm:left-[5%] -rotate-6 text-3xl sm:text-5xl opacity-60 font-mono text-white animate-pulse">
          E=mc²
        </div>
        {/* Kanan tengah - diluar container */}
        <div className="absolute top-[40%] right-[2%] sm:right-[5%] text-4xl sm:text-6xl opacity-60 font-mono text-white animate-bounce">
          Σ
        </div>
        {/* Kiri bawah - diluar container */}
        <div className="absolute bottom-[20%] left-[2%] sm:left-[5%] rotate-12 text-2xl sm:text-4xl opacity-60 font-mono text-white animate-pulse delay-700">
          √x
        </div>
        {/* Kanan bawah */}
        <div className="absolute bottom-[10%] right-[3%] text-4xl opacity-40 font-mono text-white -rotate-12">
          ∫
        </div>
      </div>

      {/* Decorative blobs — yellow & teal untuk contrast */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--nb-yellow)] border-[6px] border-[var(--nb-black)] rounded-full opacity-30 z-0" />
      <div className="absolute bottom-10 -left-20 w-64 h-64 bg-[var(--nb-teal)] border-[6px] border-[var(--nb-black)] rounded-full opacity-20 z-0" />

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-12 relative z-10 animate__animated animate__fadeInUp">

        {/* ── Profile Header Card ── */}
        <div className="bg-[#FAF9F6] p-6 sm:p-10 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[10px_10px_0px_var(--nb-black)]">
          {/* Label — violet text (warna halaman) */}
          <h5 className="font-['Space_Mono'] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 text-[var(--nb-violet)]">
            A Bit About Me
          </h5>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 uppercase tracking-tighter text-[var(--nb-black)]">
            Who Am I?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-slate-800 font-medium">
            Halo, nama saya <strong>Deo Keldi Silaen</strong>. Saya seorang pengembang yang fokus pada pemrograman, musik, dan olahraga. Saya percaya hidup adalah petualangan untuk terus berkembang. Mari terhubung!
          </p>
          {/* Name underline — red (energetic accent) */}
          <span className="font-black text-lg border-b-4 border-[var(--nb-red)]">
            ~ Deo Keldi Silaen ~
          </span>
        </div>

        {/* ── Content Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Profile Image & Feedback button */}
          <div className="bg-[#FAF9F6] p-6 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[8px_8px_0px_var(--nb-black)] space-y-6 flex flex-col">
            <div className="relative group flex-1">
              <img
                src={deo}
                alt="Deo"
                className="w-full h-auto aspect-[4/5] object-cover border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[4px_4px_0px_var(--nb-black)] group-hover:rotate-2 transition-all duration-300"
              />
            </div>

            <FeedbackDialog
              triggerLabel="Feedback Me"
              triggerClassName="w-full h-14 bg-[var(--nb-red)] text-[var(--nb-white)] border-[3px] border-[var(--nb-black)] shadow-[4px_4px_0px_var(--nb-black)] font-black uppercase hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              title="Kirim Masukan"
              submitLabel="Kirim"
              submittingLabel="Mengirim..."
            />
          </div>

          {/* Tech Stack Cards */}
          <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
            {[html, css, js, react].map((img, i) => (
              <div
                key={i}
                className="bg-[#FAF9F6] p-6 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[6px_6px_0px_var(--nb-black)] flex flex-col items-center justify-center hover:translate-y-[-8px] hover:rotate-2 transition-all duration-300"
              >
                <img src={img} alt="tech" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4" />
                {/* Tech label — yellow bg (brand pop) */}
                <p className="font-black uppercase text-sm sm:text-base tracking-widest bg-[var(--nb-yellow)] border-2 border-[var(--nb-black)] rounded-lg px-3 py-1 shadow-[2px_2px_0px_var(--nb-black)]">
                  {["HTML", "CSS", "JS", "REACT"][i]}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MyProfile;