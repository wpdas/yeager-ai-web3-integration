import { useCallback } from "react";
import { useWallet } from "@/hooks";
import {
  Button,
  Container,
  Image,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { InstallMetaMaskDialog } from "./dialogs";

const Navbar = () => {
  const wallet = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectHandler = useCallback(() => {
    if (wallet.metamaskAvailable) {
      wallet.connect();
    } else {
      onOpen();
    }
  }, [wallet, onOpen]);

  // Top right button text
  let buttonText = wallet.isConnected
    ? `ETH: ${wallet.balance}`
    : "Connect Wallet";

  if (wallet.error) {
    buttonText = "Check MetaMask";
  }

  return (
    <>
      <VStack spacing={24} padding="24px 0" bg="gray.50" mb={12}>
        <Container
          maxW="container.xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src="/assets/svgs/yeager-logo.svg" width={82} />
          <Button colorScheme="purple" onClick={connectHandler} minW={147}>
            {!wallet.connecting ? buttonText : <Spinner speed="0.6s" />}
          </Button>
        </Container>
      </VStack>

      {/* Dialogs */}
      <InstallMetaMaskDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
