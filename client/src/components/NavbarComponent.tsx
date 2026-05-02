import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import calculator from "../assets/images/calculator.png";
import profile from "../assets/images/profile.gif";
import feedbackIcon from "../assets/images/mes.jpg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  content: z
    .string()
    .min(1, { message: "Pesan tidak boleh kosong." })
    .max(160, { message: "Pesan tidak boleh lebih dari 160 karakter." }),
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  onScrollChange?: (scrolled: boolean) => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({onScrollChange}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      onScrollChange?.(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollChange]);

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "About Project",
      href: "/aboutProjek",
      current: location.pathname === "/aboutProjek",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/messages`,
        values
      );

      form.reset();
      setIsFeedbackOpen(false);

      toast.success("Pesan Berhasil Terkirim", {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Pesan Gagal Terkirim", {
        position: "bottom-right",
      });
    }
  }

  return (
    <div
      className={`fixed left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? "top-4 p-0" : "top-0 p-0"}
      `}
    >
      <Disclosure
        as="nav"
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          bg-[#FFF5E1] border-[#1A1A1A]
          flex items-center justify-center
          ${isScrolled
            ? "w-3/5 rounded-full border-[3px] shadow-[4px_4px_0px_#000] h-14"
            : "w-full rounded-none border-b-[3px] shadow-none h-16"
          }
        `}
      >
        {({ open }) => (
          <>
            <div className="w-full max-w-7xl px-4 h-full flex items-center justify-between">
              
              {/* MOBILE BUTTON */}
              <div className="flex sm:hidden">
                <Disclosure.Button className="p-2 rounded-lg hover:bg-[#FFD93D] border-2 border-transparent hover:border-black transition-all">
                  <Bars3Icon className="h-6 w-6" />
                </Disclosure.Button>
              </div>

              {/* LEFT */}
              <div className="flex items-center flex-1 justify-center sm:justify-start gap-4">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <div className="bg-[#FFD93D] p-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]">
                    <img className="h-6" src={calculator} />
                  </div>

                  {!isScrolled && (
                    <span className="hidden md:block font-bold text-lg">
                      CalGenius ✦
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex ml-6">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          item.current
                            ? "bg-black text-white"
                            : "hover:bg-[#FFD93D]",
                          "rounded-lg px-3 py-1 text-xs font-bold border-2 border-transparent transition-colors"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                
                {/* FEEDBACK */}
                <Popover open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                  <PopoverTrigger asChild>
                    <button className="p-0.5 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_#000]">
                      <img src={feedbackIcon} className="h-8 w-8 rounded-full" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-56 p-2 bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000] rounded-xl">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="w-full p-2 hover:bg-[#6BCB77] rounded-lg font-bold">
                          Berikan Feedback
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-[#FFF5E1] border-[3px] border-black shadow-[8px_8px_0px_#000] rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Kirim Masukan 📝
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                              >
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          placeholder="Email"
                                          {...field}
                                          className="border-2 border-black"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="content"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Pesan..."
                                          {...field}
                                          rows={4}
                                          className="border-2 border-black"
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <div className="flex justify-end gap-3">
                                  <AlertDialogCancel asChild>
                                    <Button variant="outline">
                                      Batal
                                    </Button>
                                  </AlertDialogCancel>

                                  <Button type="submit">
                                    Kirim
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>

                {/* PROFILE */}
                <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <PopoverTrigger asChild>
                    <button className="p-0.5 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_#000]">
                      <img className="h-9 w-9 rounded-full" src={profile} />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-32 p-2 bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000] rounded-xl">
                    <button
                      onClick={() => {
                        navigate("/myProfile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full p-2 hover:bg-[#845EC2] hover:text-white rounded-lg font-bold"
                    >
                      My Profile
                    </button>
                  </PopoverContent>
                </Popover>

              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default NavbarComponent;