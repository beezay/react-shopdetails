import React, { useState } from "react";
import AddShop from "./AddShop";

import { fireStore, storage } from "../../firebase/firebase";

import "./AddForm.css";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import Alert from "../common/Alert";
import AddedAlert from "../common/AddedAlert";
import { useDispatch } from "react-redux";
const AddMall = ({ history }) => {
  const [shopAdd, setShopAdd] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const imageTypes = ["image/png", "image/jpg", "image/jpeg"];
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleAddShop = () => {
    setShopAdd(true);
  };

  const handleCancelAddMall = () => {
    history.push("/");
  };

  const fileUploadChange = (e) => {
    const mallImage = e.target.files[0];
    if (mallImage && imageTypes.includes(mallImage.type)) {
      setImage(mallImage);
      setImageError("");
      // imageUpload();
    } else {
      setImage("");
      setImageError("Please Select only  PNG/JPG");
    }
  };

  const imageUpload = async () => {
    const uploadTask = storage.ref(`mallImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },

      async () => {
        storage
          .ref("mallImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImageUrl(url);
          });
      }
    );
  };

  const handleMallSubmit = async (data) => {
    await imageUpload();
    console.log(imageUrl);
    const mallData = {
      ...data,
      mallImageUrl: imageUrl,
    };
    
    fireStore.collection("mallInfo").add(mallData);

    setImage(null);
    reset({ defaultValue: "" });
    setShowInfo(true);
    const show = setTimeout(() => {
      setShowInfo(false);
    }, 3000);
  };

  return (
    <>
      <div className="container">
        {showInfo && (
          <AddedAlert title="New Mall has been added Sucessfully!!!" />
        )}
        <div className="add-mall-form">
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
              {image && <p> {image.name} </p>}
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
          <div className="add-shop" onClick={handleAddShop}>
            <p>
              Add Shop <span>+</span>{" "}
            </p>
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
      </div>
    </>
  );
};

export default withRouter(AddMall);
