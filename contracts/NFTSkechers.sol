// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTSkechers is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // Prefix for tokens metadata URI
    string public baseURI;

     // Sufix for tokens metadata URIs
    string public baseExtension = ".json";

    //Cost of 1 NFT
    uint256 public cost = 100 ether;

    //Max Supply of NFTs
    uint256 public maxSupply = 10000;

    //Presale supply of NFTs
    uint256 public presaleSupply = 2000;

    // Maximum number of NFTs that can be minted in 1 transaction
    uint256 public maxMintAmount = 10;
    
    // Operator that condition mint in presale stage
    bool public presale = true;

    // Operator that set/unset contract to pause
    bool public paused = false;

    // Operator addresses to which the user is approved to mint in presale period
    mapping(address => bool) public whitelisted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
    }

    /**
     * Internat baseURI getter.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     * Access: all accounts.
     *
     * @param _to address to allocate the minted token to.
     * @param _mintAmount the number of NFTs that msg.sender want to mint
     */
    function mint(address _to, uint256 _mintAmount)
        public
        payable
        nonReentrant
    {
        uint256 supply = totalSupply();
        require(!paused, "NFTSkechers: contract on pause");
        require(_mintAmount > 0, "NFTSkechers: mintAmount must be > 0");
        require(
            _mintAmount <= maxMintAmount,
            "NFTSkechers: mintAmount must be <= maxMintAmount"
        );
        require(
            supply + _mintAmount <= maxSupply,
            "NFTSkechers: can't exceed supply"
        );

        if (presale == true) {
            if (msg.sender != owner()) {
                require(
                    whitelisted[msg.sender] == true,
                    "NFTSkechers: must be whitelisted"
                );
            }

            require(
                supply + _mintAmount <= presaleSupply,
                "NFTSkechers: supply must be <= presaleSupply"
            );
            if (msg.sender != owner()) {
                require(
                    msg.value >= cost * _mintAmount,
                    "NFTSkechers: not enough money to mint"
                );
            }

            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(_to, supply + i);
            }
        } else {
            if (msg.sender != owner()) {
                require(
                    msg.value >= cost * _mintAmount,
                    "NFTSkechers: not enough money to normal mint"
                );
            }
            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(_to, supply + i);
            }
        }
    }

    /**
     * Returns the complete metadata URI for the given tokenId.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    /**
     * Set the cost of 1 NFT
     *
     * Access: only the contract owner account
     *
     !* @param _newCost operator set the new cost !in ether
     */
    function setCost(uint256 _newCost) public onlyOwner {
        require(_newCost >= 1, "_newCost >= 1 ether");
        cost = _newCost * (10 ** 18);
    }

     /**
     * Set the max amount of NFTs that can be minted in 1 transaction
     *
     * Access: only the contract owner account
     *
     * @param _newmaxMintAmount operator set the contract max amount that can be minted
     */
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        require(_newmaxMintAmount >= 1, "_newmaxMintAmount >= 1");
        maxMintAmount = _newmaxMintAmount;
    }

    /**
     * Changes the base URI for token metadata.
     *
     * Access: only the contract owner account.
     *
     * @param _newBaseURI new value
     */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    /**
     * Changes the base extension for token metadata.
     *
     * Access: only the contract owner account.
     *
     * @param _newBaseExtension new value
     */
    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    /**
     * Set contract on pause
     *
     * Access: only the contract owner account
     *
     * @param _state operator set the contract on pause
     */
    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

     /**
     * Turn on/off the contract presale
     *
     * Access: only the contract owner account
     *
     * @param _state operator turn on/off the presale
     */
    function setPresale(bool _state) public onlyOwner {
        presale = _state;
    }

    /**
     * Adds an user address to whitelist
     *
     * Access: only the contract owner account.
     *
     * @param _userAddress address to be whitelisted.
     */
    function whitelistUser(address _userAddress) public onlyOwner {
        whitelisted[_userAddress] = true;
    }

    /**
     * Adds an batch of user addresses to whitelist
     *
     * Access: only the contract owner account.
     *
     * @param _usersAddresses list of addresses for whitelist
     */
    function whitelistBatch(address[] memory _usersAddresses) public onlyOwner {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            whitelisted[_usersAddresses[i]] = true;
        }
    }

    /**
     * Removes an operator address from the whitelist.
     *
     * Access: only the contract owner account.
     *
     * @param _userAddress operator to be removed from the whitelist.
     */
    function removeWhitelistUser(address _userAddress) public onlyOwner {
        whitelisted[_userAddress] = false;
    }

    /**
     * Removes an operator address from the whitelist.
     *
     * Access: only the contract owner account.
     *
     * @param _usersAddresses operator to be removed from the whitelist.
     */
    function removeWhitelistBatch(address[] memory _usersAddresses)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            whitelisted[_usersAddresses[i]] = false;
        }
    }

    /**
     * Withdraw deposited money on contract
     *
     * Access: only the contract owner account.
     * TODO MUST BE CHANGED, not safe
     */
    function withdraw() public payable onlyOwner {
        //require(payable(msg.sender).send(address(this).balance));
        require(address(this).balance > 0, "Balance is 0");
        payable(address(this)).transfer(address(this).balance);
    }

    /**
     * Returns the array of the token ids owned by given address.
     */
    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }
}
