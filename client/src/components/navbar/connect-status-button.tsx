import { useCallback } from "react";
import { useWallet } from "@/hooks";
import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { InstallMetaMaskDialog } from "../dialogs";

export const ConnectStatusButton = () => {
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
      <InstallMetaMaskDialog isOpen={isOpen} onClose={onClose} />
      <Button colorScheme="purple" onClick={connectHandler} minW={147}>
        {!wallet.connecting ? buttonText : <Spinner speed="0.6s" />}
      </Button>
    </>
  );
};
