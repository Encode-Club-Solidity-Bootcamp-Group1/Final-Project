// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KudosNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Kudos Tokens", "KUDOT") {
    }

    function createToken(string memory tokenURI) public returns(uint) {
         _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function sendKudos(string memory tokenURI, address to) public returns(uint) {
        uint256 tokenId = createToken(tokenURI);
        safeTransferFrom(msg.sender, to, tokenId);
        return tokenId;
    }
}
