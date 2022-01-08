import React from 'react'
import Box from './Box'
import team1 from "../images/team1.jpg"
import team2 from "../images/team2.png"
function Team() {
    return (
        <div id="team">
            <div className="s-heading">
                <h1>Team</h1>
                <p>this is our main Team, the most important people </p>
            </div>
            <div className='b-container'>
                <Box image={team1} name={"Flav"} text={"CEO/CTO of our project. Tech God and artist. Lead the dev team to make the best project in this space."}  alte="poz" button="check"/>
                <Box image={team2} name={"Andrew"} text={"CEO/Marketing-Manager. Best manager in the world, marketing team, money, community, all of this are in his hands."} alte="poz" button="check"/>
            </div>
        </div>
    )
}

export default Team
