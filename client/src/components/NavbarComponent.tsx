import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import calculator from "../assets/images/calculator.png";
import feedback from "../assets/images/mes.jpg";
// import { Popover, Transition } from "@headlessui/react";
import profile from "../assets/images/profile.gif";
// import Optionwarna from "./Optionwarna";
import like from "@/assets/images/feedback.gif";
import user from "@/assets/images/user.gif";
// import { ToastContainer, toast } from "react-toastify";
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
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React from "react";
import toast from "react-hot-toast";

("use client");

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "./ui/toast";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  content: z
    .string()
    .min(1, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About Project", href: "/aboutProjek", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavbarComponent = () => {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    navigate("/myProfile");
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("masuk");

      const response = await axios.post(
        "http://localhost:2000/messages",
        values
      );

      const newMessage = response.data.data;
      console.log(newMessage);

      setIsOpen(false);

      toast.success("Pesan Berhasil Terkirim", {
        duration: 4000,
        position: "bottom-right",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "✅",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Pesan Tidak Berhasil Terkirim", {
        duration: 4000,
        position: "bottom-right",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "❌",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  }

  return (
    <Disclosure
      as="nav"
      style={{
        backgroundColor: "#1F3843",
      }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto py-2 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto cursor-pointer"
                    src={calculator}
                    alt="Your Company"
                    onClick={() => navigate("/")}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? `bg-gray-900 text-white no-underline`
                            : "text-gray-300 hover:bg-gray-700 hover:text-white no-underline",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mt-2">
                <Menu as="div" className="relative mr-0 mb-1">
                  <Popover>
                    <PopoverTrigger onClick={() => handleOpen()}>
                      <div>
                        <Menu.Button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <img
                            src={feedback}
                            className="h-10 w-10 bg-transparent rounded-3xl feedback"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                    </PopoverTrigger>
                    {isOpen && (
                      <PopoverContent className="w-auto h-16 flex items-center justify-center mr-32 p-3 mt-1">
                        <AlertDialog>
                          <AlertDialogTrigger
                            className="flex items-center h-auto"
                            style={{
                              marginLeft: "-5px",
                            }}
                          >
                            <div className="flex items-center ">
                              <img
                                src={like}
                                width={40}
                                className="flex mb-2"
                                alt=""
                              />
                              <p
                                className="ml-1 mt-3 leading-5"
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                Berikan <br /> Feedback
                              </p>
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Kirimkan Masukan / Saran Anda kepada Kami
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <Form {...form}>
                                  <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                  >
                                    <FormField
                                      control={form.control}
                                      name="email"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              placeholder="Masukan Email Anda"
                                              {...field}
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
                                              placeholder="Masukkan Saran Anda"
                                              {...field}
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />

                                    <div className="flex ml-auto">
                                      <Button
                                        variant="outline"
                                        className="ml-auto"
                                        onClick={() => handleClickClose()}
                                      >
                                        Batal
                                      </Button>

                                      <Button
                                        onClick={() => onSubmit}
                                        type="submit"
                                        className="flex ml-2"
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
                      </PopoverContent>
                    )}
                  </Popover>
                </Menu>
                {/* <Button onClick={notify}>Hai</Button>
                <ToastContainer /> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Popover>
                      <PopoverTrigger onClick={() => handleOpen()}>
                        <Menu.Button
                          type="button"
                          className="relative flex rounded-full border-2 border-gray-500 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={profile}
                            alt=""
                          />
                        </Menu.Button>
                      </PopoverTrigger>
                      {isOpen && (
                        <PopoverContent
                          onClick={() => handleClick()}
                          className="w-auto flex items-center pt-0 pb-0 h-auto mt-2"
                        >
                          <div
                            className="flex items-center mt-auto mb-auto"
                            // onClick={() => {
                            //   navigate("/myProfile");
                            // }}
                            style={{
                              marginTop: "-10px",
                              marginLeft: "-15px",
                              marginRight: "-10px",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={user}
                              className="ml-auto mr-auto"
                              alt=""
                              width={40}
                            />
                            <p
                              style={{
                                fontSize: "15px",
                                marginTop: "15px",
                              }}
                            >
                              My Profile
                            </p>
                          </div>
                        </PopoverContent>
                      )}
                    </Popover>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarComponent;
