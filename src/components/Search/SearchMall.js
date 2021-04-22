import React from "react";
import "./Search.css";
const SearchMall = () => {
  return (
    <div className="search">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search Mall..."
        />
        {/* <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button> */}
      </form>
    </div>
  );
};

export default SearchMall;
