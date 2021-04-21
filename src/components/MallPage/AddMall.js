import React from "react";
import AddShop from "./AddShop";
import "./AddForm.css";
const AddMall = () => {
  return (
    <>
      <div>This is to add New Mall</div>
      <div className="container">
        <div className="add-mall-form">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please fill up details</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Name of the Mall"
              />
              {/* <label htmlFor="floatingInput">Mall Name</label> */}
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Address"
              />
              {/* <label htmlFor="floatingPassword">Address</label> */}
            </div>

            <div className="form-floating">
              <label htmlFor="file-upload" className="image-add">
                <input id="file-upload" type="file" />
                <span>+</span>
              </label>
            </div>
          </form>
          <AddShop />
          <div className="add-shop">
            <p>
              Add Shop <span>+</span>{" "}
            </p>
          </div>
          <button className="w-100 btn btn-lg btn-outline-primary btn-save" type="submit">
            SAVE MALL
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMall;
