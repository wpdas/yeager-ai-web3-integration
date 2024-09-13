import { Container, Heading, Stack, Text } from "@chakra-ui/react";

export const NotConnectedContainer = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <Container
    maxW="container.xl"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Stack width="100%" alignItems="center" display="flex" padding="0 24px">
      <Heading size="md" mb="2">
        {title}
      </Heading>

      <Text mt="8">{message}</Text>
    </Stack>
  </Container>
);
