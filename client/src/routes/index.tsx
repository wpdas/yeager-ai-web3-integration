import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalDialog } from "@/components";
import Navbar from "@/components/navbar";
import { HomePage } from "@/pages/home";
import { MintPage } from "@/pages/mint";
import { UserAssetsPage } from "@/pages/user-assets";

export const routePaths = {
  home: "/",
  userAssets: "/user-assets",
  mint: "/mint",
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalDialog />
      <Routes>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.mint} element={<MintPage />} />
        <Route path={routePaths.userAssets} element={<UserAssetsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
