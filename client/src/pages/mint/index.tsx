import { NotConnectedContainer } from "@/components";
import { useWallet } from "@/hooks";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { MintForm } from "./components/mint-form";

export const MintPage = () => {
  const { isConnected } = useWallet();

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
