import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import html from "@/assets/images/html.svg";
import css from "@/assets/images/css.png";
import js from "@/assets/images/js.png";
import react from "@/assets/images/react.png";
import deo from "@/assets/images/deo.jpg";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
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

      toast("Pesan Berhasil Terkirim", {
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
      console.log("keluar");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <section className=" h-auto w-auto" style={{ backgroundColor: "" }}>
      <div className=" flex justify-center flex-col items-center animate__animated animate__fadeInDown">
        <h5 className="mt-4 title">A BIT ABOUT ME</h5>

        <p className="who">Who Am I?</p>

        <p className="text-justify me">
          Halo, nama saya adalah Deo Keldi Silaen. Saya adalah seorang yang
          senang mengeksplorasi berbagai bidang kehidupan. Saat ini, saya fokus
          pada pembelajaran mengenai coding, di sini saya mengejar passion saya
          dalam pemograman. Selain itu, saya memiliki minat yang luas dalam
          bidang olahraga dan musik, di mana saya sering menghabiskan waktu
          luang saya untuk melakukan nya. Saya percaya bahwa kehidupan adalah
          petualangan yang tak terbatas, dan saya selalu mencari peluang untuk
          belajar dan berkembang. Melalui platform ini, saya berharap dapat
          berbagi pengalaman, pengetahuan, dan inspirasi dengan Anda semua.
          Terima kasih telah mengunjungi halaman saya!
        </p>

        <p className="mt-1 mb-5 mby">~ Deo Keldi Silaen ~</p>
      </div>

      <div className="layout-row flex-wrap">
        <div
          className="g1 animate__animated animate__fadeInLeft"
          style={{
            borderRadius: "10px",
          }}
        >
          <div className="g1-one">
            <div className="g1-img">
              <img
                src={deo}
                alt="About Me"
                style={{
                  width: "100%",
                  height: "330px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="g1-ket">
              The technologies I use in this web development are. . .
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild onClick={() => handleOpen()}>
                <div className="g1-feed mt-2">feedback for me</div>
              </AlertDialogTrigger>
              {isOpen && (
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
              )}
            </AlertDialog>
          </div>
        </div>

        <div className="g2 animate__animated animate__fadeInUp">
          <div className="g2-one">
            <div
              className="bidangH"
              style={{
                borderBottom: "20px solid #E34F26",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="flex flex-col
              "
              >
                <img
                  src={html}
                  alt=""
                  className="w-36 animate__animated animate__rotateInUpLeft cod"
                />
                <p className="justify-center flex mt-3">HTML</p>
              </div>
            </div>
            <div
              className="bidangC"
              style={{
                borderBottom: "20px solid #214CE5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="flex flex-col
              "
              >
                <img
                  src={css}
                  alt=""
                  className="w-36 animate__animated animate__rotateInUpLeft cod"
                />
                <p className="justify-center flex mt-3">CSS</p>
              </div>
            </div>
            <div
              className="bidangJ"
              style={{
                borderBottom: "20px solid #D6BA32",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="flex flex-col
              "
              >
                <img
                  src={js}
                  alt=""
                  className="w-36 animate__animated animate__rotateInUpLeft cod"
                />
                <p className="justify-center flex mt-3">JAVASCRIPT</p>
              </div>
            </div>
            <div
              className="bidangR"
              style={{
                borderBottom: "20px solid #C3F1FD",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {" "}
              <div
                className="flex flex-col
              "
              >
                <img
                  src={react}
                  alt=""
                  className="w-36 mb-2 animate__animated animate__rotateInUpLeft cod"
                />
                <p className="justify-center flex mt-3">REACT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
