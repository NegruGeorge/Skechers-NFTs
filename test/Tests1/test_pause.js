const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test pause function", async function () {
    let nft, deployer, add1, add2;
    let interactionNFTAdd2, interactionNFTAdd1;

    beforeEach("create the contract for testing every it", async () => {
        [deployer, add1, add2] = await hre.ethers.getSigners();
        const NFT = await ethers.getContractFactory("NFTSkechers");
        nft = await NFT.deploy(
            "CaTest",
            "CTS",
            "123"
        );
        await nft.deployed();

        interactionNFTAdd1 = new ethers.Contract(nft.address, NFTS, add1);
        interactionNFTAdd2 = new ethers.Contract(nft.address, NFTS, add2);
    })

    it("should try and change paused value", async () => {
        let paused = await nft.paused();
        expect(paused).to.eq(false);

        await nft.pause(true);
        expect(await nft.paused()).to.eq(true);

        await nft.pause(false);
        expect(await nft.paused()).to.eq(false);
        await nft.pause(false);
        expect(await nft.paused()).to.eq(false);

        await nft.pause(true);
        expect(await nft.paused()).to.eq(true);
    })

    it("should test mint with paused true");

    it("should test mint with paused false")
})