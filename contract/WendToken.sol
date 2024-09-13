// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

contract WendToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Map tokenIds for a owner
    mapping(address => uint256[]) private _ownedTokens;

    constructor() ERC721("WendToken2", "NFT") {}

    // Dispath this event every time there is a new mint
    event Minted(address indexed owner, uint256 indexed tokenId);

    // Mint limitter
    uint256 public constant MAX_SUPPLY = 10000;

    function mintNFT(address to, string memory uri) external {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = _tokenIdCounter.current();
        
        _safeMint(to, tokenId);
        _ownedTokens[to].push(tokenId);  // Add the tokenId to the owner list
        _setTokenURI(tokenId, uri);

        _tokenIdCounter.increment();
        emit Minted(to, tokenId);
    }

    // Returns the total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        return _ownedTokens[owner];  // Returns tokenIds the user owns
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        address owner = ownerOf(tokenId);

        // INFO: custom change
        // Remove tokenId from owner's list of tokens
        // This is to guarantee the list of items is always with the most updated state
        uint256[] storage tokens = _ownedTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1]; // Replace tokenId with the last token
                tokens.pop(); // remove the last element
                break;
            }
        }

        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}