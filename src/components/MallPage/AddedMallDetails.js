import React from "react";

const AddedMallDetails = () => {
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
          <tr className="table">
            <th scope="row">New Shop</th>
            <td>Mobile Shop for All</td>
            <tr className="d-flex flex-column">
              <td>Image Preview</td>
              <td>Image Preview</td>
              <td>Image Preview</td>
            </tr>

            <td>
              <i className="fas fa-trash" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AddedMallDetails;
