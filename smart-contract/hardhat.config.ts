import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

// Init env vars
dotenv.config();

export default {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      /**
       * You can get your RPC URL + API KEY here: https://www.alchemy.com/chain-connect/endpoints/rpc-sepolia-sepolia
       * Format: https://eth-sepolia.g.alchemy.com/v2/<your-alchemy-api-key>
       */
      url: process.env.SEPOLIA_RPC_URL,
      /**
       * Getting account private key: Go to MetaMask -> Account Details -> Click "Show private key" ->
       * Enter your password -> Hold to reveal Private Key (button) -> copy the private key
       */
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
