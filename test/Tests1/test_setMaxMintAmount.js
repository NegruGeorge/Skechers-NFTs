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

    it("should check maxMintAmount", async () => {
        let maxMintAmount = await nft.maxMintAmount();
        expect(maxMintAmount).to.eq(10);

    })

    it("should check change maxMintAmount", async () => {
        let maxMintAmount = await nft.maxMintAmount();
        expect(maxMintAmount).to.eq(10);

        await nft.setmaxMintAmount(20);
        expect(await nft.maxMintAmount()).to.eq(20);

        await nft.setmaxMintAmount(-20).then(res=>{
            assert.faill("must throw err")
        }).catch(err=>{
            expect(err.message).to.contain("value out-of-bounds")
        })

    })

    it("should test mint after change maxMintAmount");

})