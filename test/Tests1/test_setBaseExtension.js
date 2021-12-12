const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test setBaseExtension function", async function () {
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

    it("should change BaseExtension and check it", async () => {
        let baseExtension = await nft.baseExtension();
        expect(baseExtension).to.eq(".json")

        await nft.setBaseExtension("lala")
        expect(await nft.baseExtension()).to.eq("lala");

        await nft.setBaseExtension("")
        expect(await nft.baseExtension()).to.eq("");
    })
    it("should try to check a tokenURI after baseExtension changed", async () => {
        let id = 2;
        let tokenURI = await nft.tokenURI(id);
        let baseURI = await nft.baseURI();
        let baseExtension = await nft.baseExtension();

        expect(tokenURI).to.eq(baseURI + id + baseExtension)

        await nft.setBaseExtension("lala")
        expect(await nft.baseExtension()).to.eq("lala");
        tokenURI = await nft.tokenURI(id);

        expect(tokenURI).to.eq("1232lala")
    })

    it("should try and change setBaseExtension with account != owner", async () => {
        let baseExtension = await nft.baseExtension();
        expect(baseExtension).to.eq(".json")

        await interactionNFTAdd1.setBaseExtension("lala").then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        baseExtension = await nft.baseExtension();
        expect(baseExtension).to.eq(".json")

    })
})