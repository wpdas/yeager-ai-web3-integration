import { Container, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Stack mt="128">
      <HStack
        spacing={24}
        padding="15px 0"
        bg="gray.50"
        position="fixed"
        w="100%"
        zIndex="99"
        borderTop="1px solid #eaeaea"
        bottom="0"
      >
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <HStack>
              <Image src="/assets/svgs/yeager-logo.svg" width="30px" />
              <Text fontSize="sm" fontWeight="medium">
                YeagerAI NFTs
              </Text>
            </HStack>

            <Text fontSize="sm">All rights reserved - {currentYear}</Text>
          </Flex>
        </Container>
      </HStack>
    </Stack>
  );
};
