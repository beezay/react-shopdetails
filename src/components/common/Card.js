import React from "react";

const Card = (props) => {
  return (
    <div className={props.className} onClick={()=>props.func(props.id)} >
      <div className="detail-container">
        <h3> {props.name}</h3>
        <h4>{props.address}</h4>
      </div>
      <img src={props.imgUrl} alt={props.name} />
    </div>
  );
};

// Card.defaultProps ={

// }

export default Card;
