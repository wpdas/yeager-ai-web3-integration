import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import { ConnectStatusButton } from "./connect-status-button";
import { MenuItems } from "./menu-items";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function NavbarMobileMenu({ isOpen, onClose }: Props) {
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.100">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <ConnectStatusButton />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="8px" ml="8" gap="8" alignItems="flex-end">
              <MenuItems onClick={onClose} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
