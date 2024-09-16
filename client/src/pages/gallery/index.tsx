import { useCallback, useEffect, useState } from "react";
import { contract } from "@/blockchain";
import { NFT } from "@/blockchain/contract";
import { NFTCard } from "@/components";
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

export const GalleryPage = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [ready, setReady] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [nftToSee, setNftToSee] = useState<NFT>();

  // Fetch all NFTs
  const fetchNFTs = useCallback(async () => {
    const allNfts = await contract.listAllNFTs();
    if (allNfts) {
      setNfts(allNfts);
    }
    setReady(true);
  }, []);

  // Call fetchNFTs
  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  const onCloseAssetDetailsModal = useCallback(() => {
    setNftToSee(undefined);
  }, []);

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
        <Heading size="md">NFT Gallery</Heading>
        <Text fontSize="sm" mb="2">
          Complete list of all minted NFTs
        </Text>

        {ready && nfts.length === 0 && (
          <Text mt="8">There is no assets available.</Text>
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
                  showOwner
                  key={nft.tokenId}
                  tokenURI={nft.tokenURI}
                  tokenId={nft.tokenId}
                  onSeeMoreClick={() => {
                    setNftToSee(nft);
                  }}
                />
              );
            })}
          </Grid>
        </Stack>
      </Stack>

      {/* Asset Details Modal */}
      <AssetDetailsModal
        showOwner
        nft={nftToSee}
        onClose={onCloseAssetDetailsModal}
      />
    </Container>
  );
};
