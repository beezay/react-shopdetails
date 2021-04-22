import React from "react";
import { useHistory } from "react-router";

const Shops = () => {

  const history = useHistory()

  return (
    <div className="shops-wrapper">
      <div className="shop-heading">
        <h2>SHOPS</h2>
      </div>
      <div className="image-wrapper">
        <div className="image-container">
          <div className="detail-container">
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          <img src="./assets/mall.jfif" alt="" />
        </div>
        <div className="image-container">
          <div className="detail-container">
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          <img src="./assets/mall2.jfif" alt="" />
        </div>
        <div className="image-container">
          <div className="detail-container">
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          <img src="./assets/mall.jfif" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Shops;
