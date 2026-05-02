import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faFacebook, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faHouse, faFileLines, faUser } from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="d-flex justify-content-between">

          {/* ── Col 1: Brand & Kontak ── */}
          <Col lg="4" className="mb-5 mb-lg-0">
            <div className="footer-brand">CalGenius ✦</div>
            <p className="footer-desc">
              Kalkulator web serba bisa dengan tampilan yang bisa kamu kustomisasi sendiri.
              Hitung, warnai, dan ekspresikan gaya kamu!
            </p>
            <div className="footer-contact">
              <a href="https://api.whatsapp.com/send?phone=628989311672" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                +62 898-9311-672
              </a>
              <br />
              <a href="mailto:deokeldisilaen@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                deokeldisilaen@gmail.com
              </a>
            </div>
          </Col>

          {/* ── Col 2: Menu ── */}
          <Col lg="2" className="mb-5 mb-lg-0">
            <div className="footer-menu-title">Menu</div>
            <Link to="/" className="footer-menu-link"><FontAwesomeIcon icon={faHouse} className="mr-2" /> Home</Link>
            <Link to="/aboutProjek" className="footer-menu-link"><FontAwesomeIcon icon={faFileLines} className="mr-2" /> About Projek</Link>
            <Link to="/myProfile" className="footer-menu-link"><FontAwesomeIcon icon={faUser} className="mr-2" /> My Profile</Link>
          </Col>

          {/* ── Col 3: Sosial Media ── */}
          <Col lg="4">
            <div className="footer-menu-title">SMKS PGRI Pekanbaru</div>
            <a
              href="https://www.instagram.com/smk_pgri_pekanbaru?igsh=MXFsZGN3bTVrZTdqbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-2" />
              @Smk_pgri_pekanbaru
            </a>

            <div className="footer-menu-title mt-4">My Media Sosial</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <a href="https://www.facebook.com/deo.silaen?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FontAwesomeIcon icon={faFacebook} className="mr-2" /> @Deo_Silaen
              </a>
              <a href="https://www.instagram.com/deoosilaen?igsh=MXE0Yjdob2ozbm1hYw==" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FontAwesomeIcon icon={faInstagram} className="mr-2" /> @deoosilaen
              </a>
              <a href="https://github.com/Silaenn" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FontAwesomeIcon icon={faGithub} className="mr-2" /> Deo_Silaen
              </a>
              <a href="https://t.me/deoosilaen22" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FontAwesomeIcon icon={faTelegram} className="mr-2" /> @deoosilaen22
              </a>
            </div>
          </Col>
        </Row>

        {/* ── Maps ── */}
        <Row className="mt-5">
          <Col>
            <div className="footer-menu-title">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              My Address
            </div>
            <div className="footer-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.356787876166!2d101.47549098493971!3d0.4249068496446592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a858d8579427%3A0xfd261ac7e0a67939!2sPembiayaan%20MULTIGuna%20IG%20%40irmanroberto!5e0!3m2!1sid!2sid!4v1706428718317!5m2!1sid!2sid"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maps"
              />
            </div>
          </Col>
        </Row>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} by{" "}
            <strong>DeoSilaen</strong> — All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;