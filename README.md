- Tive que publicar o contrato novamente na rede testnet Sepolia pois o contrato enviado no teste
  estava na Goerli e também não era reconhecido como Smart Contract.

- Como o contrato é novo, também tive que gerar um novo ABI.

-- Contrato com mint privado: Somente quem criou pode mintar ou quem ele autorizar

- Contrato address: 0x4909e9Af35896441355f44c04c5a8f9359628bCE
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x4909e9Af35896441355f44c04c5a8f9359628bCE
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0x1f2c952c1d8754b9078b44f1e82dc0e33cd6f98f54146710120e7fb1e1756a5c

-- Contrato com mint publico: Todos podem mintar (atualmente em uso)

- Contrato address: 0x5873AaA85F58b8F89e7Eb053D2CeEC48866ba13c
- Contract on sepolia.etherscan: https://sepolia.etherscan.io/address/0x5873aaa85f58b8f89e7eb053d2ceec48866ba13c
- Transacao do doploy do contrato: https://sepolia.etherscan.io/tx/0x249118b33fd4d1dff3aa66a842ee29d7b316dc71f5ab9a62ea4e7d2c16d8d3ef

OBS:

- O mint de NFT no contrato pode ser feito apenas pelo criador do contrato (ou pessoas autorizadas)
  ou publicamente. Ver WendToken.sol linha 17.
