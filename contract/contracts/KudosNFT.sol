// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KudosNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => bool) _transferable;

    // Transferable modifier
    modifier transferable(uint256 tokenId) {
        require(_transferable[tokenId], "Token is not transferable");
        _;
    }

    constructor() ERC721("Kudos Tokens", "KUDOT") {}

    // Override all transfer functions
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override transferable(tokenId) {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override transferable(tokenId) {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override transferable(tokenId) {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }

    // Remove transferability property of token after it has been transfered
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        _transferable[tokenId] = false;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _transferable[tokenId] = true;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function sendKudos(string memory tokenURI, address to)
        public
        returns (uint256)
    {
        uint256 tokenId = createToken(tokenURI);
        safeTransferFrom(msg.sender, to, tokenId);
        return tokenId;
    }
}
