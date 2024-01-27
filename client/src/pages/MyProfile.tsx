import React from "react";
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
import html from "@/assets/images/html.svg";
import css from "@/assets/images/css.png";
import js from "@/assets/images/js.png";
import react from "@/assets/images/react.png";
import deo from "@/assets/images/deo.jpg";

const MyProfile = () => {
  return (
    <section className=" h-auto w-auto" style={{ backgroundColor: "" }}>
      <div className=" flex justify-center flex-col items-center animate__animated animate__fadeInDown">
        <h5 className="mt-4 title">A BIT ABOUT ME</h5>

        <p className="who">Who Am I?</p>

        <p className="text-center me">
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

        <p className="mt-1 mb-5 mby">Image by Freepik</p>
      </div>

      <div className="layout-row">
        <div
          className="g1 animate__animated animate__fadeInLeft"
          style={{
            borderRadius: "10px",
          }}
        >
          <div className="g1-one">
            <div
              className="g1-img"
              style={{
                width: "255px",
                height: "255px",
                margin: "0 auto",
                borderRadius: "50%",
                backgroundPosition: "50% 50%",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
            <div className="g1-feed">feedback for me</div>
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
                  className="w-36 animate__animated animate__rotateInUpLeft"
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
                  className="w-36 animate__animated animate__rotateInUpLeft"
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
                  className="w-36 animate__animated animate__rotateInUpLeft"
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
                  className="w-36 mb-2 animate__animated animate__rotateInUpLeft"
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
