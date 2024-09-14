import { useCallback, useEffect, useState } from "react";
import { contract } from "@/blockchain";
import { NFT } from "@/blockchain/contract";
import { NotConnectedContainer } from "@/components";
import { useWallet } from "@/hooks";
import {
  Container,
  Grid,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { AssetDetailsModal } from "./components/asset-details-modal";
import { NFTCard } from "./components/nft-card";
import { TransferAssetModalForm } from "./components/transfer-asset-modal-form";

export const UserAssetsPage = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [ready, setReady] = useState(false);
  const [contractName, setContractName] = useState("");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [nftToTransfer, setNftToTransfer] = useState<NFT>();
  const [nftToSee, setNftToSee] = useState<NFT>();

  // Make sure the transfer modal is closed when account is changed using MetaMask
  const onAccountChange = useCallback(() => {
    setNftToTransfer(undefined);
  }, []);

  const { account, isConnected } = useWallet(onAccountChange);

  // Fetch owner's NFTs
  const fetchOwnerNFTs = useCallback(async () => {
    if (account) {
      const userNfts = await contract.listNFTs(account);
      if (userNfts) {
        setNfts(userNfts);
      }
      setReady(true);
    } else {
      setReady(true);
    }
  }, [account]);

  // Call fetchOwnerNFTs
  useEffect(() => {
    fetchOwnerNFTs();
  }, [fetchOwnerNFTs]);

  // Fetch Contract Name and Symbol (cosmetic only)
  useEffect(() => {
    (async () => {
      const contractInstance = await contract.getContractInstance();
      if (contractInstance) {
        const _contractName = await contractInstance!.name();
        const contractSymbol = await contractInstance!.symbol();
        setContractName(`${_contractName} (${contractSymbol})`);
      }
    })();
  }, [account]);

  const onCloseTransferModal = useCallback(() => {
    setNftToTransfer(undefined);

    // refresh list of NFTs
    fetchOwnerNFTs();
  }, [fetchOwnerNFTs]);

  const onCloseAssetDetailsModal = useCallback(() => {
    setNftToSee(undefined);
  }, []);

  if (!isConnected) {
    return (
      <NotConnectedContainer
        title="My Digital Assets (NFTs)"
        message="You need to connect your wallet to see your assets."
      />
    );
  }

  if (!ready) {
    return (
      <HStack w="100%" justifyContent="center" mt="52">
        <Spinner speed="0.6s" />
      </HStack>
    );
  }

  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack
        width="100%"
        alignItems="center"
        display="flex"
        padding={`0 ${isLargerThan768 ? "24" : "0"}px`}
        mb="54"
      >
        <Heading size="md">My Digital Assets</Heading>
        <Text fontSize="sm" mb="2">
          {contractName}
        </Text>

        {ready && nfts.length === 0 && (
          <Text mt="8">You don't have any assets.</Text>
        )}

        <Stack w="100%">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            mt="12"
            gap={6}
            w="100%"
          >
            {nfts.map((nft) => {
              return (
                <NFTCard
                  key={nft.tokenId}
                  tokenURI={nft.tokenURI}
                  onTransferClick={() => {
                    setNftToTransfer(nft);
                  }}
                  onSeeMoreClick={() => {
                    setNftToSee(nft);
                  }}
                />
              );
            })}
          </Grid>
        </Stack>
      </Stack>

      {/* Transfer Asset Modal Form */}
      <TransferAssetModalForm
        nft={nftToTransfer}
        onClose={onCloseTransferModal}
      />

      {/* Asset Details Modal */}
      <AssetDetailsModal nft={nftToSee} onClose={onCloseAssetDetailsModal} />
    </Container>
  );
};
