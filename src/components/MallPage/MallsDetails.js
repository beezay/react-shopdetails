import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { fireStore } from "../../firebase/firebase";
import { selectedAllMalls } from "../../redux/MallSlice";
import Malls from "../HomePage/Malls";
import "./Details.css";
const MallsDetails = () => {
  const [allMalls, setAllMalls] = useState([]);
  const [mall, setMall] = useState([]);

  useEffect(() => {
    const fetchMalls = async () => {
      const fetchedMalls = await fireStore.collection("mallInfo").get();
      const malls = [];
      fetchedMalls.forEach((mall) =>
        malls.push({
          id: mall.id,
          ...mall.data(),
        })
      );
      const singleMall = malls.filter((x) => x.id === id);
      console.log(singleMall, malls);
      setAllMalls(malls);
      setMall(singleMall);
    };
    fetchMalls();

    return fetchMalls;
  }, []);

  const { id } = useParams();

  console.log(mall, id);

  return (
    <div className="container mt-5">
      THis is where we show details of Mall
      <div className="container-fluid">
        <div className="mall-info text-center mt-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
          provident!
          {mall.length > 0 && <h1> {mall[0].mallName} </h1>}
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
