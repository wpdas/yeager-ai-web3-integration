import { WarningIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";

export const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;

  return (
    <Box
      mt="2"
      display="flex"
      alignItems="center"
      justifyItems="center"
      gap="2"
    >
      <WarningIcon w={3} h={3} color="red.500" />
      <Text fontSize="xs" color="red.500">
        {error}
      </Text>
    </Box>
  );
};
