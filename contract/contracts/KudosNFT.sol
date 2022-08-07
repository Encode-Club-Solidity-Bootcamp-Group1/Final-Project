// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {Base64} from "./Base64.sol";

contract KudosNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Kudos Tokens", "KUDOT") {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("disabled");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        revert("disabled");
    }

    function sendKudos(
        address destinaitonAddress,
        string memory name,
        string memory description,
        string memory imageUrl
    ) public returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        name,
                        '", "description": "',
                        description,
                        '", "image": "',
                        imageUrl,
                        '"}'
                    )
                )
            )
        );

        string memory tokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, tokenId);

        _setTokenURI(tokenId, tokenURI);

        _transfer(msg.sender, destinaitonAddress, tokenId);

        _tokenIds.increment();

        return tokenId;
    }
}
