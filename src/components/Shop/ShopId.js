import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { fireStore } from "../../firebase/firebase";
import './Shop.css'

const ShopId = (props) => {
  console.log(props, props.match.params);
  const mallId = props.match.params.mallid;
  const shopId = props.match.params.shopid;
  console.log(mallId, shopId);

  // const {mallid, shopid} = useParams()

  // console.log(mallid, shopid);
  const [allMalls, setAllMalls] = useState([]);
  const [mall, setMall] = useState([]);
  const [shop, setShop] = useState([]);

  //! FETCHING SINGLE MALL AND SINGLE SHOP
  useEffect(() => {
    const fetchMall = async () => {
      const fetchedMall = await fireStore.collection("mallInfo").get();
      const malls = [];
      fetchedMall.forEach((mall) =>
        malls.push({
          id: mall.id,
          ...mall.data(),
        })
      );
      const singleMall = malls.filter((x) => x.id === mallId);
      console.log(singleMall[0].shops, malls);
      setAllMalls(malls);
      const shop = singleMall[0].shops.filter((shop) => shop.id === +shopId);
      console.log("Shop", shop);
      setShop(shop);
      setMall(singleMall);
    };
    fetchMall();
    return () => {
      fetchMall();
    };
  }, []);

  return (
    <>
      <div className="container-fluid text-center py-4">
        <div className="container">
          <h1> {shop[0]?.shopName} </h1>
          <h5> {shop[0]?.shopDesc} </h5>
        </div>
      </div>
      <div className="btn-wrapper">
        <button className="btn-add-mall ml-5">Edit Shop</button>
      </div>
      <div className="container-fluid text-center py-4">
        <div className="container d-flex justify-content-between align-items-center">
          {shop[0]?.shopImages.map((img) => (
            <div className="shop-image-container">
              <img src={img.shopImgUrl} alt={img.shopImgId} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withRouter(ShopId);
