const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test tokenURI function", async function () {
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

    it("should check tokenURI", async () => {
        let id = 2;
        let tokenURI = await nft.tokenURI(id);
        let baseURI = await nft.baseURI();
        let baseExtension = await nft.baseExtension();

        expect(tokenURI).to.eq(baseURI + id+ baseExtension)

    })
    it("should try to check a tokenURI for a token that is not minted",async ()=>{
        let id = 200;
        let baseURI = await nft.baseURI();
        let baseExtension = await nft.baseExtension();

        await nft.tokenURI(id).then(res=>{
            assert.fail("must throw err")
        }).catch(err=>{
            expect(err.message).to.contain("ERC721Metadata: URI query for nonexistent token")
        })
        
    })
})