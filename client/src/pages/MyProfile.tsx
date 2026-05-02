import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { html, css, js, react, deo } from "@/assets/images/index.ts";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  content: z
    .string()
    .min(1, "Bio must be at least 1 character.")
    .max(160, "Bio must not be longer than 160 characters."),
});

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", content: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/messages`, values);
      setIsOpen(false);
      toast.success("Pesan Berhasil Terkirim", { icon: "✅" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mengirim pesan.");
    }
  }

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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[8%] -rotate-6 text-4xl sm:text-5xl opacity-50 font-mono text-white animate-pulse">
          E=mc²
        </div>
        <div className="absolute top-[50%] right-[10%] text-5xl sm:text-6xl opacity-50 font-mono text-white animate-bounce">
          Σ
        </div>
        <div className="absolute bottom-[10%] left-[15%] rotate-12 text-3xl sm:text-4xl opacity-50 font-mono text-white animate-pulse delay-700">
          √x
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Image & Feedback button */}
          <div className="bg-[#FAF9F6] p-6 border-[4px] border-[var(--nb-black)] rounded-3xl shadow-[8px_8px_0px_var(--nb-black)] space-y-6">
            <div className="relative group">
              <img
                src={deo}
                alt="Deo"
                className="w-full h-72 sm:h-80 object-cover border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[4px_4px_0px_var(--nb-black)] group-hover:rotate-2 transition-all duration-300"
              />
            </div>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                {/* Feedback button — red (action/energetic), hover ke yellow */}
                <Button className="w-full h-14 bg-[var(--nb-red)] text-[var(--nb-white)] border-[3px] border-[var(--nb-black)] shadow-[4px_4px_0px_var(--nb-black)] font-black uppercase hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  Feedback Me
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#FAF9F6] border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[10px_10px_0px_var(--nb-black)] max-w-[90vw] md:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-black text-2xl uppercase text-[var(--nb-black)]">
                    Kirim Masukan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="pt-4 text-left">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormControl>
                            <Input placeholder="Email" {...field} className="border-2 border-[var(--nb-black)] rounded-xl p-6 font-bold" />
                          </FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="content" render={({ field }) => (
                          <FormItem><FormControl>
                            <Textarea placeholder="Saran Anda" {...field} className="border-2 border-[var(--nb-black)] rounded-xl p-4 font-bold" />
                          </FormControl></FormItem>
                        )} />
                        <div className="flex flex-col sm:flex-row gap-2 justify-end pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="border-2 border-[var(--nb-black)] font-black uppercase rounded-xl"
                          >
                            Batal
                          </Button>
                          {/* Submit — black bg, teal hover (confirm) */}
                          <Button
                            type="submit"
                            className="bg-[var(--nb-black)] text-[var(--nb-white)] border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] font-black uppercase rounded-xl px-8 hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] transition-all"
                          >
                            Kirim
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Tech Stack Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6">
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