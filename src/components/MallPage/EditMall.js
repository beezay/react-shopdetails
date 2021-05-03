import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { fireStore } from "../../firebase/firebase";
import AddedAlert from "../common/AddedAlert";
import Alert from "../common/Alert";
import AddedMallDetails from "./AddedMallDetails";
import AddShop from "./AddShop";
import MallPreview from "./MallPreview";

const EditMall = (props) => {
  const [allMalls, setAllMalls] = useState([]);
  const [mall, setMall] = useState([]);
  const [dbShops, setDbShops] = useState();
  const [image, setImage] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [imageError, setImageError] = useState();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const { id } = useParams();
  console.log("ID", id);

  const imageTypes = ["image/png", "image/jpg", "image/jpeg"];

  useEffect(() => {
    const fetchMalls = async () => {
      const fetchedMalls = await fireStore.collection("mallInfo").get();
      const malls = [];
      fetchedMalls.forEach((mall) =>
        malls.push({
          id: mall.id,
          ...mall.data(),
        })
      );
      const singleMall = malls.filter((x) => x.id === id);
      setAllMalls(malls);
      setDbShops(singleMall[0].shops);
      setMall(singleMall);
      setImage(singleMall[0].mallImage);
      setImgPreview(singleMall[0].mallImage.imageUrl);
    };
    fetchMalls();

    return fetchMalls;
  }, []);

  console.log("Malls", mall, dbShops, allMalls, image);

  const fileUploadChange = (e) => {
    const mallImage = e.target.files[0];

    setImgPreview(URL.createObjectURL(mallImage));
    if (mallImage && imageTypes.includes(mallImage.type)) {
      setImage(mallImage);
      setImageError("");
    } else {
      setImage("");
      setImageError("Please Select only  PNG/JPG");
    }
  };

  const handleMallEditSubmit = (data) => {
    console.log(data);
  };
  const singleMall = mall[0];

  return (
    <>
      This is Edit page
      <div className="container-fluid">
        {/* {showInfo && (
          <AddedAlert title="Mall has been Edited Sucessfully!!!" />
        )} */}
        {mall.length && (
          <div className="row">
            <div className="add-mall-form col-4">
              <form onSubmit={handleSubmit(handleMallEditSubmit)}>
                <h1 className="h3 mb-3 fw-normal">Your Mall Details Here!!!</h1>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="mall-name"
                    placeholder="Name of the Mall"
                    defaultValue={singleMall.mallName}
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
                    defaultValue={singleMall.mallAddress}
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
                  {image && (
                    <MallPreview image={image.imageName} preview={imgPreview} />
                  )}
                  {imageError && (
                    <p className="alert-danger py-2 rounded w-50 m-auto">
                      {" "}
                      {imageError}{" "}
                    </p>
                  )}
                  {errors.mallPic && <Alert title="Image Required!" />}
                </div>
              </form>
              {/* {shopAdd && (
              <AddShop
                setShopAdd={setShopAdd}
                shopDetails={addedShopsDetails}
              />
            )} */}
              {/* <div className="add-shop">
              {shopAdd ? (
                <p className="add-shop-p" onClick={() => handleAddShop(false)}>
                  Cancel{" "}
                </p>
              ) : (
                <p className="add-shop-p" onClick={() => handleAddShop(true)}>
                  Add Shop <span>+</span>{" "}
                </p>
              )}
            </div> */}
              {/* <button
              id="dynamic-btn"
              className={submitBtnClassName}
              type="submit"
              onClick={handleSubmit(handleMallSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "SAVE MALL"}
            </button> */}
              {/* <button
              className="w-100 btn btn-lg btn-outline-warning btn-cancel"
              type="button"
              onClick={handleCancelAddMall}
              disabled={isSubmitting}
            >
              CANCEL
            </button>*/}
            </div>
            {/* {addedShopsDetails.length > 0 && (
            <div className="col-6">
              <AddedMallDetails />
            </div>
          )}*/}
          </div>
        )}
      </div>
    </>
  );
};

export default EditMall;
