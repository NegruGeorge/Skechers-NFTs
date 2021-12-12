const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test setBaseURI function", async function () {
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

    it("should change BaseURI and check it", async () => {
        let baseURI = await nft.baseURI();
        expect(baseURI).to.eq("123")

        await nft.setBaseURI("lala")
        expect(await nft.baseURI()).to.eq("lala");

        await nft.setBaseURI("")
        expect(await nft.baseURI()).to.eq("");
    })


    it("should try and change BaseURI with account != owner", async () => {
        let baseURI = await nft.baseURI();
        expect(baseURI).to.eq("123")

        await interactionNFTAdd1.setBaseURI("lala").then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        baseURI = await nft.baseURI();
        expect(baseURI).to.eq("123")

    })
})