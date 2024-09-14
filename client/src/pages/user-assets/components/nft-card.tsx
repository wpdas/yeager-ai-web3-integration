import { FaEthereum } from "react-icons/fa";
import { useTokenURI } from "@/hooks";
import { truncate } from "@/utils";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LoadingImage } from "./loading-image";

type Props = {
  tokenURI: string;
  onTransferClick: () => void;
  onSeeMoreClick: () => void;
};

export const NFTCard = ({
  tokenURI,
  onTransferClick,
  onSeeMoreClick,
}: Props) => {
  const tokenInfo = useTokenURI(tokenURI);

  return (
    <Card maxW="md" justifySelf={{ base: "center", md: "unset" }}>
      <CardBody bg="gray.100" borderRadius="lg" borderBottomRadius="unset">
        {tokenInfo ? (
          <Image src={tokenInfo.image} alt={tokenInfo.name} borderRadius="lg" />
        ) : (
          <LoadingImage />
        )}
        <HStack mt="4" justifyContent="space-between">
          <Heading size="sm">{tokenInfo?.name || "Loading Title"}</Heading>
          <HStack>
            <FaEthereum size={20} color="#212121" />
            <Text fontSize="sm">Free</Text>
          </HStack>
        </HStack>
        <Text fontSize="sm" mt="4">
          {truncate(tokenInfo?.description, 200) || "Loading description"}
        </Text>
      </CardBody>

      <CardFooter>
        <Stack
          w="100%"
          gap="4"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button
            onClick={onSeeMoreClick}
            width={{ base: "100%", md: "48%" }}
            colorScheme="purple"
          >
            See More
          </Button>
          <Button onClick={onTransferClick} width={{ base: "100%", md: "48%" }}>
            Transfer
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};
