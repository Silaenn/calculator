import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import MyProfile from "./pages/MyProfile";
import AboutProjek from "./pages/AboutProjek";

function App() {
  return (
    <div>
      <NavbarComponent />
      {/* <LeftComponent /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/aboutProjek" element={<AboutProjek />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
