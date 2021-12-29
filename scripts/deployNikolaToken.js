const hre = require("hardhat");

async function main() {
  const NikolaToken = await hre.ethers.getContractFactory("NikolaToken");
  const token = await NikolaToken.deploy();

  console.log("Nikola Token Address: ", token.address);

  await token.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
