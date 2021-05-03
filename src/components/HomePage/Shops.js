import React from "react";
import { useHistory } from "react-router";
import Card from "../common/Card";

const Shops = ({ shops }) => {
  const history = useHistory();
  console.log('Shops=> ', shops);
  return (
    <div className="shops-wrapper">
      <div className="shop-heading">
        <h2>SHOPS</h2>
      </div>
      <div className="image-wrapper">
        {shops[0]?.shops.map((shop) => ( 
          <Card
            className="image-container"
            shop={shop}
            name={shop?.shopName}
            imgUrl={shop?.shopImages[0]?.shopImgUrl}
            address={shops.mallName}
            key={shop.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Shops;
