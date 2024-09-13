/**
 * Connect wallet using MetaMask
 * @returns
 */
export const connectWallet = async () => {
  if (window.ethereum) {
    // Ask user to connect wallet and return only his/her account address
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Return the first account found
    return accounts[0];
  }

  return "";
};

/**
 * Get connected account
 * @returns
 */
export const connectedAccount = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    // Return the first account found
    return accounts[0];
  }

  return "";
};
