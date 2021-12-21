// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIDs;
  Counters.Counter private _itemsSold;

  address payable owner;
  address payable feeAccountAddress =
    payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint256 itemID;
    address nftContract;
    uint256 tokenID;
    address payable seller;
    address payable owner;
    address creator;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated(
    uint256 indexed itemID,
    address indexed nftContract,
    uint256 indexed tokenID,
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
    uint256 tokenID,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");

    uint256 listingPrice = getListingPrice(price);
    require(msg.value == listingPrice, "Price must be equal to listing price");

    bool sent = payable(feeAccountAddress).send(listingPrice);
    require(sent, "Failed to send Ether");

    _itemIDs.increment();
    uint256 itemID = _itemIDs.current();

    idToMarketItem[itemID] = MarketItem(
      itemID,
      nftContract,
      tokenID,
      payable(msg.sender),
      payable(address(0)),
      msg.sender,
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenID);

    emit MarketItemCreated(
      itemID,
      nftContract,
      tokenID,
      payable(msg.sender),
      payable(address(0)),
      msg.sender,
      price,
      false
    );
  }

  function createMarketSale(address nftContract, uint256 itemID)
    public
    payable
    nonReentrant
  {
    uint256 price = idToMarketItem[itemID].price;
    uint256 tokenID = idToMarketItem[itemID].tokenID;

    require(
      msg.value == price,
      "Please submit the asking price in order to complete the purchase"
    );

    idToMarketItem[itemID].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenID);
    idToMarketItem[itemID].owner = payable(msg.sender);
    idToMarketItem[itemID].sold = true;
    _itemsSold.increment();
  }

  function getPageCount(address signerAddress) public view returns (uint256) {
    uint256 totalItemCount = _itemIDs.current();
    uint256 itemCount = 0;
    uint256 itemsPerPage = 12;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(0) &&
        idToMarketItem[i + 1].creator != signerAddress &&
        !idToMarketItem[i + 1].sold
      ) {
        itemCount += 1;
      }
    }

    uint256 pageCount = itemCount / itemsPerPage;

    return pageCount;
  }

  function fetchMarketItems(address signerAddress, uint256 page)
    public
    view
    returns (MarketItem[] memory)
  {
    require(page >= 0, "Invalid page");

    uint256 totalItemCount = _itemIDs.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;
    uint256 itemsPerPage = 12;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (
        idToMarketItem[i + 1].owner == address(0) &&
        idToMarketItem[i + 1].creator != signerAddress &&
        !idToMarketItem[i + 1].sold
      ) {
        itemCount += 1;
      }
    }

    uint256 pageCount = itemCount / itemsPerPage;

    require(page <= pageCount, "Invalid Page");

    uint256 startIndex = 0;
    uint256 endIndex = 0;

    if (totalItemCount > 0) {
      if (page == 1) {
        if (itemsPerPage < totalItemCount) endIndex = itemsPerPage;
        else endIndex = totalItemCount;
      } else {
        startIndex = itemsPerPage * (page - 1);
        endIndex = itemsPerPage * page;

        if (endIndex > totalItemCount) endIndex = totalItemCount;
      }
    } else itemsPerPage = 0;

    MarketItem[] memory items = new MarketItem[](itemsPerPage);
    for (uint256 i = startIndex; i < endIndex; i++) {
      console.log(i);
      if (
        idToMarketItem[i + 1].owner == address(0) &&
        idToMarketItem[i + 1].creator != signerAddress &&
        !idToMarketItem[i + 1].sold
      ) {
        uint256 currentId = idToMarketItem[i + 1].itemID;
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
    uint256 totalItemCount = _itemIDs.current();
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
        uint256 currentId = idToMarketItem[i + 1].itemID;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }

  function fetchNFT(uint256 itemID) public view returns (MarketItem memory) {
    uint256 totalItemCount = _itemIDs.current();

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].itemID == itemID) {
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
    uint256 totalItemCount = _itemIDs.current();
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
        uint256 currentId = idToMarketItem[i + 1].itemID;
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
    uint256 totalItemCount = _itemIDs.current();
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
        uint256 currentId = idToMarketItem[i + 1].itemID;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    return items;
  }
}
