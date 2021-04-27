import React from "react";
import { useHistory } from "react-router";
import Card from "../common/Card";

const Shops = ({ shops }) => {
  const history = useHistory();

  return (
    <div className="shops-wrapper">
      <div className="shop-heading">
        <h2>SHOPS</h2>
      </div>
      <div className="image-wrapper">
        {shops.map((shop) => (
          <Card
            className="image-container"
            shop={shop}
            name={shop.shops.shopName}
            imgUrl={shop.shops.shopImg}
            address={shop.mallName}
            key={shop.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Shops;
