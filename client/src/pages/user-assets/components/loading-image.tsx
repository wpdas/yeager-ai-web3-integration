import { ViewIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/react";

export const LoadingImage = () => (
  <Stack
    width="100%"
    height="180px"
    bg="gray.50"
    alignItems="center"
    justifyContent="center"
    borderRadius="lg"
  >
    <ViewIcon w={8} h={8} color="gray.500" />
    <Text color="gray.500">loading</Text>
  </Stack>
);
