import { useRef } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const InstallMetaMaskDialog = ({ isOpen, onClose }: Props) => {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            MetaMask is not installed!
          </AlertDialogHeader>

          <AlertDialogBody>
            You need to install MetaMask in your browser to connect your wallet.
            Do you want to install it now?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="purple" ml={3}>
              <Link
                href="https://metamask.io/"
                isExternal
                ml={3}
                onClick={onClose}
                target="_blank"
                alignItems="center"
                display="flex"
              >
                Yes <ExternalLinkIcon mx="2px" />
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
