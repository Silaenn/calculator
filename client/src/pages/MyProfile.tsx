import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
  content: z.string().min(1, "Bio must be at least 1 character.").max(160, "Bio must not be longer than 160 characters."),
});

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { email: "", content: "" } });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("http://localhost:2000/messages", values);
      setIsOpen(false);
      toast.success("Pesan Berhasil Terkirim", { icon: "✅" });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <section className="min-h-screen bg-[var(--nb-purple)] font-['Space_Grotesk'] pb-20 relative overflow-hidden animate__animated animate__fadeIn">
      <div className="h-16 bg-[var(--nb-purple)]" />
      
      {/* Distinct Diagonal Slash Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.2]" 
           style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--nb-black), var(--nb-black) 2px, transparent 2px, transparent 20px)", backgroundSize: "40px 40px" }} />

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[8%] -rotate-6 text-5xl opacity-30 font-mono text-white animate-pulse">E=mc²</div>
        <div className="absolute top-[50%] right-[10%] text-6xl opacity-30 font-mono text-white animate-bounce">Σ</div>
        <div className="absolute bottom-[10%] left-[15%] rotate-12 text-4xl opacity-30 font-mono text-white animate-pulse delay-700">√x</div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-12 relative z-10 animate__animated animate__fadeInUp">
        {/* Profile Header Card */}
        <div className="bg-[#FAF9F6] p-8 border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[10px_10px_0px_var(--nb-black)]">
          <h5 className="font-['Space_Mono'] font-bold tracking-widest uppercase text-sm mb-2 text-[var(--nb-purple)]">A Bit About Me</h5>
          <h2 className="text-4xl font-black mb-6 uppercase">Who Am I?</h2>
          <p className="text-lg leading-relaxed mb-4 text-slate-800">
            Halo, nama saya Deo Keldi Silaen. Saya seorang pengembang yang fokus pada pemrograman, musik, dan olahraga. Saya percaya hidup adalah petualangan untuk terus berkembang. Mari terhubung!
          </p>
          <span className="font-black text-lg">~ Deo Keldi Silaen ~</span>
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Image & Feedback */}
          <div className="bg-[#FAF9F6] p-6 border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[8px_8px_0px_var(--nb-black)] space-y-4">
            <img src={deo} alt="Deo" className="w-full h-64 object-cover border-[3px] border-[var(--nb-black)] rounded-lg" />
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-[var(--nb-pink)] border-[2px] border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] font-black uppercase text-black hover:bg-[var(--nb-yellow)]">Feedback Me</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#FAF9F6] border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[10px_10px_0px_var(--nb-black)]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Kirim Masukan</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormControl><Input placeholder="Email" {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="content" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Saran Anda" {...field} /></FormControl></FormItem>)} />
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
                          <Button type="submit">Kirim</Button>
                        </div>
                      </form>
                    </Form>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[html, css, js, react].map((img, i) => (
              <div key={i} className="bg-[#FAF9F6] p-6 border-[4px] border-[var(--nb-black)] rounded-2xl shadow-[6px_6px_0px_var(--nb-black)] flex flex-col items-center hover:translate-y-[-5px] transition-transform">
                <img src={img} alt="tech" className="w-20 h-20 object-contain mb-4" />
                <p className="font-black uppercase">{['HTML', 'CSS', 'JS', 'REACT'][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
