import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/normalize.css";
import "./styles/general.css";

import { RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import QPollRouter from "./routes/index";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Header />
    <div className="content-body">
      <Sidebar />
      <RouterProvider router={QPollRouter} />
    </div>
    <Footer />
  </StrictMode>
);
