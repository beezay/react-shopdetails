import React, { useEffect, useState } from "react";
import { fireStore } from "../../firebase/firebase";
import Card from "../common/Card";

const AdminAllMalls = () => {
  const [allMalls, setAllMalls] = useState();
  const [loading, setLoading] = useState(true)

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
      setAllMalls(malls);
    };
    fetchMalls();
    setLoading(false)
    return fetchMalls;
  }, []);

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>MALLS</h2>
        {/* <SearchMall /> */}
      </div>
      {loading && <h4>LOADING...</h4> }
      {allMalls && (
        <div className="image-wrapper">
          {allMalls.map((mall) => (
            <Card
              className="image-container"
              // func={handleInfoClick}
              name={mall.mallName}
              address={mall.mallAddress}
              imgUrl={mall.mallImage.imageUrl}
              key={mall.id}
              id={mall.id}
              // onClick={()=>handleInfoClick(mall.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllMalls;
