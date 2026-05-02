import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import MyProfile from "./pages/MyProfile";
import AboutProjek from "./pages/AboutProjek";

function App() {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  return (
    <div>
      <NavbarComponent onScrollChange={setIsNavbarScrolled} />
      <Routes>
        <Route path="/" element={<HomePage isNavbarScrolled={isNavbarScrolled} />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/aboutProjek" element={<AboutProjek />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;