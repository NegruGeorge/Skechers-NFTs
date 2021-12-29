import React from 'react'

function Box(props) {
    return (
        <div className="s-box">
            <div className="s-b-img">
                <img src={props.image} alt={props.alte} />
            </div>
            <div className='s-b-text'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt laudantium minus quas aliquid saepe, cum, omnis explicabo iste, expedita voluptas distinctio! Fugit praesentium alias laboriosam ducimus sint, distinctio, veniam, dolore laborum deserunt consequatur amet delectus a esse? Laudantium, deleniti tempore?</p>
                <a href="#" className="cv-btn">{props.button}</a>            
            </div>
        </div>
    )
}
export default Box
