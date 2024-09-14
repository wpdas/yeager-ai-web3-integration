import { ALCHEMY_API_KEY } from "@/constants";
import { ethers } from "ethers";

export const getProvider = () => {
  let provider = ethers.getDefaultProvider();

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  return provider as ethers.BrowserProvider;
};

/**
 * To be used for view (non payable) methods when MetaMask is not available
 * @returns
 */
export const getAlchemyProvider = () => {
  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  );

  return provider;
};
