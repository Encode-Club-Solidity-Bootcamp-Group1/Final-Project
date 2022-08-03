import { ethers } from "hardhat";

async function main() {

  const KudosNFT = await ethers.getContractFactory("KudosNFT");
  const instance = await KudosNFT.deploy();

  await instance.deployed();

  console.log("KudosNFT deployed to:", instance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
