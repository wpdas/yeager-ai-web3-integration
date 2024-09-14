import { NFT } from "@/blockchain/contract";
import { useTokenURI } from "@/hooks";
import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoadingImage } from "./loading-image";

type Props = {
  nft?: NFT;
  onClose: () => void;
};

export const AssetDetailsModal = ({ nft, onClose }: Props) => {
  const tokenInfo = useTokenURI(nft?.tokenURI);

  return (
    <Modal isOpen={!!nft} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{tokenInfo?.name || "Loading Title"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack justifyContent="flex-start" alignItems="flex-start" mb="8">
            {tokenInfo ? (
              <Image
                w="100%"
                src={tokenInfo.image}
                alt={tokenInfo.name}
                borderRadius="lg"
              />
            ) : (
              <LoadingImage />
            )}
            <Text fontSize="sm" mt="4">
              {tokenInfo?.description || "Loading description"}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
