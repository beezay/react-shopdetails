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
    <div className="container mt-2">
    <div className="d-flex justify-content-between flex-wrap">
    <button className="m-0 btn btn-outline-info">Add Shop</button>
    <button className="m-0 btn btn-outline-success">Edit Mall</button>
    </div>
      {mall.length && (
        <div className="container-fluid m-0">
          <div className="mall-info text-center mt-1">
            <div className="detail-container">
              <h1> {mall[0].mallName} </h1>
              <h3>KhichhaPokhari</h3>
            </div>
          </div>
          <div className="single-mall-image-container">
            <img
              classname="single-mall-image"
              src={mall[0].mallImage.imageUrl}
              alt=""
              // style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-3 mt-5">
                {mall[0].shops &&
                  mall[0].shops.map((shop) => (
                    <div className="image-container">
                      <div className="detail-container">
                        <h3> {shop?.shopName} </h3>
                      </div>
                      <img src={shop?.shopImages[0]?.shopImgUrl} alt="" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MallsDetails;
