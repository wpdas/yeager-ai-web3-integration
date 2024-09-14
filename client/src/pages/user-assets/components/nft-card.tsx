import { FaEthereum } from "react-icons/fa";
import { useTokenURI } from "@/hooks";
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
  tokenURI: string;
  onTransferClick: () => void;
};

export const NFTCard = ({ tokenURI, onTransferClick }: Props) => {
  const tokenInfo = useTokenURI(tokenURI);

  return (
    <Card maxW="md">
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
          {tokenInfo?.description || "Loading description"}
        </Text>
      </CardBody>

      <CardFooter>
        <Stack w="100%">
          <Button mt="2" onClick={onTransferClick}>
            Transfer
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};
