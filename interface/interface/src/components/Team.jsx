import React from 'react'
import Box from './Box'
import poz from "../images/negru.jpg"

function Team() {
    return (
        <div id="team">
            <div className="s-heading">
                <h1>Team</h1>
                <p>this is our Team</p>
            </div>
            <div className='b-container'>
                <Box image={poz} alte="poz" button="check"/>
                <Box image={poz} alte="poz" button="check"/>
            </div>
        </div>
    )
}

export default Team
