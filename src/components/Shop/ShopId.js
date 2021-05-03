import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, withRouter } from "react-router";
import uuid from "react-uuid";
import { fireStore, storage } from "../../firebase/firebase";
import Alert from "../common/Alert";
import "./Shop.css";

const ShopId = (props) => {
  const mallId = props.match.params.mallid;
  const shopId = props.match.params.shopid;

  // const {mallid, shopid} = useParams()

  // console.log(mallid, shopid);
  const [allMalls, setAllMalls] = useState([]);
  const [mall, setMall] = useState([]);
  const [dbShops, setDbShops] = useState();
  const [shop, setShop] = useState([]);
  const [deleteShop, setDeleteShop] = useState(null);
  const [editShop, setEditShop] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [shopImages, setShopImages] = useState([]);

  //   IMPORTING REACT HOOK FORM
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  //! FETCHING SINGLE MALL AND SINGLE SHOP
  useEffect(() => {
    const fetchMall = async () => {
      const fetchedMall = await fireStore.collection("mallInfo").get();
      const malls = [];
      fetchedMall.forEach((mall) =>
        malls.push({
          id: mall.id,
          ...mall.data(),
        })
      );
      const singleMall = malls.filter((x) => x.id === mallId);
      console.log(singleMall[0].shops, malls);
      setAllMalls(malls);
      const shops = singleMall[0].shops.filter((x) => x.id !== shopId);
      setDbShops(shops);
      const shop = singleMall[0].shops.filter((shop) => shop.id === shopId);
      console.log("Shop", shop, shops);
      setShop(shop);
      setMall(singleMall);
    };
    fetchMall();
  }, []);

  //! Delete SHop Images
  const handleCrossClick = (imgId) => {
    console.log(imgId);
  };

  const handleAddedShopImages = (e) => {
    const shopImagesList = Object.values(e.target.files);
    setShopImages(shopImagesList);
  };

  const shopImageUploads = async () => {
    console.log("ShopImages", shopImages);
    await Promise.all(
      shopImages.map((shopImg) =>
        storage.ref(`shopImages/${shopImg.name}`).put(shopImg)
      )
    );

    const shopImageUrl = await Promise.all(
      shopImages.map((shopImg) =>
        storage.ref("shopImages").child(shopImg?.name).getDownloadURL()
      )
    );
    console.log(shopImageUrl);
    return shopImageUrl;
  };

  //   HANDLING EDIT FORM
  const handleEditShopSubmit = async (data) => {
    const oldShopImages = shop[0].shopImages;
    console.log(oldShopImages);
    setIsSubmitting(true);
    let shopImgArr;
    shopImgArr = await shopImageUploads();
    const addedShopImages = shopImgArr.map((imgUrl) => ({
      shopImgId: uuid(),
      shopImgUrl: imgUrl,
    }));
    // console.log(shopImagesData, "Arr");
    const shopData = {
      ...data,
      id: shopId,
      shopImages: [...oldShopImages, ...addedShopImages],
    };
    await fireStore
      .collection("mallInfo")
      .doc(mallId)
      .update({ shops: [...dbShops, shopData] });
    console.log(shopData, "Data");
    reset();
    setEditShop(false);
    setIsSubmitting(false);

    setShop([shopData]);
  };
  console.log("After Edit => ", shop);
  return (
    <>
      {editShop && (
        <div className="add-shop-modal">
          <div className="add-shop-wrapper">
            <div className="form-wrapper">
              <p className="close-btn" onClick={() => setEditShop(false)}>
                X
              </p>
              <form onSubmit={handleSubmit(handleEditShopSubmit)}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    defaultValue={shop[0]?.shopName}
                    placeholder="Name of the Shop"
                    {...register("shopName", { required: true })}
                  />
                  {/* <label htmlFor="floatingInput">Mall Name</label> */}
                  {errors.shopName && <Alert title="Please write about Shop" />}
                </div>
                <div className="form-floating">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    defaultValue={shop[0]?.shopDesc}
                    placeholder="Description"
                    {...register("shopDesc", { required: true })}
                  />
                  {/* <label htmlFor="floatingPassword">Address</label> */}
                  {errors.shopDesc && <Alert title="Please write about Shop" />}
                </div>

                <div className="form-floating mt-2">
                  <label htmlFor="file-uploads" className="image-add-shop">
                    <input
                      id="file-uploads"
                      type="file"
                      multiple
                      onChange={handleAddedShopImages}
                    />
                    <span>Add IMAGEs + </span>
                  </label>
                  <span className="py-0 mt-2 text-info font-weight-light">
                    First Image will be shown as Thumbnail
                  </span>
                  {shopImages &&
                    shopImages.map((x) => (
                      <p className="text-dark"> {x.name} </p>
                    ))}
                </div>
                <button
                  className="btn btn-lg btn-warning mt-2 "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SAVING..." : "SAVE SHOP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container-fluid text-center py-4">
        <div className="container">
          <h1> {shop[0]?.shopName} </h1>
          <h5> {shop[0]?.shopDesc} </h5>
        </div>
      </div>
      <div className="btn-wrapper">
        <button className="btn-add-mall ml-5" onClick={() => setEditShop(true)}>
          Edit Shop
        </button>
      </div>
      <div className="container-fluid text-center py-4">
        <div className="container d-flex align-items-center shop-container">
          {shop[0]?.shopImages.map((img) => (
            <div
              className="shop-image-container"
              onMouseOver={() => setDeleteShop(true)}
              onMouseLeave={() => setDeleteShop(null)}
              key={img.shopImgId}
            >
              <img src={img.shopImgUrl} alt={img.shopImgId} />
              {deleteShop && (
                <span
                  className="delete-on-card"
                  onClick={() => handleCrossClick(img.shopImgId)}
                >
                  X
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withRouter(ShopId);
