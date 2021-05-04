import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SelectIsAdmin } from "../../redux/MallSlice";

const Card = (props) => {
  const [showCross, setShowCross] = useState(false);
  console.log(props.shop);

  const isAdmin = useSelector(SelectIsAdmin);
  const handleMallDelete = (id) => {
    console.log("Delete Clicked", id);
  };

  return (
    <div
      className={props?.className}
      onClick={() => props.func(props.id)}
      onMouseOver={() => setShowCross(true)}
      onMouseLeave={() => setShowCross(false)}
    >
      <div className="detail-container">
        <h3> {props?.name}</h3>
        <h4>{props?.address}</h4>
      </div>
      <img src={props?.imgUrl} alt={props?.name} />
      {isAdmin && showCross && (
        <span
          className="delete-on-card"
          onClick={() => handleMallDelete(props.id)}
        >
          X
        </span>
      )}
    </div>
  );
};

// Card.defaultProps ={

// }

export default Card;
