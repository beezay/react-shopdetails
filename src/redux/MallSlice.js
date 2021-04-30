import { createSlice } from "@reduxjs/toolkit";

// const initialState = {};

const mallSlice = createSlice({
  name: "malls",
  initialState: {
    malls: [],
    addedShops: [],
    isAdmin: true,
  },
  reducers: {
    addShops: (state, action) => {
      console.log("Shop Added", action.payload);
      return {
        ...state,
        addedShops: [...state.addedShops, action.payload],
      };
    },

    removeSingleShopImage: (state, action) => {
      console.log("Shop Image Remove", action.payload);
      return {
        ...state,
        addedShops: state.addedShops.map((shop) =>
          shop.id === action.payload.shopId
            ? {
                ...shop,
                shopImages: shop.shopImages.filter(
                  (img) => img.id !== action.payload.imgId
                ),
              }
            : shop
        ),
      };
    },

    removeShops: (state) => {
      return {
        ...state,
        addedShops: [],
      };
    },

    fetchMalls: (state, action) => {
      console.log("Malls Fetched", action.payload);
      return {
        ...state,
        malls: [...state.malls, action.payload],
      };
    },
  },
});

export const {
  fetchMalls,
  addShops,
  removeShops,
  removeSingleShopImage,
} = mallSlice.actions;

export const selectedAllMalls = (state) => state.malls.malls;
export const selectAddedShops = (state) => state.malls.addedShops;

export default mallSlice.reducer;
