import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WendTokenModule = buildModule("WendTokenModule", (m) => {
  // Contract initial params
  // INFO: not needed as these values ​​are set within contract
  // const tokenName = "WendToken5";
  // const tokenSymbol = "NFT";

  // Implement the contract deployment
  // INFO: not needed as these values ​​are set within contract
  // const wendToken = m.contract("WendToken", [tokenName, tokenSymbol]);
  const wendToken = m.contract("WendToken");

  // Returns contract after deploy
  return { wendToken };
});

export default WendTokenModule;
