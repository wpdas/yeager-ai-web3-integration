import { CONTRACT_ADDRESS } from "@/constants";
import { store } from "@/store";
import { ethers } from "ethers";
import contractABI from "./contract-abi.json";
import { getAlchemyProvider, getProvider } from "./provider";

/**
 * Check Wallet account
 * @returns
 */
const isWalletConnected = () => !!store.getState().wallet.account;

/**
 * Check if window.ethereum is defined and user is connected to MetaMask wallet
 * @returns
 */
const hasMetaMaskWalletConnection = () =>
  window.ethereum && isWalletConnected();

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

/**
 * This must be used for view (non payable) methods when MetaMask is not available
 * @returns
 */
export const getContractPropsThroughAlchemy = async () => {
  const provider = getAlchemyProvider();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

  return { provider, contract };
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
  const contractProps = hasMetaMaskWalletConnection()
    ? await getContractProps()
    : await getContractPropsThroughAlchemy();

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
 *
 * Info: This function uses Alchemy as the intention is to show the list of
 * NFTs even if the user does not have MetaMask installed.
 *
 * Get to know more: https://docs.alchemy.com/docs/choosing-a-web3-network#sepolia-testnet
 * @returns
 */
export const listAllNFTs = async () => {
  const contractProps = hasMetaMaskWalletConnection()
    ? await getContractProps()
    : await getContractPropsThroughAlchemy();

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
