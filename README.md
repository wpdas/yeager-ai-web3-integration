- Tive que publicar o contrato novamente na rede testnet Sepolia pois o contrato enviado no teste
  estava na Goerli e também não era reconhecido como Smart Contract.

- Como o contrato é novo, também tive que gerar um novo ABI.

-- Contrato com mint privado: Somente quem criou pode mintar ou quem ele autorizar

- Contrato address: 0x4909e9Af35896441355f44c04c5a8f9359628bCE
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x4909e9Af35896441355f44c04c5a8f9359628bCE
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0x1f2c952c1d8754b9078b44f1e82dc0e33cd6f98f54146710120e7fb1e1756a5c

-- Contrato com mint publico: Todos podem mintar (atualmente em uso)

- Contrato address: 0x98437a94C9b2335Fe56fCAb0bA14e327976d2573
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x98437a94c9b2335fe56fcab0ba14e327976d2573
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0xb413d064d10bd9325f9f99403d48f887055549cb4c62e300f17450ef8d7d78fe

OBS:

- O mint de NFT no contrato pode ser feito apenas pelo criador do contrato (ou pessoas autorizadas)
  ou publicamente. Ver WendToken.sol linha 17.
