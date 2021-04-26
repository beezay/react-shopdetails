import React, { useState } from "react";
import AddShop from "./AddShop";

import { fireStore, storage } from "../../firebase/firebase";

import "./AddForm.css";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import Alert from "../common/Alert";
import AddedAlert from "../common/AddedAlert";
import { useDispatch } from "react-redux";
import AddedMallDetails from "./AddedMallDetails";
import MallPreview from "./MallPreview";
const AddMall = ({ history }) => {
  const [finalData, setFinalData] = useState({});
  const [shopAdd, setShopAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const imageTypes = ["image/png", "image/jpg", "image/jpeg"];
  const dispatch = useDispatch();
  const {
    register,

    formState: { errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm();

  // const input = watch();
  // console.log(getValues());

  const handleAddShop = (val) => {
    if(shopAdd) {
      setShopAdd(val);
    }
    setShopAdd(val);
  };

  const handleCancelAddMall = () => {
    history.push("/");
  };

  const fileUploadChange = (e) => {
    const mallImage = e.target.files[0];
    console.log(mallImage);
    setImgPreview(URL.createObjectURL(mallImage));
    if (mallImage && imageTypes.includes(mallImage.type)) {
      setImage(mallImage);
      setImageError("");
      // imageUpload();
    } else {
      setImage("");
      setImageError("Please Select only  PNG/JPG");
    }
  };

  const handleMallSubmit = async (data) => {
    await storage.ref(`mallImages/${image.name}`).put(image);
    const imgUrl = await storage
      .ref("mallImages")
      .child(image.name)
      .getDownloadURL();

    const mallData = {
      ...data,
      mallImage: {
        imageUrl: imgUrl,
        imageName: image.name,
      },
    };
    setFinalData((prev) => ({
      ...prev,
      ...mallData
    }));
    console.log(finalData);

    fireStore.collection("mallInfo").add(finalData);

    setImage(null);
    reset({ defaultValue: "" });
    setShowInfo(true);
    const show = setTimeout(() => {
      setShowInfo(false);
    }, 5000);
  };

  return (
    <>
      <div className="container-fluid">
        {showInfo && (
          <AddedAlert title="New Mall has been added Sucessfully!!!" />
        )}
        <div className="row">
          <div className="add-mall-form col-4">
            <form onSubmit={handleSubmit(handleMallSubmit)}>
              <h1 className="h3 mb-3 fw-normal">Please fill up details</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="mall-name"
                  placeholder="Name of the Mall"
                  defaultValue=""
                  {...register("mallName", { required: true })}
                />
                {/* <label htmlFor="floatingInput">Mall Name</label> */}
                {errors.mallName && <Alert title="Mall Name is Required!" />}
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="mall-address"
                  placeholder="Address"
                  defaultValue=""
                  {...register("mallAddress", { required: true })}
                />
                {/* <label htmlFor="floatingPassword">Address</label> */}
                {errors.mallAddress && <Alert title="Address Required!" />}
              </div>

              <div className="form-floating">
                <label htmlFor="file-upload" className="image-add">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={fileUploadChange}
                    // {
                    //   ...register("mallPic", {required:true})
                    // }
                  />
                  <span>+</span>
                </label>
                {image && <MallPreview image={image} preview={imgPreview} /> }
                {imageError && (
                  <p className="alert-danger py-2 rounded w-50 m-auto">
                    {" "}
                    {imageError}{" "}
                  </p>
                )}
                {errors.mallPic && <Alert title="Image Required!" />}
              </div>
            </form>
            {shopAdd && <AddShop setShopAdd={setShopAdd} />}
            <div className="add-shop">
              {shopAdd ? <p className="add-shop-p" onClick={() => handleAddShop(false)}>
                Cancel{" "}
              </p> : <p className="add-shop-p" onClick={() => handleAddShop(true)} >
                Add Shop <span>+</span>{" "}
              </p>}
            </div>
            <button
              className="w-100 btn btn-lg btn-outline-primary btn-save"
              type="submit"
              onClick={handleSubmit(handleMallSubmit)}
            >
              SAVE MALL
            </button>
            <button
              className="w-100 btn btn-lg btn-outline-warning btn-cancel"
              type="button"
              onClick={handleCancelAddMall}
            >
              CANCEL
            </button>
          </div>
          {/* <div className="col-6">
            <AddedMallDetails />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default withRouter(AddMall);
