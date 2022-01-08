const { expect, assert } = require("chai");
const { abi: NFTS } = require("../../artifacts/contracts/NFTSkechers.sol/NFTSkechers.json");


describe("Test mint function", async function () {
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

    it("should check balance after the contract dep", async () => {
        let nr = await nft.balanceOf(deployer.address);
        expect(nr).to.eq(10);
        expect(await nft.balanceOf(add1.address)).to.eq(0);
    })

    it("should mint 18 nfts on presale ", async () => {
        expect(await nft.balanceOf(add1.address)).to.eq(0);
        expect(await interactionNFTAdd1.maxMintAmount()).to.eq(10);
        expect(await interactionNFTAdd1.presale()).to.eq(true);
        await interactionNFTAdd1.mint(add1.address, 3).then(res => {
            assert, fail("must fail")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: must be whitelisted")
        })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(0);

        await nft.whitelistUser(add1.address);
        await interactionNFTAdd1.mint(add1.address, 3, { value: ethers.utils.parseEther("300") });
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(3);

        await interactionNFTAdd1.mint(add1.address, 10, { value: ethers.utils.parseEther("1000") });
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(13);

        await interactionNFTAdd1.mint(add1.address, 11, { value: ethers.utils.parseEther("1100") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: mintAmount must be <= maxMintAmount")
        })

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("1000") });
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(18);
    })

    it("should try to mint with the contract on pause", async () => {
        await nft.whitelistUser(add1.address);
        await interactionNFTAdd1.mint(add1.address, 3, { value: ethers.utils.parseEther("300") });
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(3);

        await interactionNFTAdd1.pause(true).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("Ownable: caller is not the owner")
        })
        await nft.pause(true);
        await interactionNFTAdd1.mint(add1.address, 3, { value: ethers.utils.parseEther("300") }).then(res => {
            assert.fail("must fail")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: contract on pause")
        })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(3);

        await nft.pause(false);
        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(8);
        expect(await nft.totalSupply()).to.eq(18)
    })

    it("should try to mint with mintAmount = 0", async () => {
        await nft.whitelistUser(add1.address);
        await interactionNFTAdd1.mint(add1.address, 0, { value: ethers.utils.parseEther("300") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: mintAmount must be > 0")
        })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(0);

    })

    it("should try to mint with mintAmount> maxMintAmount", async () => {
        await nft.whitelistUser(add1.address);
        await interactionNFTAdd1.mint(add1.address, 11, { value: ethers.utils.parseEther("1100") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: mintAmount must be <= maxMintAmount")
        })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(0);
    })

    it("should try to mint and exeed supply", async () => {
        await nft.whitelistUser(add1.address);
        await nft.setmaxMintAmount(200000);
        await interactionNFTAdd1.mint(add1.address, 10001, { value: ethers.utils.parseEther("1100") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: can\'t exceed supply")
        })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(0);
    })

    // it("should mint at presale and exeed presaleSupply", async () => {
    //     await nft.whitelistUser(add1.address);
    //     expect(await nft.cost()).to.eq("100000000000000000000")
    //     await nft.setCost(100)
    //     await interactionNFTAdd1.mint(add1.address, 10, { value: ethers.utils.parseEther("1000") })
    //     expect(await nft.balanceOf(deployer.address)).to.eq(10)
    //     expect(await nft.balanceOf(add1.address)).to.eq(10)

    //     await interactionNFTAdd1.mint(add1.address, 10, { value: ethers.utils.parseEther("1000") }).then(res=>{
    //         assert.fail("must throw err")
    //     }).catch(err=>{
    //         expect(err.message).to.contain("NFTSkechers: supply must be <= presaleSupply")
    //     })

    //     expect(await nft.totalSupply()).to.eq(20)
    //     expect(await nft.presale()).to.eq(true)

    //     await nft.setPresale(false);
    //     expect(await nft.presale()).to.eq(false)

    //     await nft.setmaxMintAmount(100);
    //     await interactionNFTAdd1.mint(add1.address, 70, { value: ethers.utils.parseEther("1000") })
    //     expect(await nft.balanceOf(add1.address)).to.eq(80)

    //     expect(await nft.totalSupply()).to.eq(90)
    //     await nft.setPresale(true);
    //     await interactionNFTAdd1.mint(add1.address, 3, { value: ethers.utils.parseEther("1000") })
    //     expect(await nft.balanceOf(add1.address)).to.eq(90)

    // })

    it("should try and mint for free as an owner", async () => {
        await nft.mint(deployer.address, 4);
        expect(await nft.balanceOf(deployer.address)).to.eq(14)

        expect(await nft.balanceOf(add1.address)).to.eq(0);
        await nft.mint(add1.address, 5);
        expect(await nft.balanceOf(add1.address)).to.eq(5);

        await nft.whitelistUser(add1.address);
        interactionNFTAdd1.mint(add1.address, 5).then(res => {
            assert.fail("must throw err ")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: not enough money to mint")
        })

        await nft.mint(add1.address, 5, { value: ethers.utils.parseEther("14") })
        expect(await interactionNFTAdd1.balanceOf(add1.address)).to.eq(10)
    })
    it("should try to mint and not have enaugh money when presale", async () => {
        await nft.whitelistUser(add1.address);
        await nft.setCost(ethers.utils.parseEther("100"));

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
        expect(await nft.balanceOf(add1.address)).to.eq(5);

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("400") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: not enough money to mint")
        })
    })
    it("should try to mint and not have enaugh money in normal mint", async () => {
        await nft.setPresale(false);
        await nft.whitelistUser(add1.address);
        await nft.setCost(ethers.utils.parseEther("100"));

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
        expect(await nft.balanceOf(add1.address)).to.eq(5);

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("400") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: not enough money to normal mint")
        })
    })
    it("should try to mint with changed price",async ()=>{
        await nft.whitelistUser(add1.address)
        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") });
        expect(await nft.balanceOf(add1.address)).to.eq(5);

        await nft.setCost(ethers.utils.parseEther("200"));
        interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("500") }).then(res => {
            assert.fail("must throw err")
        }).catch(err => {
            expect(err.message).to.contain("NFTSkechers: not enough money to mint")
        })

        await interactionNFTAdd1.mint(add1.address, 5, { value: ethers.utils.parseEther("1000") });
        expect(await nft.balanceOf(add1.address)).to.eq(10);

        await nft.mint(deployer.address,3);
        expect(await nft.balanceOf(deployer.address)).to.eq(13)
    })

})