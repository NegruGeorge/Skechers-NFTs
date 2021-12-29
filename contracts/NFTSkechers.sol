// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTSkechers is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.05 ether;

    uint256 public maxSupply = 10000;
    uint256 public presaleSupply = 2000;

    uint256 public maxMintAmount = 10;
    bool public presale = true;
    bool public paused = false;

    mapping(address => bool) public whitelisted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        mint(msg.sender, 10);
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // function mint(address _to, uint256 _mintAmount)
    //     public
    //     payable
    //     nonReentrant
    // {
    //     uint256 supply = totalSupply();
    //     require(!paused);
    //     require(_mintAmount > 0);
    //     require(_mintAmount <= maxMintAmount);
    //     require(supply + _mintAmount <= maxSupply);

    //     if (msg.sender != owner()) {
    //         if (whitelisted[msg.sender] != true) {
    //             require(msg.value >= cost * _mintAmount);
    //         }
    //     }

    //     for (uint256 i = 1; i <= _mintAmount; i++) {
    //         _safeMint(_to, supply + i);
    //     }
    // }

    function mint(address _to, uint256 _mintAmount)
        public
        payable
        nonReentrant
    {
        uint256 supply = totalSupply();
        require(!paused,"NFTSkechers: contract on pause");
        require(_mintAmount > 0,"NFTSkechers: mintAmount must be > 0");
        require(_mintAmount <= maxMintAmount,"NFTSkechers: mintAmount must be <= maxMintAmount");
        require(supply + _mintAmount <= maxSupply,"NFTSkechers: can't exceed supply");

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
                require(msg.value >= cost * _mintAmount,"NFTSkechers: not enough money to mint");
            }

            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(_to, supply + i);
            }
        } else {
            if (msg.sender != owner()) {
                require(msg.value >= cost * _mintAmount,"NFTSkechers: not enough money to normal mint");
            }
            for (uint256 i = 1; i <= _mintAmount; i++) {
                _safeMint(_to, supply + i);
            }
        }
    }

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

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setPresale(bool _state) public onlyOwner {
        presale = _state;
    }

    function whitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = true;
    }

    function whitelistBatch(address[] memory _users) public onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            whitelisted[_users[i]] = true;
        }
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }

    function removeWhitelistBatch(address[] memory _users) public onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            whitelisted[_users[i]] = false;
        }
    }

    function withdraw() public payable onlyOwner nonReentrant {
        // require(payable(msg.sender).send(address(this).balance));
        payable(msg.sender).transfer(address(this).balance);
    }
}
