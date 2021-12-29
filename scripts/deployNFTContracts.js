const hre = require("hardhat");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();

  console.log("NFTMarket Deployed Address:", nftMarket.address);

  await nftMarket.deployed();

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);

  console.log("NFT Deploy Address: ", nft.address);

  await nft.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
