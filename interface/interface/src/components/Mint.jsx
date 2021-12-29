import React, { useState, useEffect } from 'react'
import imagee from "../images/mint1.png"
import Timer from './Timer'

import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";


function Mint() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain)
    const [feedback, setFeedback] = useState("Let's see what you get :)")
    const [claimingNFt, setClaimingNft] = useState(false);

    const cost = 0.1;
    const maxQuantity = 10;
    const [quantity, setQuantity] = useState(1);


    const claimNFTs = (_amount) => {
        if (_amount <= 0 || _amount > maxQuantity) {
            return;
        }
        setFeedback("Minting your Skecheks...");
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(blockchain.account, _amount)
            .send({
                //285000
                gasLimit: "3000000",
                to: "0xC5841242035A0Fb2C008aF41775720B5DF159211",
                from: blockchain.account,
                value: blockchain.web3.utils.toWei((cost * _amount).toString(), "ether"),
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Something went wrong please try to mint again later. ");
                setClaimingNft(false);
            })
            .then((receipt) => {
                setFeedback(`Nice, you just minted ${_amount}  Skechers !`);
                setClaimingNft(false);

            })


    }

    const addQuantity = (() => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }

    })
    const subQuantity = (() => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    })

    useEffect(() => {

    })

    return (
        <div id="mint">
            <div id="timer">
                <Timer />
            </div>

            <div id="mintAddress">
                <h2>{
                    blockchain.account === "" || blockchain.smartContract === null ? "0x0000000000000000000000000000000000000000":
                                                blockchain.account
                    }</h2>
            </div>

            <div id="mintPage">
                <div className="mint-left">
                    <img src={imagee} alt="mint-left-image" />
                </div>
                <div className="mint-right">
                  
                    <h2>Mint 1 Skecher with 100 Matic</h2>
                    <p>get one and show it to your friends</p>
                    <p>{feedback}</p>
                    {
                        blockchain.account === "" || blockchain.smartContract === null ? (
                            <>
                                <p>Connect to Polygon Mainnet</p>
                                <button id="mint-btn" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(connect());
                                }}>Connect</button>
                                {
                                    blockchain.errorMsg !== "" ? (
                                        <>
                                            <p>{blockchain.errorMsg}</p>
                                        </>
                                    ) :
                                        null
                                }
                            </>

                        ) : (
                            <>
                                <div className="minter">
                                    <button onClick={subQuantity}>-</button>
                                    <h2 id="quantity">{quantity}</h2>
                                    <button onClick={addQuantity}>+</button>
                                </div>
                                <button id="mint-btn" disabled={claimNFTs ? 0 : 1} onClick={(e) => {
                                    e.preventDefault();
                                    claimNFTs(quantity);
                                    console.log("aicia")
                                }}>{claimingNFt ? "WAIT..." : "MINT"}</button>
                            </>
                        )
                    }
                    {/* <p>something went wrong</p> */}
                </div>
            </div>
        </div>
    )
}

export default Mint
