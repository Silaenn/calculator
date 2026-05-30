import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import calculator from "../assets/images/calculator.png";
import FeedbackDialog from "@/components/FeedbackDialog";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  onScrollChange?: (scrolled: boolean) => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ onScrollChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div
      className={`fixed left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? "top-4 px-4" : "top-0 p-0"}
      `}
    >
      <Disclosure
        as="nav"
        className={({ open }) => classNames(
          "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "bg-[var(--nb-bg)] border-[var(--nb-black)]",
          "flex flex-col items-center justify-center relative overflow-hidden",
          isScrolled
            ? "w-full md:w-[95%] lg:w-4/5 border-[3px] shadow-[4px_4px_0px_var(--nb-yellow)]"
            : "w-full rounded-none border-b-[3px] shadow-none",
          isScrolled
            ? (open ? "rounded-2xl" : "rounded-2xl md:rounded-full")
            : "rounded-none"
        )}
      >
        {({ open, close }) => (
          <>
            {/* Backdrop Overlay - Tetap fixed untuk menutup seluruh layar */}
            {open && (
              <div
                className="fixed inset-0 bg-black/50 z-[-1] md:hidden backdrop-blur-sm transition-opacity duration-500"
                onClick={() => close()}
              />
            )}
            
            <div className="w-full max-w-7xl px-4 h-14 md:h-16 flex items-center justify-between shrink-0">
              {/* LEFT: Logo — yellow bg, black border */}
              <div
                className="flex items-center gap-2 cursor-pointer shrink-0"
                onClick={() => {
                  navigate("/");
                  close();
                }}
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
                          ? "bg-[var(--nb-black)] text-[var(--nb-white)]"
                          : "hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)]",
                        "rounded-lg px-4 py-1.5 text-xs font-black border-2 border-transparent transition-all active:scale-95"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}

                  <FeedbackDialog
                    triggerLabel="Feedback"
                    triggerClassName="rounded-lg px-4 py-1.5 text-xs font-black border-2 border-transparent transition-all hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] active:scale-95"
                  />
                </div>
              </div>

              {/* MOBILE ACTIONS */}
              <div className="flex md:hidden items-center gap-2">
                <Disclosure.Button className="p-1.5 bg-[var(--nb-yellow)] border-2 border-[var(--nb-black)] rounded-lg shadow-[2px_2px_0px_var(--nb-black)] active:shadow-none transition-all">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile Menu Panel Expansion Wrapper */}
            <div 
              className={classNames(
                "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full md:hidden",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <Disclosure.Panel static className="overflow-hidden w-full border-t-2 border-[var(--nb-black)] bg-[var(--nb-bg)]">
                <div className="flex flex-col gap-2 p-4 w-full">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.href);
                        close();
                      }}
                      className={classNames(
                        item.current
                          ? "bg-[var(--nb-black)] text-[var(--nb-white)] shadow-none translate-x-[2px] translate-y-[2px]"
                          : "bg-[var(--nb-white)] hover:bg-[var(--nb-yellow)] hover:text-[var(--nb-black)]",
                        "w-full text-left px-5 py-4 rounded-xl text-sm font-black border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] transition-all active:scale-95"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}

                  <FeedbackDialog
                    triggerLabel="Feedback"
                    triggerClassName="w-full text-left px-5 py-4 rounded-xl text-sm font-black border-2 border-[var(--nb-black)] bg-[var(--nb-white)] hover:bg-[var(--nb-teal)] shadow-[3px_3px_0px_var(--nb-black)] transition-all active:scale-95"
                  />
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default NavbarComponent;
