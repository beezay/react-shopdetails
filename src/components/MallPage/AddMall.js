import React, { useState } from "react";
import AddShop from "./AddShop";
import firebase from "../../Firebase/firebase";
import "./AddForm.css";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
const AddMall = ({ history }) => {
  const [shopAdd, setShopAdd] = useState(false);
  const [mallName, setMallName] = useState("");
  const [mallAddress, setMallAddress] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddShop = () => {
    setShopAdd(true);
  };

  const handleCancelAddMall = () => {
    history.push("/");
  };

  // const handleOnChange = (e) => {
  // }

  const handleMallSubmit = data => {
    console.log(data);

    const fireStore = firebase.database().ref("/mallInfo");

    fireStore.push(data);
    // console.log(mallName, mallAddress);
    //Clearing the Form
    // setMallName('')
    // setMallAddress('')
  };

  return (
    <>
      <div className="container">
        <div className="add-mall-form">
          <form onSubmit={handleSubmit(handleMallSubmit)}>
            <h1 className="h3 mb-3 fw-normal">Please fill up details</h1>
            <div className="form-floating">
              {/* <input
                type="text"
                className="form-control"
                id="mall-name"
                placeholder="Name of the Mall"
                value={mallName}
                onChange={(e)=> setMallName(e.target.value) }
              /> */}
              <input
                type="text"
                className="form-control"
                id="mall-name"
                placeholder="Name of the Mall"
                defaultValue=""
                {...register("mallName", { required: true })}
              />
              {/* <label htmlFor="floatingInput">Mall Name</label> */}
              {errors.mallName && <p className=" mt-3 alert-warning" > Name Required</p>}
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
              {errors.mallAddress && <p className="mt-3 alert-warning">Address Required</p>}
            </div>

            <div className="form-floating">
              <label htmlFor="file-upload" className="image-add">
                <input id="file-upload" type="file" />
                <span>+</span>
              </label>
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
