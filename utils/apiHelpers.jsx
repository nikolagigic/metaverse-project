import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { nftaddress, nftmarketaddress, tokenaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NikolaToken from "../artifacts/contracts/NikolaToken.sol/NikolaToken.json";
import { Navigate } from "react-router-dom";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// const provider = new ethers.providers.JsonRpcProvider(
//     "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
//   );

export const getAccountDetails = async (setAccountAddress, setUserDetails) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/account/${address}`
    );
    setAccountAddress(address);
    setUserDetails(data);
  } catch (error) {
    console.error(error);
  }
};

export const getNikolaTokenValue = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const nikolaTokenContract = new ethers.Contract(
    tokenaddress,
    NikolaToken.abi,
    signer
  );

  const value = await nikolaTokenContract.getTokenValueInEthers();
  const formattedValue = parseFloat(value) / 1e18;

  console.log(`Nikola Token in ETH: ${formattedValue} ETH`);
  console.log(`Nikola Token in USD: ${formattedValue * 4000} USD`);
};

export const loadMarketNFTs = async (
  setNFTs,
  setLoadingState,
  setPageCount,
  page
) => {
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

  try {
    const pageCount = parseInt(await marketContract.getPageCount(address));
    setPageCount(pageCount);

    if (page > pageCount) {
      setNFTs([]);
      return;
    }
    const data = await marketContract.fetchMarketItems(address, page);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenID);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenID: i.tokenID.toNumber(),
          itemID: i.itemID.toNumber(),
          seller: i.seller,
          owner: i.owner,
          creator: i.creator,
          modelPath: meta.data.modelPath,
          name: meta.data.name,
          description: meta.data.description,
          backgroundColor: meta.data.backgroundColor,
        };
        return item;
      })
    );

    setNFTs(items);
    setLoadingState("loaded");
  } catch (e) {
    if (e.message === "Invalid Page") {
      setNFTs([]);
      setLoadingState("not-loaded");
    }
  }
};

export const loadCreatedNFTs = async (setNFTs, setLoadingState) => {
  setLoadingState("not-loaded");

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
      const tokenUri = await tokenContract.tokenURI(i.tokenID);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenID: i.tokenID.toNumber(),
        itemID: i.itemID.toNumber(),
        seller: i.seller,
        owner: i.owner,
        creator: i.creator,
        sold: i.sold,
        name: meta.data.name,
        description: meta.data.description,
        modelPath: meta.data.modelPath,
        backgroundColor: meta.data.backgroundColor,
      };
      return item;
    })
  );

  // data = await marketContract.fetchSoldItems(address);

  // const soldItems = await Promise.all(
  //   data.map(async (i) => {
  //     const tokenUri = await tokenContract.tokenURI(i.tokenID);
  //     const meta = await axios.get(tokenUri);
  //     let price = ethers.utils.formatUnits(i.price.toString(), "ether");
  //     let item = {
  //       price,
  //       tokenID: i.tokenID.toNumber(),
  //       itemID: i.itemID.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       creator: i.creator,
  //       sold: i.sold,
  //       name: meta.data.name,
  //       description: meta.data.description,
  //       modelPath: meta.data.modelPath,
  //       backgroundColor: meta.data.backgroundColor,
  //     };
  //     return item;
  //   })
  // );

  // setSold(soldItems);
  setNFTs(createdItems);
  setLoadingState("loaded");
};

export const loadMyNFTs = async (setNFTs, setLoadingState) => {
  setLoadingState("not-loaded");

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
      const tokenUri = await tokenContract.tokenURI(i.tokenID);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenID: i.tokenID.toNumber(),
        itemID: i.itemID.toNumber(),
        seller: i.seller,
        owner: i.owner,
        modelPath: meta.data.modelPath,
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

export const createNFT = async (url, addedPrice, router) => {
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
  let tokenID = value.toNumber();

  const price = ethers.utils.parseUnits(addedPrice, "ether");

  contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  let listingPrice = await contract.getListingPrice(price);
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenID, price, {
    value: listingPrice,
  });
  await transaction.wait();

  // router.push("/profile");
};

export const createNFTObject = async (
  name,
  description,
  addedPrice,
  modelURL,
  backgroundColor,
  router
) => {
  if (!name || !description || !addedPrice || !modelURL || !backgroundColor)
    return;

  const data = JSON.stringify({
    name,
    description,
    modelPath: modelURL,
    backgroundColor: backgroundColor,
  });

  try {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    createNFT(url, addedPrice, router);
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

  const transaction = await contract.createMarketSale(nftaddress, nft.tokenID, {
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
    const tokenUri = await tokenContract.tokenURI(fetchNft.tokenID);
    const meta = await axios.get(tokenUri);
    let price = ethers.utils.formatUnits(fetchNft.price.toString(), "ether");
    let item = {
      price,
      tokenID: fetchNft.tokenID.toNumber(),
      itemID: itemID,
      seller: fetchNft.seller,
      owner: fetchNft.owner,
      creator: fetchNft.creator,
      modelPath: meta.data.modelPath,
      name: meta.data.name,
      description: meta.data.description,
      backgroundColor: meta.data.backgroundColor,
    };

    setNFT(item);
    setLoadingState("loaded");
    setItemIsSold(false);
  } catch (e) {
    if (!e.message.startsWith("invalid BigNumber value")) console.error(e);
  }
};
