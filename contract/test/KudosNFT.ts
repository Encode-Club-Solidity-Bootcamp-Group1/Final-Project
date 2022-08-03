import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";


function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
}

describe("KudosNFT", function () {

    async function deployKudosNFTContract() {    
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
    
        const KudosNFT = await ethers.getContractFactory("KudosNFT");
        const instance = await KudosNFT.deploy();
        await instance.deployed()
    
        return { instance, owner, otherAccount };
    }

    describe("Deployment", function () {

        it("Should set the owner", async function () {
            const { instance, owner } = await loadFixture(deployKudosNFTContract);
            expect(await instance.signer.getAddress()).to.equal(owner.address);
        });
    })

    describe("Mint", function() {
        it("Should match the tokenId", async function () {
            const { instance} = await loadFixture(deployKudosNFTContract);

            for (let i = 0; i < 3; i++) {
                const transaction = await instance.createToken("https://www.mytokenlocation.com")
                const tx = await transaction.wait()
                const event = tx.events?.at(0)
                expect(event?.args?.tokenId.toNumber()).to.equal((i+1))
            }
        });

        it("Should match the receive address", async function () {
            const { instance, otherAccount } = await loadFixture(deployKudosNFTContract);
            const transaction = await instance.sendKudos("https://www.mytokenlocation.com", otherAccount.address)
            const tx = await transaction.wait()
            const event = tx.events?.at(0)
            const tokenId = event?.args?.tokenId.toNumber()
            expect(await instance.ownerOf(tokenId)).to.equal(otherAccount.address)
        });
    })
})