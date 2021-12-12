// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    address creator;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address payable seller,
    address payable owner,
    address creator,
    uint256 price,
    bool sold
  );

  function getListingPrice(uint256 price) public pure returns (uint256) {
    return price / 100;
  }

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");

    uint256 listingPrice = getListingPrice(price);
    require(msg.value == listingPrice, "Price must be equal to listing price");

    bool sent = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199).send(
      listingPrice
    );

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketItem[itemId] = MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      msg.sender,
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      msg.sender,
      price,
      false
    );
  }

  function createMarketSale(address nftContract, uint256 itemId)
    public
    payable
    nonReentrant
  {
    uint256 price = idToMarketItem[itemId].price;
    uint256 tokenId = idToMarketItem[itemId].tokenId;

    require(
      msg.value == price,
      "Please submit the asking price in order to complete the purchase"
    );

    idToMarketItem[itemId].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
  }

  function fetchMarketItems(address signerAddress)
    public
    view
    returns (MarketItem[] memory)
  {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(0) &&
        idToMarketItem[i + 1].creator != signerAddress &&
        !idToMarketItem[i + 1].sold
      ) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(0) &&
        idToMarketItem[i + 1].creator != signerAddress &&
        !idToMarketItem[i + 1].sold
      ) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }

  function fetchSoldItems(address signerAddress)
    public
    view
    returns (MarketItem[] memory)
  {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].creator == signerAddress &&
        idToMarketItem[i + 1].sold
      ) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].creator == signerAddress &&
        idToMarketItem[i + 1].sold
      ) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }

  function fetchNFT(uint256 itemId) public view returns (MarketItem memory) {
    uint256 totalItemCount = _itemIds.current();
    bool itemIsSold = idToMarketItem[itemId].sold;

    require(!itemIsSold, "Item has already been sold.");

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].itemId == itemId) {
        return idToMarketItem[i + 1];
      }
    }

    revert("Not found");
  }

  function fetchMyNFTs(address signerAddress)
    public
    view
    returns (MarketItem[] memory)
  {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == signerAddress) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == signerAddress) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }

  function fetchCreatedItems(address signerAddress)
    public
    view
    returns (MarketItem[] memory)
  {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == signerAddress) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == signerAddress) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }
}
