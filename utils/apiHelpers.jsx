import { useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const loadMarketNFTs = async (setNFTs, setLoadingState) => {
  // before: async (setNfts, setLoadingState)
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  // );
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    provider
  );
  const data = await marketContract.fetchMarketItems(address);

  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: i.creator,
        model: meta.data.model,
        name: meta.data.name,
        description: meta.data.description,
        backgroundColor: meta.data.backgroundColor,
      };
      return item;
    })
  );

  setNFTs(items);
  setLoadingState("loaded");
};

export const loadCreatedNFTs = async (setNFTs, setSold, setLoadingState) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    signer
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);

  let data = await marketContract.fetchCreatedItems(address);

  const createdItems = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: i.creator,
        sold: i.sold,
        name: meta.data.name,
        description: meta.data.description,
        model: meta.data.model,
        backgroundColor: meta.data.backgroundColor,
      };
      return item;
    })
  );

  data = await marketContract.fetchSoldItems(address);

  const soldItems = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: i.creator,
        sold: i.sold,
        name: meta.data.name,
        description: meta.data.description,
        model: meta.data.model,
        backgroundColor: meta.data.backgroundColor,
      };
      return item;
    })
  );

  setSold(soldItems);
  setNFTs(createdItems);
  setLoadingState("loaded");
};

export const loadMyNFTs = async (setNFTs, setLoadingState) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    signer
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);

  const data = await marketContract.fetchMyNFTs(address);

  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        model: meta.data.model,
        backgroundColor: meta.data.backgroundColor,
        name: meta.data.name,
        description: meta.data.description,
      };
      return item;
    })
  );
  setNFTs(items);
  setLoadingState("loaded");
};

export const createNFT = async (url, addedPrice) => {
  // before: createSale
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
  let transaction = await contract.createToken(url);
  let tx = await transaction.wait();

  let event = tx.events[0];
  let value = event.args[2];
  let tokenId = value.toNumber();

  const price = ethers.utils.parseUnits(addedPrice, "ether");

  contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  let listingPrice = await contract.getListingPrice(price);
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
};

export const createNFTObject = async (
  name,
  description,
  addedPrice,
  modelURL,
  backgroundColor
) => {
  // before: createMarket

  if (!name || !description || !addedPrice || !modelURL || !backgroundColor)
    return;

  const data = JSON.stringify({
    name,
    description,
    model: modelURL,
    backgroundColor: backgroundColor,
  });

  try {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    createNFT(url, addedPrice);
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
};

export const buyNft = async (nft) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });

  await transaction.wait();
};

export const getNFT = async (
  itemID,
  setNFT,
  setLoadingState,
  setItemIsSold
) => {
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  // );
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    provider
  );

  try {
    const fetchNft = await marketContract.fetchNFT(itemID);
    const tokenUri = await tokenContract.tokenURI(fetchNft.tokenId);
    const meta = await axios.get(tokenUri);
    let price = ethers.utils.formatUnits(fetchNft.price.toString(), "ether");
    let item = {
      price,
      tokenId: fetchNft.tokenId.toNumber(),
      itemID: itemID,
      seller: fetchNft.seller,
      owner: fetchNft.owner,
      creator: fetchNft.creator,
      model: meta.data.model,
      name: meta.data.name,
      description: meta.data.description,
      backgroundColor: meta.data.backgroundColor,
    };

    setNFT(item);
    setLoadingState("loaded");
    setItemIsSold(false);
  } catch (e) {
    if (!e.message.startsWith("invalid BigNumber value")) console.error(e);
    if (e.message === "Item has already been sold.") setItemIsSold(true);
  }
};
