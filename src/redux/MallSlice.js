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
        malls: [...state.malls,action.payload],
      };
    },
  },
});

export const { fetchMalls, addShops, removeShops } = mallSlice.actions;

export const selectedAllMalls = (state) => state.malls.malls;
export const selectAddedShops = (state) => state.malls.addedShops;

export default mallSlice.reducer;
