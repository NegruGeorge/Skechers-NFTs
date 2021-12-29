import React from 'react'
import imagee from "../images/sneakers.PNG"
import { Link } from "react-scroll"

function OurStory() {
    return (
        <div id="features">
            <div className="features-model">
                <img src={imagee} alt="feature-image" />
            </div>
            <div className="features-text">
                <h2>The Story Behind Everything...</h2>
                <h3> <span> MetaSneakersClub</span> is our manifesto and passion for <span>Sneakers</span></h3>
                <p>It all began back in 90s. Even if I was just a little boy, I knew I was so so different from all the other kids. I already knew that I am much better at projecting the future and observing the little details which made the big difference. I immersed myself in music and in this culture. At some point, I did observe that every great musician has a dressing room almost as big as half of the house I grew up in. But the thing that changed my perspective and obsessed me was that, over 70% of that dressing room was filled with goddamn sneakers! I was amazed! I so wanted to enter one of the villas I`ve seen in the videos.</p>
                <p>The years passed by and I documented a lot about unspoken human rules. Almost all of them took me back to the shoe we are wearing. How shiny they are, how clean, how expensive, how high, how low, how colorful, how comfortable and so on. Unfortunately, my parents told me what to do, what to study and what to become. Right at the begging of 2000, if you were around 14 y/o as I was, you couldn`t do much, you just had to listen and please your parents. Even if I didn`t make it to Harvard, I managed to graduate Cambridge and fortunately got a well-paid boring job. Yuhhuu for me. Nevertheless, I kept pursuing my passion for sneakers and met a lot of people who shared the same ideas with me. </p>
                <p>Fast forward, thanks to the technology nowadays, and special thanks to Gary Vee, I was lucky enough to hear and learn about NFTs at the very begging of this. Being part of the BAYC and holding two CrytpoPunks, then flipping them for money, making a 7 figures profit, did not fill the hole inside me. It just made me realize that money isn`t my life goal, but people I know and what we CREATE TOGETHER.</p>
                <p>Right now, after months of hard work and intense planning, I feel UNSTOPPABLE! My team and I are ready to prepare the next generation of young Metaverse enthusiasts to taste the feeling of living their full potential. TOGETHER, alongside Sandbox team, we are going to build the biggest VILLA in the Metaverse space! Exactly one like those I`ve seen on the big screens when I was just a little boy. I bet you once heard about The White House, where the President of United States lives. Imagine yourself inside something like that, but x4 bigger and x10 more enjoyable. The VILLA we are about to create is gonna be the new White House of Metaverse! Private parties, private shows, endless airdrops, biggest artist joining us to talk about your, about YOUR brand new Meta Sneakers and asking you how they can join the CLUB. Offering you x10 the price just to have it bought from you. Private meetings held all over the world with our holders and biggest fans. And this is only 1% of what we are about to do in the next few years.</p>
                <p>If you are a visionary, as we are in the Meta Sneakers Club team, stick with us for the future you were too afraid to dream of. If you are more like a flipper, it`s fine, just prepare for a couple of airdrops and a rise of the floor right before public sale. Already know what`s gonna be because the best secrets are never spoken. Let`s build together and meet WEALTHIER than ever at the VILLA! </p>
                <button ><Link to="team" smooth={true} duration={500}>View the team</Link></button>
            </div>
         
        </div>
    )
}

export default OurStory
