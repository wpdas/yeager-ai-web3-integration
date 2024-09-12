import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "@/pages/home";
import Navbar from "@/ui/navbar";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
