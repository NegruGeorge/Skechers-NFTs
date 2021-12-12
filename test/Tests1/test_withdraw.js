const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");
const Web3 = require('web3')

const provider = waffle.provider;

describe("Test withdraw function", async function () {
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



    // it("should check balances",async ()=>{
  
    //     let balance =await  provider.getBalance(nft.address)
    //     expect(balance).to.eq("0");

    //     balance = await provider.getBalance(add1.address);
    //     expect(balance).to.eq("10000000000000000000000")

    //     await nft.whitelistUser(add1.address)
    //     await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
    //     expect(await nft.balanceOf(add1.address)).to.eq(5);

    //     balance = await provider.getBalance(nft.address)
    //     expect(balance).to.eq("500000000000000000000")
        

    // });

    // it("should test withdraw after mint",async()=>{
               
    //     balance = await provider.getBalance(add1.address)
    //     expect(balance).to.eq("10000000000000000000000")

    //     await nft.whitelistUser(add1.address)
    //     await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
    //     expect(await nft.balanceOf(add1.address)).to.eq(5);
    //     balance = await provider.getBalance(nft.address)
    //     expect(balance).to.eq("500000000000000000000")

    //     balance = await provider.getBalance(deployer.address)
    //     expect(balance.toString()).to.contain("999")

    //     await nft.withdraw()
    //     balance = await provider.getBalance(nft.address)
    //     expect(balance).to.eq("0")

    //     balance = await provider.getBalance(deployer.address)
    //     expect(balance.toString()).to.contain("10499")

    //     await interactionNFTAdd1.mint(add1.address, 7, { value: ethers.utils.parseEther("700") });
    //     expect(await nft.balanceOf(add1.address)).to.eq(12);

    //     await interactionNFTAdd1.mint(add1.address, 7, { value: ethers.utils.parseEther("700") });
    //     expect(await nft.balanceOf(add1.address)).to.eq(19);
    //     balance = await provider.getBalance(nft.address)
    //     expect(balance).to.eq("1400000000000000000000")

    //     await nft.withdraw()
    //     balance = await provider.getBalance(nft.address)
    //     expect(balance).to.eq("0")

    //     balance = await provider.getBalance(deployer.address)
    //     expect(balance.toString()).to.contain("1899")

    // })
    // it("should try to withdraw with another account",async()=>{
    //     balance = await provider.getBalance(add1.address)
    //     await nft.whitelistUser(add1.address)
    //     await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });

    //     await interactionNFTAdd1.withdraw().then(res=>{
    //         assert.fail("must fail")
    //     }).catch(err=>{
    //         expect(err.message).to.contain("Ownable: caller is not the owner")
    //     })
    // })
    // it("change ownership and try to withdraw after that",async ()=>{
      
    //     await nft.whitelistUser(add1.address)
    //     await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });

    //     await interactionNFTAdd1.withdraw().then(res=>{
    //         assert.fail("must fail")
    //     }).catch(err=>{
    //         expect(err.message).to.contain("Ownable: caller is not the owner")
    //     })
    //     await nft.withdraw();
        

    //     await nft.transferOwnership(add1.address);
    //     await nft.withdraw().then(res=>{
    //         assert.fail("must fail")
    //     }).catch(err=>{
    //         expect(err.message).to.contain("Ownable: caller is not the owner")
    //     })
    //     await interactionNFTAdd1.withdraw();
    // })
})