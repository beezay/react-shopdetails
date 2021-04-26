import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addShops } from "../../redux/MallSlice";
import Alert from "../common/Alert";

const AddShop = ({ setShopAdd, shopDetails }) => {

  console.log(shopDetails);

  const [images, setImages] = useState();

  const dispatch = useDispatch();

  const handleCloseShopAdd = () => {
    setShopAdd(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleShopImageAdd = (e) => {
    // console.log(e.target.files);

    const imageList = Object.values(e.target.files);
    console.log(imageList);
    setImages(imageList);
  };

  const handleShopSubmit = (data) => {
    const id = Date.now();
    console.log("Shop Added", images);
    const shopData = {
      id: id,
      ...data,
      shopImages: [...images],
    };
    dispatch(addShops(shopData));
    setShopAdd(false);
    reset({ defaultValue: "" });
  };

  return (
    <div className="add-shop-form">
      <div className="top-details">
        <div className="top-header">
          <p>SHOPS</p>
          <p className="close-btn" onClick={handleCloseShopAdd}>
            X
          </p>
        </div>
        <hr />
      </div>
      <form onSubmit={handleSubmit(handleShopSubmit)}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            defaultValue=""
            placeholder="Name of the Shop"
            {...register("shopName", { required: true })}
          />
          {/* <label htmlFor="floatingInput">Mall Name</label> */}
          {errors.shopName && <Alert title="Shop Name is Required!!" />}
        </div>
        <div className="form-floating">
          <textarea
            type="text"
            className="form-control"
            id="floatingPassword"
            defaultValue=""
            placeholder="Description"
            {...register("shopDesc", { required: true })}
          />
          {/* <label htmlFor="floatingPassword">Address</label> */}
          {errors.shopDesc && <Alert title="Please write about Shop" />}
        </div>

        <div className="form-floating">
          <label htmlFor="file-uploads" className="image-add-shop">
            <input
              id="file-uploads"
              type="file"
              multiple
              onChange={handleShopImageAdd}
            />
            <span>Upload IMAGEs + </span>
          </label>
          <span className="py-0 mt-2 text-info font-weight-light">
            First Image will be shown as Thumbnail
          </span>
        </div>
        <button className="btn btn-lg btn-warning mt-2 " type="submit">
          SAVE SHOP
        </button>
      </form>
    </div>
  );
};

export default AddShop;
