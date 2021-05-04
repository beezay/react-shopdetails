import React from "react";
import { useHistory } from "react-router";
import { fireStore, storage } from "../../firebase/firebase";
import Card from "../common/Card";
import SearchMall from "../Search/SearchMall";

const Malls = ({ allMalls, filterMalls }) => {
  const history = useHistory();

  const handleSingleMallClick = (mallId) => {
    console.log(mallId);
    history.push(`malls/${mallId}`);
  };

  const handleSingleMallDelete = async (mallId) => {
    console.log(mallId);
    let confirm = window.confirm("Are you sure to Delete Mall??");
    if (confirm) {
      await fireStore
        .collection("mallInfo")
        .doc(mallId)
        .delete()
        .then(() => console.log("Mall Deleted"));

        // await storage.ref("mallImages").child()
    }
  };

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>MALLS</h2>
      </div>
      <div className="image-wrapper">
        {filterMalls.map((mall) => (
          <Card
            className="image-container"
            func={handleSingleMallClick}
            name={mall.mallName}
            address={mall.mallAddress}
            imgUrl={mall.mallImage.imageUrl}
            key={mall.id}
            id={mall.id}
            onMallDelete={handleSingleMallDelete}
          />
        ))}
        {/* <Card className="image-container" func={handleInfoClick} />
        <Card className="image-container" func={handleInfoClick} /> */}
      </div>
    </div>
  );
};

export default Malls;
