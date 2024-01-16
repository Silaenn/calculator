import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import LeftComponent from "./components/LeftComponent";

function App() {
  return (
    <div>
      <NavbarComponent />
      {/* <LeftComponent /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
