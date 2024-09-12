import { ethers } from "ethers";

export const getProvider = () => {
  let provider = ethers.getDefaultProvider();

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  return provider;
};
