import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("KudosNFT", function () {
  async function deployKudosNFTContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const KudosNFT = await ethers.getContractFactory("KudosNFT");
    const instance = await KudosNFT.deploy();
    await instance.deployed();

    return { instance, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the owner", async function () {
      const { instance, owner } = await loadFixture(deployKudosNFTContract);
      expect(await instance.signer.getAddress()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should match the receive address", async function () {
      const { instance, otherAccount } = await loadFixture(
        deployKudosNFTContract
      );
      const transaction = await instance.sendKudos(
        otherAccount.address,
        "name",
        "description",
        "https://www.iamgeurl.com"
      );
      const tx = await transaction.wait();
      const event = tx.events?.at(0);
      const tokenId = event?.args?.tokenId.toNumber();
      expect(await instance.ownerOf(tokenId)).to.equal(otherAccount.address);
    });

    it("Should not be able to transfer nft ", async function () {
      const [, , , addr3] = await ethers.getSigners();
      const { instance, otherAccount } = await loadFixture(
        deployKudosNFTContract
      );
      const transaction = await instance.sendKudos(
        otherAccount.address,
        "name",
        "description",
        "https://www.iamgeurl.com"
      );
      const tx = await transaction.wait();
      const event = tx.events?.at(0);
      const tokenId = event?.args?.tokenId.toNumber();
      expect(await instance.ownerOf(tokenId)).to.equal(otherAccount.address);

      expect(
        instance
          .connect(otherAccount)
          .transferFrom(otherAccount.address, addr3.address, 0)
      ).to.be.revertedWith("disabled");
    });
  });
});
