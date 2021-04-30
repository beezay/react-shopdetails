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
  const [addShopStatus, setAddShopStatus] = useState(false);

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
    <>
      {addShopStatus && (
        <div className="add-shop-modal">
          <div className="add-shop-wrapper">
            <div className="form-wrapper">
              <p className="close-btn" onClick={()=>setAddShopStatus(false)} >X</p>
              <form>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    defaultValue=""
                    placeholder="Name of the Shop"
                  />
                  {/* <label htmlFor="floatingInput">Mall Name</label> */}
                </div>
                <div className="form-floating">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    defaultValue=""
                    placeholder="Description"
                  />
                  {/* <label htmlFor="floatingPassword">Address</label> */}
                </div>

                <div className="form-floating">
                  <label htmlFor="file-uploads" className="image-add-shop">
                    <input id="file-uploads" type="file" multiple />
                    <span>Upload IMAGEs + </span>
                  </label>
                  <span className="py-0 mt-2 text-info font-weight-light">
                    First Image will be shown as Thumbnail
                  </span>
                </div>
                <button className="btn btn-lg btn-warning mt-2 " type="submit">
                  SAVE SHOP
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-2">
        <div className="d-flex justify-content-between flex-wrap">
          <button
            className="m-0 btn btn-outline-info"
            onClick={() => setAddShopStatus(true)}
          >
            Add Shop
          </button>
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
    </>
  );
};

export default MallsDetails;
