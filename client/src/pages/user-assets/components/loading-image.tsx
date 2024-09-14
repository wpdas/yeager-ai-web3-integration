import { Spinner, Stack } from "@chakra-ui/react";

export const LoadingImage = () => (
  <Stack
    width="100%"
    height="180px"
    bg="gray.50"
    alignItems="center"
    justifyContent="center"
    borderRadius="lg"
  >
    <Spinner speed="0.6s" />
  </Stack>
);
