import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faDiscord, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"




function Socials() {
    return (
        <div id="socials">
            <h1>Follow us on: </h1>
            <a className="social" href="https://discord.gg/jraVKBQ8kK"><FontAwesomeIcon icon={faFacebook} size="3x" /></a>
            <a className="social" href="https://twitter.com/MetaSneakersC"><FontAwesomeIcon icon={faTwitter} size="3x" /></a>
            <a className="social" href="https://discord.gg/jraVKBQ8kK"><FontAwesomeIcon icon={faDiscord} size="3x" /></a>
            <a className="social" href="https://www.instagram.com/metasneakersclub"><FontAwesomeIcon icon={faInstagram} size="3x" /></a>

        
        </div>
    )   
}

export default Socials
