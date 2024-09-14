import { FaEthereum } from "react-icons/fa";
import { useTokenOwner, useTokenURI } from "@/hooks";
import { truncate } from "@/utils";
import {
  Button,
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
  showOwner?: boolean;
  tokenURI: string;
  tokenId: string;
  onTransferClick?: () => void;
  onSeeMoreClick: () => void;
};

export const NFTCard = ({
  showOwner,
  tokenURI,
  tokenId,
  onTransferClick,
  onSeeMoreClick,
}: Props) => {
  const tokenInfo = useTokenURI(tokenURI);
  const owner = useTokenOwner(showOwner ? tokenId : "");

  return (
    <Card maxW="md" justifySelf={{ base: "center", md: "unset" }}>
      <CardBody bg="gray.100" borderRadius="lg" borderBottomRadius="unset">
        {tokenInfo ? (
          <Image
            src={tokenInfo.image}
            alt={tokenInfo.name}
            borderRadius="lg"
            width="100%"
          />
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
        {showOwner && (
          <HStack mt="4" flexWrap="wrap" gap="0">
            <Text fontSize="sm" fontWeight="bold" mr="2">
              Owner:
            </Text>
            <Text fontSize="sm" wordBreak="break-word">
              {truncate(owner, 27)}
            </Text>
          </HStack>
        )}
        <Text fontSize="sm" mt="4">
          {truncate(tokenInfo?.description, 200) || "Loading description"}
        </Text>
      </CardBody>
      <CardFooter>
        {onTransferClick ? (
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
            <Button
              onClick={onTransferClick}
              width={{ base: "100%", md: "48%" }}
            >
              Transfer
            </Button>
          </Stack>
        ) : (
          <HStack w="100%" gap="4" justifyContent="space-between">
            <Button onClick={onSeeMoreClick} w="100%" colorScheme="purple">
              See More
            </Button>
          </HStack>
        )}
      </CardFooter>
    </Card>
  );
};
