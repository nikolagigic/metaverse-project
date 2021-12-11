import { useState } from "react";

import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

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
        previewImage: meta.data.previewImage,
        name: meta.data.name,
        description: meta.data.description,
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
        previewImage: meta.data.previewImage,
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
        previewImage: meta.data.previewImage,
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
        previewImage: meta.data.previewImage,
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
  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
  router.push("/");
};

export const createNFTObject = async (
  name,
  description,
  addedPrice,
  modelURL
) => {
  // before: createMarket
  if (!name || !description || !addedPrice || !modelURL) return;

  const data = JSON.stringify({
    name,
    description,
    model: modelURL,
  });

  try {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    createSale(url, addedPrice);
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

  loadMarketNFTs(setNfts, setLoadingState);
};
