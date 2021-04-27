import React, { useState } from "react";
import ImagePopup from "./ImagePopup";

const AddedMallDetails = ({ addedShopsDetails }) => {
  const [showPopup, setShowPopup] = useState(null);

  const handleImagePopup = (id) => {
    setShowPopup(id);
    // setTimeout(() => {
    //   setShowPopup(false);
    // }, 3000);
  };

  return (
    <>
      <div className="d-flex justify-content-around align-items-center">
        <div className="mall-details">
          <h3>MallName</h3>
          <cite>Mall Address</cite>
        </div>
        <div className="mall-preview">Image here</div>
      </div>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col">Shop Name</th>
            <th scope="col">Shop Details</th>
            <th scope="col" rowSpan="3">
              Shop Image
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {addedShopsDetails.map((shop) => (
            <tr className="table">
              <th scope="row">{shop.shopName}</th>
              <td>{shop.shopDesc}</td>
              <tr className="d-flex flex-column">
                <td
                  onClick={() => handleImagePopup(shop.id)}
                  className="image-show"
                >
                  {" "}
                  {shop.shopName} Images
                </td>
                {showPopup === shop.id && (
                  <ImagePopup
                    shopImages={shop.shopImages}
                    setShowPopup={setShowPopup}
                  />
                )}
              </tr>

              <td>
                <i className="fas fa-trash shop-delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};

export default AddedMallDetails;
