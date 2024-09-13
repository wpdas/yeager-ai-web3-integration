import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

type Props = {
  onClick?: () => void;
};

export const MenuItems = ({ onClick }: Props) => (
  <>
    <Link as={ReactRouterLink} to="/" onClick={onClick}>
      Home
    </Link>

    <Link as={ReactRouterLink} to="/" onClick={onClick}>
      My NFTs
    </Link>

    <Link as={ReactRouterLink} to="/" onClick={onClick}>
      Mint
    </Link>

    <Link as={ReactRouterLink} to="/" onClick={onClick}>
      Git Repo
    </Link>
  </>
);
