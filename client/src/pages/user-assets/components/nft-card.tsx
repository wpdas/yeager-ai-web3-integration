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
  Tag,
  Text,
} from "@chakra-ui/react";
import { LoadingImage } from "./loading-image";

type Props = {
  tokenURI: string;
};

export const NFTCard = ({ tokenURI }: Props) => {
  const tokenInfo = useTokenURI(tokenURI);

  return (
    <Card maxW="md" mb="4">
      <CardBody>
        <Tag width="fit-content">NFT Preview</Tag>
        <Stack
          bg="gray.100"
          spacing="3"
          mt="2"
          border="1px solid #e2e8f0"
          padding="4"
          borderRadius="lg"
        >
          {tokenInfo ? (
            <Image
              src={tokenInfo.image}
              alt={tokenInfo.name}
              borderRadius="lg"
            />
          ) : (
            <LoadingImage />
          )}
          <Heading size="sm" mt="2">
            {tokenInfo?.name || "Loading Title"}
          </Heading>
          <Text fontSize="sm">
            {tokenInfo?.description || "Loading description"}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Stack w="100%">
          <Heading size="md" mb="2">
            NFT Form Data
          </Heading>

          <HStack>
            <FaEthereum size={20} color="#212121" />
            <Text>Free</Text>
          </HStack>

          <Text mb="2">
            Select the image you want to mint, provide a name and description
            for it.
          </Text>

          <Button>Transfer</Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};
