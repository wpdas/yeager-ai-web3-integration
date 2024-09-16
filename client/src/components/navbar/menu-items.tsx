import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { routePaths } from "@/routes";
import { Link } from "@chakra-ui/react";

type Props = {
  onClick?: () => void;
};

export const MenuItems = ({ onClick }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        as={ReactRouterLink}
        to={routePaths.gallery}
        onClick={onClick}
        fontWeight={pathname === routePaths.gallery ? "600" : "normal"}
      >
        NFT Gallery
      </Link>

      <Link
        as={ReactRouterLink}
        to={routePaths.userAssets}
        onClick={onClick}
        fontWeight={pathname === routePaths.userAssets ? "600" : "normal"}
      >
        My NFTs
      </Link>

      <Link
        as={ReactRouterLink}
        to={routePaths.mint}
        onClick={onClick}
        fontWeight={pathname === routePaths.mint ? "600" : "normal"}
      >
        Mint
      </Link>

      <Link
        href="https://github.com/wpdas/yeager-ai-web3-integration"
        target="_blank"
        onClick={onClick}
      >
        Git Repo
      </Link>
    </>
  );
};
