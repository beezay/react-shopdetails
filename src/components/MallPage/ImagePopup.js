import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeSingleShopImage, selectAddedShops} from '../../redux/MallSlice'

const ImagePopup = ({ shopImages, setShowPopup, shopId }) => {
  const [hoverStatus, setHoverStatus] = useState(false);

  console.log(shopImages);

  const dispatch  = useDispatch()

  const addedShops = useSelector(selectAddedShops)

  const handleMouseevent = (status) => {};

  const handleShopImageDelete = (imgId) => {

    console.log(shopId, imgId);
    // const data = addedShops.map(shop => {
    //   if(shop.id === shopId) {}
    // })


    dispatch(removeSingleShopImage({imgId, shopId}))
  }

  return (
    <div className="image-popup card-img w-50 shadow">
      <div className="close-popup inline-block">
        {" "}
        <span onClick={() => setShowPopup(null)}>X</span>
      </div>
      <div className="d-flex justify-content-around">
        {shopImages.map((imgItem) => (
          <div className="shop-image-popup-container">
            <img
              src={URL.createObjectURL(imgItem.shopImgUrl)}
              alt=""
              className="shop-image-popup"
              onMouseEnter={() => handleMouseevent(true)}
              onMouseLeave={() => handleMouseevent(false)}
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            />
            <span className="remove-shop-image" onClick={()=>handleShopImageDelete(imgItem.id)} >X</span>
          </div>
        ))}

        {hoverStatus && <span className="remove-shop-image">X</span>}
      </div>
    </div>
  );
};

export default ImagePopup;
