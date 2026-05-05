import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp, faInstagram, faFacebook, faGithub, faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope, faLocationDot, faHouse
} from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t-[4px] border-[#FFD93D] py-12 px-4 md:px-6 relative overflow-hidden">
      {/* Footer Decoration */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-[repeating-linear-gradient(90deg,var(--nb-yellow),var(--nb-yellow)_40px,var(--nb-red)_40px,var(--nb-red)_80px,var(--nb-teal)_80px,var(--nb-teal)_120px,var(--nb-violet)_120px,var(--nb-violet)_160px)] opacity-85" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-12">
        {/* Brand & Socials */}
        <div className="w-full md:w-1/3">
          <div className="font-['Space_Mono'] text-2xl md:text-3xl font-bold text-[#FFD93D] mb-4 border-b-2 border-[#FFD93D] pb-2 inline-block">
            CalGenius ✦
          </div>
          <p className="text-sm leading-7 text-gray-400 mb-6 max-w-sm">
            Kalkulator interaktif dengan desain Neobrutalism yang modern dan fungsional. 
            Created by Deo Silaen.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: faGithub, name: "Github" },
              { icon: faInstagram, name: "Instagram" },
              { icon: faWhatsapp, name: "WhatsApp" },
              { icon: faTelegram, name: "Telegram" },
              { icon: faFacebook, name: "Facebook" },
            ].map((social) => (
              <a key={social.name} href="#" className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-lg text-xs font-semibold hover:bg-[#4ECDC4] hover:text-black transition-all">
                <FontAwesomeIcon icon={social.icon} /> {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="w-full md:w-1/4">
          <div className="text-[#FFD93D] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faHouse} /> Menu
            <div className="flex-1 h-[2px] bg-[#FFD93D] opacity-30" />
          </div>
          <nav className="flex flex-col gap-1">
            <Link to="/" className="py-2 px-3 text-sm text-gray-300 hover:bg-[#FFD93D] hover:text-black rounded transition-all">Home</Link>
            <Link to="/aboutProjek" className="py-2 px-3 text-sm text-gray-300 hover:bg-[#FFD93D] hover:text-black rounded transition-all">About Project</Link>
            <Link to="/myProfile" className="py-2 px-3 text-sm text-gray-300 hover:bg-[#FFD93D] hover:text-black rounded transition-all">My Profile</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="w-full md:w-1/3">
          <div className="text-[#FFD93D] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
            <div className="flex-1 h-[2px] bg-[#FFD93D] opacity-30" />
          </div>
          <a href="mailto:deoosilaen@gmail.com" className="flex items-center gap-3 text-sm text-gray-300 mb-3 hover:text-[#FFD93D] transition-colors">
            <FontAwesomeIcon icon={faEnvelope} /> deoosilaen@gmail.com
          </a>
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-6">
            <FontAwesomeIcon icon={faLocationDot} /> Pekanbaru, Riau, ID
          </div>
          <div className="border-2 border-gray-700 rounded-lg overflow-hidden h-[150px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.35679113837958!2d101.47550803798866!3d0.4248057647107435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a858d8579427%3A0xfd261ac7e0a67939!2sPembiayaan%20MULTIGuna!5e0!3m2!1sid!2sid!4v1777974714387!5m2!1sid!2sid"
              className="w-full h-full border-none"
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-[10px] md:text-xs">
        <p>&copy; 2026 <strong className="text-[#FFD93D]">CALGENIUS BY DEO SILAEN</strong>. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
