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

    it("should test if a user is whitelisted ", async () => {
        let state = await nft.whitelisted(add1.address);
        expect(state).to.eq(false);

        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false)

        state = await nft.whitelisted(deployer.address);
        expect(state).to.eq(false)

        state = await interactionNFTAdd1.whitelisted(add1.address);
        expect(state).to.eq(false);

        state = await interactionNFTAdd2.whitelisted(add2.address);
        expect(state).to.eq(false)

        state = await interactionNFTAdd1.whitelisted(deployer.address);
        expect(state).to.eq(false)
    })

    it("should try and whitelist users with another account (not owner)", async () => {
        let state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);

        await interactionNFTAdd1.whitelistUser(add2.address).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })
        await interactionNFTAdd1.whitelistUser(add2.address).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

    })

    it("should whitelist user and check if whitelisted after that", async () => {
        let state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);

        nft.whitelistUser(add2.address);
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(true);

        nft.whitelistUser(add2.address);
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(true);

        state = await nft.whitelisted(deployer.address);
        expect(state).to.eq(false)

    })
    it("should transferOwnership and whitelist after that", async () => {
        let own = await nft.owner();
        expect(own).to.eq(deployer.address);

        await interactionNFTAdd1.whitelistUser(add2.address).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        await nft.transferOwnership(add1.address);
        own = await nft.owner()
        expect(own).to.eq(add1.address)

        expect(await nft.whitelisted(add2.address)).to.eq(false)
        await interactionNFTAdd1.whitelistUser(add2.address);
        expect(await nft.whitelisted(add2.address)).to.eq(true)

        await nft.whitelistUser(add1.address).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

    })

    it("should whitelist user, remove it and whitelist again", async () => {
        let state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);

        nft.whitelistUser(add2.address);
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(true);

        nft.removeWhitelistUser(add2.address);
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);

        nft.whitelistUser(add2.address);
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(true);
    })
    

})