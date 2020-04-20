import React from "react"

function CityComponent(props){
    return(
        <div>
            <h3>{props.item.country + "     " + props.item.city}</h3>
            <img src={props.item.image} alt="something"></img>
            <p>{props.item.description}</p>
            <p>Rating: {props.item.rating}</p>
        </div>
    )
    
}

export default CityComponent