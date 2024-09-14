import { useCallback, useRef, useState } from "react";
import { contract } from "@/blockchain";
import { NFT } from "@/blockchain/contract";
import { ErrorMessage } from "@/components";
import { useTokenURI, useWallet } from "@/hooks";
import { dispatch } from "@/store";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { LoadingImage } from "./loading-image";

type Props = {
  nft?: NFT;
  onClose: () => void;
};

export const TransferAssetModalForm = ({ nft, onClose }: Props) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const tokenInfo = useTokenURI(nft?.tokenURI);
  const [isValid, setIsValid] = useState(false);
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { account } = useWallet();

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Remove all spaces
      const value = event.target.value.replace(/\s+/g, "");
      // Checks if it is a valid address and is not the same as the connected user
      setIsValid(
        ethers.isAddress(value) &&
          value.toLowerCase() !== account.toLowerCase(),
      );
      setAddress(value);
    },
    [account],
  );

  // Init transfer process on click transfer button
  const onTransferClick = useCallback(async () => {
    if (isValid && account && nft) {
      try {
        setSubmitting(true);
        const receipt = await contract.safeTransferFrom(
          account,
          address,
          nft.tokenId,
        );

        if (receipt) {
          // Success dialog
          dispatch.globalDialog.setMessage({
            message: "Asset transferred successfully!",
          });

          // Close modal
          onClose();
        } else {
          // Some info is missing, just close
          onClose();
        }
      } catch (error) {
        console.error(error);

        // Error dialog
        dispatch.globalDialog.setError({
          message:
            "There was an issue while transferring this asset. Please, try again!",
        });
      } finally {
        setSubmitting(false);
      }
    }
  }, [isValid, account, address, nft, onClose]);

  const isSameAccount = address.toLowerCase() === account.toLowerCase();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={!!nft}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tokenInfo?.name || "Loading Title"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack justifyContent="flex-start" alignItems="flex-start" mb="8">
              {tokenInfo ? (
                <Image
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

            <Divider />

            <Heading size="sm" mt="8">
              Transfer Asset Details
            </Heading>

            <Text mt="2" fontSize="sm">
              Please provide the address below to which you wish to transfer
              this asset. You must provide a valid address to continue.
            </Text>

            <FormControl mt="8">
              <FormLabel>Destination address:</FormLabel>
              <Input
                isInvalid={isSameAccount || !isValid}
                disabled={submitting}
                ref={initialRef}
                placeholder="0x..."
                onChange={onInputChange}
              />
              <ErrorMessage
                error={isSameAccount ? "You can't use your address!" : ""}
              />
              <ErrorMessage
                error={
                  !isSameAccount && !isValid ? "Enter a valid address!" : ""
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              disabled={!isValid}
              opacity={!isValid ? 0.4 : 1}
              isLoading={submitting}
              loadingText="Transferring"
              spinnerPlacement="end"
              onClick={onTransferClick}
            >
              Transfer
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
