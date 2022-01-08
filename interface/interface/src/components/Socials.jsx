import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faDiscord, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

import sandbox from "../images/sandbox.png"
import polygon from "../images/polygon.png"
import binance from "../images/binance.png"


function Socials() {
    return (
        <div id="socials">
            <h3>Sponsors: </h3>
            <div id="sponsors">
            <img id="sanbox-img" src={sandbox} alt="sanbox" />
            <img id="polygon-img" src={polygon} alt="polygon" />
            <img id="binance-img" src={binance} alt="binance" />
            </div>

            <h1>Follow us on: </h1>
            <a className="social" href="https://twitter.com/MetaSneakersC"><FontAwesomeIcon icon={faTwitter} size="3x" /></a>
            <a className="social" href="https://discord.gg/jraVKBQ8kK"><FontAwesomeIcon icon={faDiscord} size="3x" /></a>
            <a className="social" href="https://www.instagram.com/metasneakersclub"><FontAwesomeIcon icon={faInstagram} size="3x" /></a>

        
        </div>
    )   
}

export default Socials
