import { useEffect, useState } from "react";
import { contract } from "@/blockchain";
import { NFTs } from "@/blockchain/contract";
import { NotConnectedContainer } from "@/components";
import { useWallet } from "@/hooks";
import {
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NFTCard } from "./components/nft-card";

export const UserAssetsPage = () => {
  const { account, isConnected } = useWallet();
  const [nfts, setNfts] = useState<NFTs>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (account) {
        const userNfts = await contract.listNFTs(account);
        if (userNfts) {
          setNfts(userNfts);
        }
        setReady(true);
      }
    })();
  }, [account]);

  if (!isConnected) {
    return (
      <NotConnectedContainer
        title="My Digital Assets (NFTs)"
        message="You need to connect your wallet to see your assets."
      />
    );
  }

  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack width="100%" alignItems="center" display="flex" padding="0 24px">
        <Heading size="md" mb="2">
          My Digital Assets (NFTs)
        </Heading>

        {ready && nfts.length === 0 && (
          <Text mt="8">You don't have any assets.</Text>
        )}

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
            return <NFTCard key={nft.tokenId} tokenURI={nft.tokenURI} />;
          })}
        </Grid>
      </Stack>
    </Container>
  );
};
