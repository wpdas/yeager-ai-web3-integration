import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ConnectStatusButton } from "./connect-status-button";
import { MenuItems } from "./menu-items";
import { NavbarMobileMenu } from "./navbar-mobile-menu";

const Navbar = () => {
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onOpenMobileMenu,
    onClose: onCloseMobileMenu,
  } = useDisclosure();

  return (
    <>
      {/* Desktop */}
      <VStack
        spacing={24}
        padding="24px 0"
        bg="gray.50"
        mb={12}
        display={{ base: "none", md: "flex" }}
      >
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            {/* Left Desktop */}
            <HStack>
              <Image src="/assets/svgs/yeager-logo.svg" width={82} />
              <HStack spacing="8px" ml="8" gap="8">
                <MenuItems />
              </HStack>
            </HStack>

            {/* Right */}
            <ConnectStatusButton />
          </Flex>
        </Container>
      </VStack>

      {/* Mobile */}
      <NavbarMobileMenu isOpen={isMobileMenuOpen} onClose={onCloseMobileMenu} />
      <VStack
        spacing={24}
        padding="24px 0"
        bg="gray.50"
        mb={12}
        display={{ base: "flex", md: "none" }}
      >
        <Container maxW="container.xl">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            direction="row"
          >
            {/* Left */}
            <HStack>
              <Image src="/assets/svgs/yeager-logo.svg" width={82} />
            </HStack>

            {/* Right */}
            <Button onClick={onOpenMobileMenu}>
              <HamburgerIcon />
            </Button>
          </Flex>
        </Container>
      </VStack>
    </>
  );
};

export default Navbar;
