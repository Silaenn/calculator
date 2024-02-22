import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "animate.css";
import "./dist/css/main.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import "bootstrap/dist/css/bootstrap.min.css";
<script src="./node_modules/preline/dist/preline.js"></script>;

import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
// import { RocketIcon } from "@radix-ui/react-icons";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <div className="">
        <Toaster />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
