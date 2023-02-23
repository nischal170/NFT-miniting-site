// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721, Ownable {
    uint private _token_counter=0; 
    mapping (uint=>address) private _idToAddress;
    mapping (address=>uint) private _addressToId;
    event NFTCreated(address indexed owner, uint tokenId, uint random);
    constructor() ERC721("TestNft", "NTK") {}

    function randomNumber() public returns(uint) {
        uint random=generateRandom();
         _token_counter++;
         require(_idToAddress[random]==address(0),"NFT already Created and Assigned");
        _idToAddress[random]=msg.sender;
        _addressToId[msg.sender]=random;
        uint tokenId = _token_counter;
         _mint(msg.sender, tokenId);
         emit NFTCreated(msg.sender, tokenId,random);
         return tokenId;

    }

      function getTokenIdForUser(address user) public view returns (uint) {
        return _addressToId[user];
    }

    function generateRandom() public view returns(uint){
         uint random=uint(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
         return random;

    }
    function getUserForTokenId(uint tokenId) public view returns (address) {
        return _idToAddress[tokenId];
    }
}
