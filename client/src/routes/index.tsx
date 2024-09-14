import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Footer, GlobalDialog } from "@/components";
import Navbar from "@/components/navbar";
import { GalleryPage } from "@/pages/gallery";
import { MintPage } from "@/pages/mint";
import { UserAssetsPage } from "@/pages/user-assets";

export const routePaths = {
  gallery: "/",
  userAssets: "/user-assets",
  mint: "/mint",
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalDialog />
      <Routes>
        <Route path={routePaths.gallery} element={<GalleryPage />} />
        <Route path={routePaths.userAssets} element={<UserAssetsPage />} />
        <Route path={routePaths.mint} element={<MintPage />} />

        {/* Redirect inexistent route to gallery page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
