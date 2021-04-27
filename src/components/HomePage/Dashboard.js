import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { selectedAllMalls } from "../../redux/MallSlice";
import SearchMall from "../Search/SearchMall";
import "./Dashboard.css";
import Malls from "./Malls";
import Shops from "./Shops";
const Dashboard = ({ history }) => {
  const allMalls = useSelector(selectedAllMalls);

  const shops = allMalls.map(mall => (
    {
      mall_id: mall.id,
      mallName: mall.mallName,
      shops:mall.shops.map(x => ({
        shopName: x.shopName,
        shopImg: x.shopImages[0]
      }))
    }
  ))

  const handleAddNewMall = () => {
    history.push("/addMall");
  };

  const handleAllMalls = () => {
    history.push("/malls");
  };

  const handleAllShops = () => {
    history.push("/shops");
  };

  return (
    <div className="container-fluid dashboard-wrapper">
      <div className="dashboard-header">
        <div className="btn-wrapper">
          <button className="btn-add-mall" onClick={handleAddNewMall}>
            ADD NEW MALL
          </button>
        </div>
        <SearchMall />
      </div>
      {allMalls.length > 0 ? (
        <div className="wrapper-container malls-container">
          <Malls allMalls={allMalls} />
          <p className="show-more" onClick={handleAllMalls}>
            View All
          </p>
        </div>
      ) : (
        "No Any Malls... Please Add"
      )}

      <div className="wrapper-container shops-container">
        <Shops shops={shops} />
        <p className="show-more" onClick={handleAllShops}>
          View All
        </p>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
