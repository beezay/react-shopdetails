import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { SelectIsAdmin, selectedAllMalls } from "../../redux/MallSlice";
import SearchMall from "../Search/SearchMall";
import "./Dashboard.css";
import { fireStore } from "../../firebase/firebase";
import { fetchMalls } from "../../redux/MallSlice";
import Malls from "./Malls";
import Shops from "./Shops";
const Dashboard = ({ history }) => {
  // const allMalls = useSelector(selectedAllMalls);

  const [allMalls, setAllMalls] = useState([]);
  const [filteredMalls, setFilteredMalls] = useState([]);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();

  const isAdmin = useSelector(SelectIsAdmin);

  useEffect(() => {
    const fetchMalls = async () => {
      setLoading(true);
      const fetchedMalls = await fireStore.collection("mallInfo").get();
      const malls = [];
      fetchedMalls.forEach((mall) =>
        malls.push({
          id: mall.id,
          ...mall.data(),
        })
      );
      setFilteredMalls(malls.slice(malls.length - 3));
      setAllMalls(malls);
    };
    fetchMalls();
    setLoading(false);
    return fetchMalls;
  }, []);

  const onChangeSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      const searchRegex = new RegExp(e.target.value, "gi");
      const searchedMall = allMalls.filter((mall) =>
        mall.mallName.match(searchRegex)
      );
      // debugger
      console.log("SearchedMall", searchedMall);
      console.log("allMalls", allMalls);
      setFilteredMalls(searchedMall);
    } else {
      setFilteredMalls(allMalls.slice(allMalls.length - 3));
    }
  };

  const shops = filteredMalls.map((mall) => ({
    mall_id: mall.id,
    mallName: mall.mallName,
    shops: mall.shops,
  }));

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
        {loading && <p>Loading...</p>}
        <div className="btn-wrapper">
          {isAdmin && (
            <button className="btn-add-mall" onClick={handleAddNewMall}>
              ADD NEW MALL
            </button>
          )}
        </div>
        <SearchMall onchange={onChangeSearch} />
      </div>
      {allMalls.length > 0 ? (
        <div className="wrapper-container malls-container">
          <Malls allMalls={allMalls} filterMalls={filteredMalls} />
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
