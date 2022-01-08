import React from 'react'
import Navbar from "./Navbar.jsx"
import { Link } from "react-scroll"

function Header() {
    return (
        <div id="main">
            <Navbar />
            <div className="name">
                <h1><span>Sneakers Lovers</span> welcome to our website</h1>
                <p className="details">Grab a seat and prepeare to get the best Sneakers, the MetaSneakers </p>
                <div className="header-btns">
                    <a  className="cv-btn"><Link to="mint" smooth={true} duration={500}>Mint</Link></a>
                    <a className="cv-btn1"><Link to="team" smooth={true} duration={500}>Team</Link></a>

                    {/* <a  href="#mint" smooth={true} duration={500} className="cv-btn">Mint</a>
                    <a  href="#team" smooth={true} duration={500} className="cv-btn1">Team</a> */}

                </div>
            </div>
            <div className='arrow'></div>

        </div>
    )
}

export default Header
