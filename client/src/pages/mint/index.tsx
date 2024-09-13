import { Container, Heading, Stack } from "@chakra-ui/react";
import MintForm from "./components/mint-form";

export const MintPage = () => {
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
