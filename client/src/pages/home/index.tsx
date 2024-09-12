import { Container, Stack } from "@chakra-ui/react";
import MintForm from "./components/mint-form";

export const Home = () => {
  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack width="100%" alignItems="center" display="flex">
        <MintForm />
      </Stack>
    </Container>
  );
};
