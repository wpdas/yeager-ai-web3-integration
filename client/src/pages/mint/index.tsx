import { useEffect } from "react";
import { NotConnectedContainer } from "@/components";
import { useApiHealthCheck, useWallet } from "@/hooks";
import { routePaths } from "@/routes";
import { dispatch } from "@/store";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { MintForm } from "./components/mint-form";

export const MintPage = () => {
  const { isConnected } = useWallet();
  const serverAlive = useApiHealthCheck();

  useEffect(() => {
    if (!serverAlive) {
      dispatch.globalDialog.setError({
        title: "Server is down!",
        goTo: routePaths.gallery,
        message:
          "Unfortunately the server is down. We will check the error as soon as possible. If the error persists, please contact the developer: wendersonpdas@gmail.com.",
      });
    }
  }, [serverAlive]);

  if (!isConnected) {
    return (
      <NotConnectedContainer
        title="Mint New Digital Asset (NFT)"
        message="You need to connect your wallet to mint new assets."
      />
    );
  }

  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack width="100%" alignItems="center" display="flex">
        <Heading size="md" mb="2">
          Mint New Digital Asset (NFT)
        </Heading>
        <MintForm />
      </Stack>
    </Container>
  );
};
