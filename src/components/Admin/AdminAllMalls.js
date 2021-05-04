import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fireStore } from "../../firebase/firebase";
import Card from "../common/Card";
import SearchMall from "../Search/SearchMall";

const AdminAllMalls = () => {
  const [allMalls, setAllMalls] = useState();
  const [filteredMalls, setFilteredMalls] = useState()
  const [loading, setLoading] = useState(true);

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
      setAllMalls(malls);
      setFilteredMalls(malls)
    };
    fetchMalls();
    setLoading(false);
    return fetchMalls;
  }, []);

  const handleInfoClick = (mallId) => {
    console.log(mallId);
    history.push(`malls/${mallId}`);
  };

  const onChangeSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      const searchRegex = new RegExp(e.target.value, "gi");
      const searchedMall = allMalls.filter((mall) =>
        mall.mallName.match(searchRegex)
      );
      // debugger
      setFilteredMalls(searchedMall);
    } else {
      setFilteredMalls(allMalls);
    }
  };

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>MALLS</h2>
        <SearchMall onchange={onChangeSearch} />
      </div>
      {loading && <h4>LOADING...</h4>}
      {filteredMalls && (
        <div className="image-wrapper">
          {filteredMalls.map((mall) => (
            <Card
              className="image-container"
              func={handleInfoClick}
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
