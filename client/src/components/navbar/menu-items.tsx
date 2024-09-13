import { Link as ReactRouterLink } from "react-router-dom";
import { routePaths } from "@/routes";
import { Link } from "@chakra-ui/react";

type Props = {
  onClick?: () => void;
};

export const MenuItems = ({ onClick }: Props) => (
  <>
    <Link as={ReactRouterLink} to={routePaths.home} onClick={onClick}>
      Home
    </Link>

    <Link as={ReactRouterLink} to={routePaths.userAssets} onClick={onClick}>
      My NFTs
    </Link>

    <Link as={ReactRouterLink} to={routePaths.mint} onClick={onClick}>
      Mint
    </Link>

    <Link href="#" onClick={onClick}>
      Git Repo
    </Link>
  </>
);
