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
    // console.log("Tx sent:", transaction.hash);

    // Wait for transaction confirmation
    await transaction.wait();

    // INFO: For logs
    // const receipt = await transaction.wait();
    // console.log("Tx confirmed:", receipt);

    return true;
  } catch (error) {
    // console.error("Error minting NFT:", error);
    return false;
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

export type NFT = { tokenId: string; tokenURI: string };

/**
 * Get a list of owner's NFTs
 * @param accountAddress
 * @returns
 */
export const listOwnerNFTs = async (accountAddress: string) => {
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
  const nfts: NFT[] = [];
  tokenIds.forEach((_, index) => {
    nfts.push({
      tokenId: tokenIds[index],
      tokenURI: tokenURIs[index],
    });
  });

  return nfts;
};

/**
 * Get a list of all NFTs minted
 * @returns
 */
export const listAllNFTs = async () => {
  const contractProps = await getContractProps();
  if (!contractProps) return null;
  const { contract } = contractProps;

  // Total NFTs minted
  const totalSupply = await contract.totalSupply();

  const tokenURIPromises = [];
  for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
    tokenURIPromises.push(contract.tokenURI(tokenId));
  }

  const tokenURIs = await Promise.all(tokenURIPromises);

  // Prepare data structure for NFTs
  const nfts: NFT[] = [];
  tokenURIs.forEach((_, index) => {
    nfts.push({
      tokenId: index.toString(),
      tokenURI: tokenURIs[index],
    });
  });

  return nfts;
};

export const getContractInstance = async () => {
  const contractProps = await getContractProps();
  if (!contractProps) return null;
  const { contract } = contractProps;
  return contract;
};

export const safeTransferFrom = async (
  from: string,
  to: string,
  tokenId: string,
) => {
  const contractProps = await getContractProps();
  if (!contractProps || !from || !to || !tokenId) return null;
  const { contract } = contractProps;

  // Call contract's method to transfer asset
  const transaction = await contract.safeTransferFrom(from, to, tokenId);
  // Wait for transaction confirmation
  const receipt = await transaction.wait();
  return receipt;
};
