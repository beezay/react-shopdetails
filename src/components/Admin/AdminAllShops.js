import React, { useEffect, useState } from "react";
import { fireStore } from "../../firebase/firebase";
import Card from "../common/Card";
import SearchMall from "../Search/SearchMall";

const AdminAllShops = () => {
  const [malls, setMalls] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const onChangeSearch = (e) => {
    console.log(e.target.value);

    if (e.target.value) {
      // allShops = [];
      const searchRegex = new RegExp(e.target.value, "gi");

      let searchedShop = allShops.map((shops) => {
        shops.shops = shops.shops.filter((shop) =>
          shop.shopName.match(searchRegex)
        );
        return shops;
      });
      // debugger
      console.log("SearchedShop", searchedShop);
      setFilteredShops(searchedShop);
    } else {
      setFilteredShops(allShops);
    }
  };

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
      console.log("Malls", malls);
      let shops = [];
      malls.forEach((mall) =>
        shops.push({
          mallId: mall.id,
          mallName: mall.mallName,
          shops: mall.shops,
        })
      );
      setAllShops(shops);
      setFilteredShops(shops);
      console.log("ALl Shops", allShops);
      setMalls(malls);
    };
    fetchMalls();
    setIsLoading(false);
    // return fetchMalls;
  }, []);
  console.log("Malls", malls);

  // setShops(allShops)
  console.log("Shops =>", allShops);

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>Shops</h2>
        <SearchMall onchange={onChangeSearch} />
      </div>
      {/* {loading && <h4>LOADING...</h4>} */}
      {filteredShops.length && (
        <div className="image-wrapper">
          {filteredShops?.map((shops) =>
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
