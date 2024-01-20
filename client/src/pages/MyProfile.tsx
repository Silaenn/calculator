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

const MyProfile = () => {
  return (
    <section className="h-auto w-auto" style={{ backgroundColor: "#f4f5f7" }}>
      <div className=" flex justify-center flex-col items-center">
        <h5 className="mt-4 title">A BIT ABOUT ME</h5>

        <p className="who">Who Am I?</p>

        <p className="text-center me">
          Hi I'm Jack Smith. Click here to add your own text and edit me. ​Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <p className="mt-1 mb-5 mby">Image by Freepik</p>
      </div>

      <div className="layout-row">
        <div className="g1">
          <div className="g1-one">
            <div className="g1-img"></div>
            <div className="g1-ket">
              I am happy to know you&nbsp;that 300+ projects done sucessfully!
            </div>
            <div className="g1-feed">feedback for me</div>
          </div>
        </div>

        <div className="g2">
          <div className="g2-one">
            <div className="bidangH">
              <div
                className="flex flex-col
              "
              >
                <img src={html} alt="" className="w-48" />
                <p className="justify-center flex mt-3">HTML</p>
              </div>
            </div>
            <div className="bidangC">
              <div
                className="flex flex-col
              "
              >
                <img src={css} alt="" className="w-52" />
                <p className="justify-center flex mt-3">CSS</p>
              </div>
            </div>
            <div className="bidangJ">
              <div
                className="flex flex-col
              "
              >
                <img src={js} alt="" className="w-48" />
                <p className="justify-center flex mt-3">JAVASCRIPT</p>
              </div>
            </div>
            <div className="bidangR">
              {" "}
              <div
                className="flex flex-col
              "
              >
                <img src={react} alt="" className="w-52" />
                <p className="justify-center flex">HTML</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
