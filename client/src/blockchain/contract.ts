import { CONTRACT_ADDRESS } from "@/constants";
import { dispatch } from "@/store";
import { ethers } from "ethers";
import contractABI from "./contract-abi.json";
import { getProvider } from "./provider";

/**
 * Prepare contract and its dependencies and return them
 * @returns
 */
export const getContractProps = async () => {
  if (!window.ethereum) {
    dispatch.error.setError({ message: "MetaMask is not installed!" });
    return;
  }

  // Connect to provider and contract
  const provider = getProvider();
  // Get the Signer object with methods to send transaction and sign data as well
  // as get the account address
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  return { provider, signer, contract };
};

interface MintNFTPayload {
  tokenURI: string;
}

export const mintNFT = async ({ tokenURI }: MintNFTPayload) => {
  const contractProps = await getContractProps();
  if (!contractProps || !tokenURI) return null;

  const { signer, contract } = contractProps;
  // Get the connected account
  const recipientAddress = await signer.getAddress();

  try {
    // Call the contract's mintNFT method
    const transaction = await contract.mintNFT(recipientAddress, tokenURI);
    console.log("Tx sent:", transaction.hash);

    // Wait for transaction confirmation
    const receipt = await transaction.wait();
    console.log("Tx confirmed:", receipt);
  } catch (error) {
    console.error("Error minting NFT:", error);
    dispatch.error.setError({
      message: "Error while minting NFT. Please, try again!",
    });
  }
};

export const ownerOf = async (tokenId: string) => {
  const contractProps = await getContractProps();
  if (!contractProps || !tokenId) return null;
  const { contract } = contractProps;
  return contract.ownerOf(tokenId);
};

export const tokenURI = async (uri: string) => {
  const contractProps = await getContractProps();
  if (!contractProps || !uri) return null;
  const { contract } = contractProps;
  return contract.tokenURI(uri);
};

export type NFTs = { tokenId: string; tokenURI: string }[];

export const listNFTs = async (accountAddress: string) => {
  const contractProps = await getContractProps();
  if (!contractProps || !accountAddress) return null;
  const { contract } = contractProps;

  // Get user/owner tokenIds
  const tokenOfOwner = await contract.tokensOfOwner(accountAddress);
  const tokenIds: string[] = tokenOfOwner.map((id: BigInt) => id.toString());

  // Get tokenURIs
  const tokenURIPromises = tokenIds.map((tokenId) =>
    contract.tokenURI(tokenId),
  );
  const tokenURIs = await Promise.all(tokenURIPromises);

  // Prepare data structure for NFTs
  const nfts: NFTs = [];
  tokenIds.forEach((_, index) => {
    nfts.push({
      tokenId: tokenIds[index],
      tokenURI: tokenURIs[index],
    });
  });

  // console.log("Token IDs:", tokenIds);
  // console.log("Token URIs:", tokenURIs);
  // console.log("NFTs Data Structure", nfts);

  return nfts;
};
