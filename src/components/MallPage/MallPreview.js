import React from "react";

const MallPreview = ({ image, preview }) => {
  console.log(image);
  return (
    <div className="text-center">
      <div
        className="card"
        style={{
          borderRadius: "50%",
          height: "150px",
          width: "150px",
          //   backgroundImage: `url(${preview})`
        }}
      >
        {" "}
        <img
          src={preview}
          alt=""
          style={{ height: "150px", width: "150px", borderRadius: "50%" }}
        />
      </div>
      <p className="mt-2"> {image.name} </p>
    </div>
  );
};

export default MallPreview;
