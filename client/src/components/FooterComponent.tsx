import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import email from "@/assets/images/email.png";
import wa from "@/assets/images/wa.png";
import fb from "@/assets/images/fb.png";
import git from "@/assets/images/git.png";
import ig from "@/assets/images/ig.png";
import tele from "@/assets/images/tele.png";
import MapsApi from "./MapsApi";

const FooterComponent = () => {
  const WAClick = () => {
    window.open("https://api.whatsapp.com/send?phone=628989311672", "_blank");
  };

  useEffect(() => {
    MapsApi();
  }, []);

  const Email = () => {
    // Logika atau tindakan yang ingin Anda lakukan saat tautan diklik
    // Contoh: Membuka formulir pengiriman email
    window.location.href = "mailto:deokeldisilaen@gmail.com";
  };

  return (
    <div className="footer py-5">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold">CalGenius</h3>
            <p className="desc">
              Selamat datang di kalkulator web sederhana namun penuh gaya!
              Nikmati kemudahan menghitung dengan desain yang ramah pengguna,
              dan pilih warna favoritmu untuk membuat pengalaman perhitunganmu
              semakin personal!
            </p>
            <div className="no mb-1 mt-4">
              <Link className="text-decoration-none" onClick={WAClick}>
                <img src={wa} width={15} alt="" />
                <p className="m-0">+62 898-9311-672</p>
              </Link>
            </div>
            <div className="mail">
              <Link className="text-decoration-none" onClick={Email}>
                <img src={email} width={15} className="mr-1" alt="" />
                <p className="m-0">deokeldisilaen.@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            <Link to="/">Home</Link>
            <Link to="/aboutProjek">About Projek</Link>
            <Link to="/myProfile">My Profile</Link>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Subscribe untuk info Menarik</h5>
            <div className="subscribes">
              <input type="text" placeholder="Subscribe" />
              <button className="btn btn-danger rounded-end rounded-0">
                Subscribe
              </button>
            </div>
            <div className="sosial mt-3">
              <a
                href="https://www.facebook.com/deo.silaen?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fb} width={20} alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/deoosilaen?igsh=MXE0Yjdob2ozbm1hYw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ig} width={20} alt="Facebook" />
              </a>
              <a
                href="https://github.com/Silaenn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={git} width={20} alt="Facebook" />
              </a>
              <a
                href="https://t.me/deoosilaen22"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={tele} width={20} alt="Facebook" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.356787876166!2d101.47549098493971!3d0.4249068496446592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a858d8579427%3A0xfd261ac7e0a67939!2sPembiayaan%20MULTIGuna%20IG%20%40irmanroberto!5e0!3m2!1sid!2sid!4v1706428718317!5m2!1sid!2sid"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0  px-3">
              &copy; Copyright {new Date().getFullYear()} by
              <span className="fw-bold">Ngoding Mastery</span>, All Right
              Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
