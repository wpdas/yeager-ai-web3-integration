import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalDialog } from "@/components";
import Navbar from "@/components/navbar";
import { Home } from "@/pages/home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalDialog />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
