import React from "react";

const ImagePopup = ({ shopImages, setShowPopup }) => {
    console.log(shopImages);
  return (
    <div className="image-popup card-img w-50 shadow">
      <div className="close-popup inline-block">
        {" "}
        <span onClick={() => setShowPopup(null)}>X</span>
      </div>
      <div className="d-flex justify-content-around">
        {shopImages.map((imgItem) => (
          <img
            src={URL.createObjectURL(imgItem)}
            alt=""
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePopup;
