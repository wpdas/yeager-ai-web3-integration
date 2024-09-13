import { Container, Heading, Stack } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack width="100%" alignItems="center" display="flex">
        <Heading size="md" mb="2">
          Home
        </Heading>
        <p>oi</p>
      </Stack>
    </Container>
  );
};
