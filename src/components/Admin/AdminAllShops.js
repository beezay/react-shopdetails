import React, { useEffect, useState } from "react";
import { fireStore } from "../../firebase/firebase";
import Card from "../common/Card";

const AdminAllShops = () => {
  const [malls, setMalls] = useState([]);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

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
      setMalls(malls);
    };
    fetchMalls();
    setIsLoading(false);
    // return fetchMalls;
  }, []);
  console.log("Malls", malls);
  let allMalls = [];
  let allShops = [];
  malls.forEach((mall) =>
    allShops.push({
      mallId: mall.id,
      mallName: mall.mallName,
      shops: mall.shops,
    })
  );
  // setShops(allShops)
  console.log('Shops =>', allShops);

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>Shops</h2>
        {/* <SearchMall /> */}
      </div>
      {/* {loading && <h4>LOADING...</h4>} */}
      {allShops && (
        <div className="image-wrapper">
          {allShops.map((shops) =>
            shops.shops.map((shop) => (
              <Card
                className="image-container"
                //   func={handleInfoClick}
                name={shop?.shopName}
                address={shops?.mallName}
                imgUrl={shop?.shopImages[0]?.shopImgUrl}
                key={shop?.id}
                id={shop?.id}
                // onClick={()=>handleInfoClick(mall.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAllShops;
