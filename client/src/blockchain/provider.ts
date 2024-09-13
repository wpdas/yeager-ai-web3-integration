import { ethers } from "ethers";

export const getProvider = () => {
  let provider = ethers.getDefaultProvider();

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    // provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  return provider as ethers.BrowserProvider;
  // return provider as ethers.providers.Web3Provider;
};
