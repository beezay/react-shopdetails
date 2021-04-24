import React from "react";
import { useSelector } from "react-redux";
import { selectedAllMalls } from "../../redux/MallSlice";
import Malls from "../HomePage/Malls";
import './Details.css'
const MallsDetails = () => {

  const malls = useSelector(selectedAllMalls)

  // console.log(malls[0]);

  return (
    <div className="container mt-5">
      THis is where we show details of Mall
      <div className="container-fluid">
        <div className="mall-info text-center mt-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
          provident!
          <h1> {malls[0].mallName} </h1>
        </div>
        <div className="image-container">
          <div className="detail-container">
          
            <h3>Peoples Plaza</h3>
            <h3>KhichhaPokhari</h3>
          </div>
          {/* <img src="./assets/mall.jfif" alt="" /> */}
        </div>
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col-3 mt-5">
              <div className="image-container">
                <div className="detail-container">
                  <h3>Peoples Plaza</h3>
                  <h3>KhichhaPokhari</h3>
                </div>
                <img src="./assets/mall.jfif" alt="" />
              </div>
            </div>
            <div className="col-3 mt-5">Hello</div>
            <div className="col-3 mt-5">Hello</div>
            <div className="col-3 mt-5">Hello</div>
            <div className="col-3 mt-5">Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallsDetails;
