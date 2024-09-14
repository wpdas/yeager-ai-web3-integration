import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalDialog } from "@/components";
import Navbar from "@/components/navbar";
import { MintPage } from "@/pages/mint";
import { UserAssetsPage } from "@/pages/user-assets";

export const routePaths = {
  userAssets: "/",
  mint: "/mint",
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalDialog />
      <Routes>
        <Route path={routePaths.userAssets} element={<UserAssetsPage />} />
        <Route path={routePaths.mint} element={<MintPage />} />
      </Routes>
    </BrowserRouter>
  );
};
