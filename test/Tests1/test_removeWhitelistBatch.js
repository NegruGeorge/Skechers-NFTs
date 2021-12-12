const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test removeWhitelistBatch function", async function () {
    let nft, deployer, add1, add2, add3, add4;
    let interactionNFTAdd2, interactionNFTAdd1;

    beforeEach("create the contract for testing every it", async () => {
        [deployer, add1, add2, add3, add4] = await hre.ethers.getSigners();
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



    it("should try and removeWhitelistBatch users with another account (not owner)", async () => {

        let addresses = [add2.address, add3.address, add4.address]

        await interactionNFTAdd1.removeWhitelistBatch(addresses).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

    })

    it("should whitelist and remove users and check if whitelisted after that", async () => {
        let state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);
        state = await nft.whitelisted(add3.address);
        expect(state).to.eq(false);
        state = await nft.whitelisted(add4.address);
        expect(state).to.eq(false);

        let addresses = [add2.address, add3.address, add4.address]
        await nft.whitelistBatch(addresses)

        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(true);
        state = await nft.whitelisted(add3.address);
        expect(state).to.eq(true);
        state = await nft.whitelisted(add4.address);
        expect(state).to.eq(true);

        await nft.removeWhitelistBatch(addresses)
        state = await nft.whitelisted(add2.address);
        expect(state).to.eq(false);
        state = await nft.whitelisted(add3.address);
        expect(state).to.eq(false);
        state = await nft.whitelisted(add4.address);
        expect(state).to.eq(false);
    })
    it("should transferOwnership and whitelist after that", async () => {
        let own = await nft.owner();
        expect(own).to.eq(deployer.address);

        let addresses = [add2.address, add3.address, add4.address]
        await interactionNFTAdd1.removeWhitelistBatch(addresses).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })

        await nft.transferOwnership(add1.address);
        own = await nft.owner()
        expect(own).to.eq(add1.address)

        expect(await nft.whitelisted(add2.address)).to.eq(false)
        expect(await nft.whitelisted(add3.address)).to.eq(false)
        expect(await nft.whitelisted(add4.address)).to.eq(false)
        await interactionNFTAdd1.whitelistBatch(addresses);
        expect(await nft.whitelisted(add2.address)).to.eq(true)
        expect(await nft.whitelisted(add3.address)).to.eq(true)
        expect(await nft.whitelisted(add4.address)).to.eq(true)

        await interactionNFTAdd1.removeWhitelistBatch(addresses);
        expect(await nft.whitelisted(add2.address)).to.eq(false)
        expect(await nft.whitelisted(add3.address)).to.eq(false)
        expect(await nft.whitelisted(add4.address)).to.eq(false)


        await nft.removeWhitelistBatch(addresses).then(res => {
            console.log("must throw err")
        }).catch(err => {

            expect(err.message).to.contain("Ownable: caller is not the owner")
        })
    })
})