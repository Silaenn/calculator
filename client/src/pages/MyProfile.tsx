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

const MyProfile = () => {
  return (
    <section className="vh-100 h-auto" style={{ backgroundColor: "#f4f5f7" }}>
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

        <p className="mt-1 by">Image by Freepik</p>
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
        <div className="g2 bg-black">
          <div className="g2-one bg-slate-200">
            <div className="g2-two">
              <div className="repet bg-slate-500">
                <div className="html">
                  <div className="logo">
                    <div className="l">
                      <img
                        src="https://assets.nicepagecdn.com/d2cc3eaa/3064690/images/2d4dee0c.png"
                        alt=""
                      />
                      <h4 className="tulis">HTML</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          info@example.com
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          123 456 789
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          info@example.com
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          123 456 789
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
    </section>
  );
};

export default MyProfile;
