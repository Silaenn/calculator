import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "animate.css";
import "./dist/css/main.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Toaster } from "react-hot-toast";

AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);
