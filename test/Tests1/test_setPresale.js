const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test whitelistUser function", async function () {
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

    it("should try and change presale value", async () => {
        let presale = await nft.presale();
        expect(presale).to.eq(true);

        await nft.setPresale(true);
        expect(await nft.presale()).to.eq(true);

        await nft.setPresale(false);
        expect(await nft.presale()).to.eq(false);
        await nft.setPresale(false);
        expect(await nft.presale()).to.eq(false);

        await nft.setPresale(true);
        expect(await nft.presale()).to.eq(true);
    })


    it("should try and change presale value with account != owner", async () => {
        let presale = await nft.presale();
        expect(presale).to.eq(true);

        await interactionNFTAdd1.setPresale(false).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        presale = await nft.presale();
        expect(presale).to.eq(true);

    })

    it("should test mint with presale true");

    it("should test mint with preasle false")
})