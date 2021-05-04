import React from "react";
import { useHistory } from "react-router";
import Card from "../common/Card";

const Shops = ({ shops }) => {
  const history = useHistory();
  console.log("Shops=> ", shops);
  return (
    <div className="shops-wrapper">
      <div className="shop-heading">
        <h2>SHOPS</h2>
      </div>
      <div className="image-wrapper">
        {/* {shops.map((shop) =>
          shop?.shops.map((item) => (
            <Card
              className="image-container"
              shop={item}
              name={item?.shopName}
              imgUrl={item?.shopImages[0]?.shopImgUrl}
              address={shops.mallName}
              key={shop.id}
            />
          ))
        )} */}
        {shops?.map((shop) => (
          <Card
            className="image-container"
            shop={shop}
            name={shop.shops[0]?.shopName}
            imgUrl={shop.shops[0]?.shopImages[0]?.shopImgUrl}
            address={shop.mallName}
            key={shop.mall_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Shops;
