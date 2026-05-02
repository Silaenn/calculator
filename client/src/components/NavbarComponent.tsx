import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
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

const NavbarComponent: React.FC<NavbarProps> = ({ onScrollChange }) => {
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
    { name: "Home",          href: "/",            current: location.pathname === "/" },
    { name: "About Project", href: "/aboutProjek", current: location.pathname === "/aboutProjek" },
    { name: "My Profile",    href: "/myProfile",   current: location.pathname === "/myProfile" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", content: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/messages`, values);
      form.reset();
      setIsFeedbackOpen(false);
      toast.success("Pesan Berhasil Terkirim", { duration: 4000, position: "bottom-right" });
    } catch (error) {
      console.error(error);
      toast.error("Pesan Gagal Terkirim", { position: "bottom-right" });
    }
  }

  return (
    <div
      className={`fixed left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? "top-4 px-4" : "top-0 p-0"}
      `}
    >
      <Disclosure
        as="nav"
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          bg-[var(--nb-bg)] border-[var(--nb-black)]
          flex flex-col items-center justify-center relative
          ${isScrolled
            /* Scrolled: floating pill — shadow pakai yellow (brand) */
            ? "w-full md:w-3/5 rounded-2xl md:rounded-full border-[3px] shadow-[4px_4px_0px_var(--nb-yellow)] h-auto min-h-[56px]"
            /* Normal: full-width flat bar */
            : "w-full rounded-none border-b-[3px] shadow-none h-auto min-h-[64px]"
          }
        `}
      >
        {({ open }) => (
          <>
            <div className="w-full max-w-7xl px-4 h-14 md:h-16 flex items-center justify-between">

              {/* LEFT: Logo — yellow bg, black border */}
              <div
                className="flex items-center gap-2 cursor-pointer shrink-0"
                onClick={() => navigate("/")}
              >
                <div className="bg-[var(--nb-yellow)] p-1 border-2 border-[var(--nb-black)] rounded-lg shadow-[2px_2px_0px_var(--nb-black)]">
                  <img className="h-6 w-6" src={calculator} alt="Logo" />
                </div>
                <span className="hidden sm:block font-black text-lg tracking-tight uppercase">
                  CalGenius
                </span>
              </div>

              {/* RIGHT: Desktop Menu & Actions */}
              <div className="hidden md:flex flex-1 justify-end items-center gap-2">
                <div className="flex items-center space-x-2">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={classNames(
                        item.current
                          /* Active: black bg, white text — jelas & bold */
                          ? "bg-[var(--nb-black)] text-[var(--nb-white)]"
                          /* Hover: yellow (primary brand) */
                          : "hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)]",
                        "rounded-lg px-4 py-1.5 text-xs font-black border-2 border-transparent transition-all active:scale-95"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}

                  {/* FEEDBACK action directly in menu */}
                  <AlertDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                    <AlertDialogTrigger asChild>
                      <button className="rounded-lg px-4 py-1.5 text-xs font-black border-2 border-transparent transition-all hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] active:scale-95">
                        Feedback
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[var(--nb-bg)] border-[4px] border-[var(--nb-black)] shadow-[10px_10px_0px_var(--nb-black)] rounded-2xl max-w-[90vw] md:max-w-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-black text-2xl uppercase flex items-center">
                          <FontAwesomeIcon icon={faMessage} className="mr-3" />
                          Feedback
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
                                  <Textarea placeholder="How can we improve?" {...field} rows={4} className="border-2 border-[var(--nb-black)] rounded-xl p-4 font-bold" />
                                </FormControl></FormItem>
                              )} />
                              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                <AlertDialogCancel asChild>
                                  <Button variant="outline" className="border-2 border-[var(--nb-black)] font-black uppercase rounded-xl">
                                    Cancel
                                  </Button>
                                </AlertDialogCancel>
                                {/* Submit — black bg, teal hover */}
                                <Button
                                  type="submit"
                                  className="bg-[var(--nb-black)] text-[var(--nb-white)] border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] font-black uppercase rounded-xl px-8 hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] transition-all"
                                >
                                  Send it!
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* MOBILE ACTIONS */}
              <div className="flex md:hidden items-center gap-2">
                <Disclosure.Button className="p-1.5 bg-[var(--nb-yellow)] border-2 border-[var(--nb-black)] rounded-lg shadow-[2px_2px_0px_var(--nb-black)] active:shadow-none transition-all">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile Menu Panel */}
            <Disclosure.Panel className="md:hidden w-full px-4 pb-4 animate__animated animate__fadeIn">
              <div className="flex flex-col gap-2 border-t-2 border-[var(--nb-black)] pt-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={classNames(
                      item.current
                        ? "bg-[var(--nb-black)] text-[var(--nb-white)] shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-[var(--nb-white)] hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)]",
                      "block w-full text-left px-5 py-4 rounded-xl text-sm font-black border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] transition-all active:scale-95"
                    )}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Mobile Feedback */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="block w-full text-left px-5 py-4 rounded-xl text-sm font-black border-2 border-[var(--nb-black)] bg-[var(--nb-white)] hover:bg-[var(--nb-teal)] shadow-[3px_3px_0px_var(--nb-black)] transition-all active:scale-95">
                      Feedback
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[var(--nb-bg)] border-[4px] border-[var(--nb-black)] shadow-[10px_10px_0px_var(--nb-black)] rounded-2xl max-w-[90vw]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-black text-2xl uppercase flex items-center">
                        <FontAwesomeIcon icon={faMessage} className="mr-3" />
                        Feedback
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
                                <Textarea placeholder="How can we improve?" {...field} rows={4} className="border-2 border-[var(--nb-black)] rounded-xl p-4 font-bold" />
                              </FormControl></FormItem>
                            )} />
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                              <AlertDialogCancel asChild>
                                <Button variant="outline" className="border-2 border-[var(--nb-black)] font-black uppercase rounded-xl">
                                  Cancel
                                </Button>
                              </AlertDialogCancel>
                              <Button
                                type="submit"
                                className="bg-[var(--nb-black)] text-[var(--nb-white)] border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] font-black uppercase rounded-xl px-8 hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] transition-all"
                              >
                                Send it!
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default NavbarComponent;