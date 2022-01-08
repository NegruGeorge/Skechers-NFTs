import React from 'react'
import modelx from "../images/teslaX.png"
import roadmapimg from "../images/roadmap.png"
function RoadMap() {
    return (
        <>
        <h1>about avout</h1>
         <div id="roadMap">
            <div className="roadMap-left">
                <h1>ROADMAP</h1>
                <h2>20% - The Knowledge Giveaway</h2>
                <p>
                    We will give the opportunity to a limited number of holders to benefit of a full step-by-step training with our team and investors to learn and develop the skills to master the NFTs area and to prepare them for the Metaverse. This training it is held once at 6 months in Las Vegas and is spread on 3 days. In 1st of July 2022 will be the 4th meeting since it all started. Just to make an idea, from our last 10 participants, 4 of them passed 6 figures, only by applying what they learned inside those 3 days. Crazy, right?!
                </p>
                <h2>40% - Moving Forward Together</h2>
                <p>A $30,000 fund is available to our Meta Sneakers Club community to ignite our creators to advance the design and development of our Meta Sneakers Club.</p>

                <h2>50% - Expand Your Collection! </h2>
                <p>For the first 50% adopters we will have an airdrop. After the public sale is over and all the Meta Sneakers went to their personal Clubs of holders, we will give back to our first 50% fans. And it`s going to spread like that: </p>
                <p id="prize">1 &#41; Everyone who has MINT 2 to 4 Meta Sneakers from the first 5000, will be given $300 in ETH on their MetaMask Wallet.</p>    
                <p id="prize">2 &#41; Everyone who has MINT 5 to 9 Meta Sneakers from the first 5000, will be given $1000 in ETH on their MetaMask Wallet.</p>
                <p id="prize">3 &#41; Everyone who has MINT 10 to 19 Meta Sneakers from the first 5000, will be given $2000 in ETH on their MetaMask Wallet.</p>
                <p id="prize">4 &#41; Everyone who has MINT 20 Meta Sneakers from the first 5000, will be given $5000 in ETH on their MetaMask Wallet!!!</p>

                <h2>75% -  Party Starter</h2>
                <p>The Meta Sneakers have met up to stroll in the Metaverse! Go along with us on our journey all through the Metaverse as we get back to our Villa on the Sandbox stage where holders will actually want to partake in instructive exercises, private occasions, shows, alongside other fun intelligent and gaming encounters where they will can play and earn extra crypto resources. Our holders will have the inventive power and capacity to assist with concluding what really gets constructed and carried out in our virtual world on the authority Meta Sneakers Club domain by means of The Sandbox Game as we have the joy of working intimately with the authority LandVault level improvement group.</p>

                <h2>90% - New Heights</h2>
                <p>At this point, we already saved a tremendous percentage of money and we are ready to invest it back in marketing and bring brand awareness to the whole NFT and Metaverse space. Here we are talking about $80.000 to be invested in smart marketing which will raise the floor price to unexpected heights!</p>

                <h2>100% - Congratulation to everyone!</h2>
                <p>First we wanna say a big THANK YOU! Then we are delighted to announce our winners:</p>
                <h2 id="tesla">1 &#41; One brand new Tesla Model X</h2>
                <h2 id="rolex">2 &#41; One brand new ROLEX</h2>
                <p id="prize">3 &#41; And last, but not least – 10 lucky holders will be sent to their homes a brand new pair of sneakers by their likes. P.S you are only allowed to pick the most expensive ones! Be greedy here, we want you as happy as we are at the start line. YEP, you heard me good, it is only the beginning. The sold out it is only the fresh new start.</p>
            </div>
            <div className="roadMap-right">
                
               <div id="div-bullets">
               <img id="roadmapimg" src={roadmapimg} alt="roadmapimg" />
               </div>
               <div>
                <img src={modelx} alt="modelX" />
                </div>
             
            </div>
        </div>
        </>
       
    )
}

export default RoadMap
