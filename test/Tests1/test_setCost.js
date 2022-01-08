const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test setCost function", async function () {
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

    it("should try and change cost value", async () => {
        let cost = await nft.cost();
        // expect(cost).to.eq(ethers.utils.parseEther("100"));

        await nft.setCost(ethers.utils.parseEther("200"));
        cost = await nft.cost();
        expect(cost).to.eq(ethers.utils.parseEther("200"))

    })


    it("should try and change cost value with account != owner", async () => {
        let cost1 = await nft.cost();
        // expect(cost).to.eq(ethers.utils.parseEther("100"));

        await interactionNFTAdd1.setCost(ethers.utils.parseEther("200")).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        cost = await nft.cost();
        expect(cost).to.eq(cost1)

    })

    it("should test presale mint after price change");

    it("should test mint after price change")
})