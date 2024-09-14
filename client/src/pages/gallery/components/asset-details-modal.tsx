import { NFT } from "@/blockchain/contract";
import { LoadingImage } from "@/components";
import { useTokenOwner, useTokenURI } from "@/hooks";
import { truncate } from "@/utils";
import {
  HStack,
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

type Props = {
  nft?: NFT;
  showOwner?: boolean;
  onClose: () => void;
};

export const AssetDetailsModal = ({ nft, showOwner, onClose }: Props) => {
  const tokenInfo = useTokenURI(nft?.tokenURI);
  const owner = useTokenOwner(showOwner && nft?.tokenId ? nft?.tokenId : "");

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
            {showOwner && (
              <HStack mt="4" flexWrap="wrap" gap="0">
                <Text fontSize="sm" fontWeight="bold" mr="2">
                  Owner:
                </Text>
                <Text fontSize="sm" wordBreak="break-word">
                  {owner}
                </Text>
              </HStack>
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
