import React from "react";
import { withRouter } from "react-router";
import SearchMall from "../SearchMall";
import "./Dashboard.css";
import Malls from "./Malls";
import Shops from "./Shops";
const Dashboard = ({ history }) => {
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
      <div className="malls-container">
        <Malls history={history} />
        <p className="show-more" onClick={handleAllMalls}>
          View All
        </p>
      </div>
      <div className="shops-container">
        <Shops history={history} />
        <p className="show-more" onClick={handleAllShops}>View All</p>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
