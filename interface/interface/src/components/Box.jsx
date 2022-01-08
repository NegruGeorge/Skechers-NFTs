import React from 'react'

function Box(props) {
    return (
        <div className="s-box">
            <div className="s-b-img">
                <img src={props.image} alt={props.alte} />
            </div>
            <div className='s-b-text'>
                <p id="box-name" >{props.name}</p>
                <p>{props.text}</p>
               
              
            </div>
        </div>
    )
}
export default Box
