import React from "react";
import { useHistory } from "react-router";
import Card from "../common/Card";
import SearchMall from "../Search/SearchMall";

const Malls = ({ allMalls }) => {
  const history = useHistory();

  const handleInfoClick = (mallId) => {
    console.log(mallId);
    history.push(`malls/${mallId}`);
  };

  return (
    <div className="malls-wrapper">
      <div className="mall-heading">
        <h2>MALLS</h2>
        {/* <SearchMall /> */}
      </div>
      <div className="image-wrapper">
        {allMalls.map((mall) => (
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
        {/* <Card className="image-container" func={handleInfoClick} />
        <Card className="image-container" func={handleInfoClick} /> */}
      </div>
    </div>
  );
};

export default Malls;
