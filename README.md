- Tive que publicar o contrato novamente na rede testnet Sepolia pois o contrato enviado no teste
  estava na Goerli e também não era reconhecido como Smart Contract.

- Como o contrato é novo, também tive que gerar um novo ABI.

-- Contrato com mint privado: Somente quem criou pode mintar ou quem ele autorizar

- Contrato address: "0x4909e9Af35896441355f44c04c5a8f9359628bCE"
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x4909e9Af35896441355f44c04c5a8f9359628bCE
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0x1f2c952c1d8754b9078b44f1e82dc0e33cd6f98f54146710120e7fb1e1756a5c

-- Contrato com mint publico: Todos podem mintar (atualmente em uso)

- Contrato address: "0x099a031ee354fab0d17513e6cc49017114304c1c"
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x099a031ee354fab0d17513e6cc49017114304c1c
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0xf5642fee2519be91272cd70d29f0056b5fcdcfcb5978f01f1930ccf344d505d3

OBS:

- O mint de NFT no contrato pode ser feito apenas pelo criador do contrato (ou pessoas autorizadas)
  ou publicamente. Ver WendToken.sol linha 17.
