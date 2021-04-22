import React from "react";
import { useHistory } from "react-router";
import SearchMall from "../Search/SearchMall";

const Malls = () => {
  
  const history = useHistory()

  const handleInfoClick = () => {
    history.push('/malls/1');
  }

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>MALLS</h2>
        {/* <SearchMall /> */}
      </div>
      <div className="image-wrapper">
        <div className="image-container" onClick={handleInfoClick} >
          <div className="detail-container">
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          <img src="./assets/mall.jfif" alt="" />
        </div>
        <div className="image-container" onClick={handleInfoClick}>
          <div className="detail-container">
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          <img src="./assets/mall2.jfif" alt="" />
        </div>
        <div className="image-container" onClick={handleInfoClick}>
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

export default Malls;
