import React from "react";

const AddShop = () => {
  return (
    <div className="add-shop-form">
      <div className="top-details">
        <p>SHOPS</p>
        <hr />
      </div>
      <form>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Name of the Shop"
          />
          {/* <label htmlFor="floatingInput">Mall Name</label> */}
        </div>
        <div className="form-floating">
          <textarea
            type="text"
            className="form-control"
            id="floatingPassword"
            placeholder="Description"
          />
          {/* <label htmlFor="floatingPassword">Address</label> */}
        </div>

        <div className="form-floating">
          <label htmlFor="file-upload" className="image-add-shop">
            <input id="file-upload" type="file" />
            <span>Upload IMAGE + </span>
          </label>
        </div>
        <button className="btn btn-lg btn-warning " type="submit">
          SAVE SHOP
        </button>
      </form>
    </div>
  );
};

export default AddShop;
