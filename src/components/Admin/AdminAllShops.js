import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fireStore } from "../../firebase/firebase";
import Card from "../common/Card";
import ShopCard from "../common/ShopCard";
import SearchMall from "../Search/SearchMall";

const AdminAllShops = () => {
  const [malls, setMalls] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const history = useHistory();

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
    return fetchMalls;
  }, []);

  console.log("All Shops=>", allShops);
  console.log("All Malls=>", malls);

  const onChangeSearch = (e) => {
    console.log(e.target.value);
    console.log("AllShops", allShops);
    // let newData = [...malls]
    if (e.target.value) {
      const searchRegex = new RegExp(e.target.value, "gi");
      let searchedShop = allShops.map((shops) => {
        let newShops={...shops};
        newShops.shops = newShops.shops.filter((shop) =>
          shop.shopName.match(searchRegex)
        );
        return newShops;
      });
      console.log("SearchedShop", searchedShop);
      setFilteredShops(searchedShop);
    } else {
      console.log("AllShops", allShops);
      setFilteredShops(malls);
    }
  };

  const handleInfoClick = (shopId, mallId) => {
    console.log(shopId, mallId);
    history.push(`/shop/${mallId}/${shopId}`);
  };

  const handleShopDelete = async (shopId, mallId) => {
    console.log(shopId, mallId);
    const filteredMalls = malls.filter((mall) => mall.id === mallId);
    console.log("Filtered Malls", filteredMalls);
    const remainingShops = filteredMalls[0].shops.filter(
      (shop) => shop.id !== shopId
    );
    console.log("Remaining Shops", remainingShops);
    await fireStore
      .collection("mallInfo")
      .doc(mallId)
      .update({ shops: [...remainingShops] });
  };

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
              <ShopCard
                className="image-container"
                func={handleInfoClick}
                name={shop?.shopName}
                address={shops?.mallName}
                imgUrl={shop?.shopImages[0]?.shopImgUrl}
                key={shop?.id}
                id={shop?.id}
                mallId={shops.mallId}
                // onClick={()=>handleInfoClick(mall.id)}
                onShopDelete={handleShopDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAllShops;
