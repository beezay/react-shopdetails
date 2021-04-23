import { createSlice } from "@reduxjs/toolkit";

// const initialState = {};



const mallSlice = createSlice({
  name: "malls",
  initialState: {
    malls: [],
    isAdmin: true,
  },
  reducers: {
    fetchMalls: (state, action) => {
      console.log("Malls Fetched", action.payload);
      return {
          ...state,
          malls: [...state.malls, action.payload]
      }
    },
  },
});

export const { fetchMalls } = mallSlice.actions;

export const selectedAllMalls = state => state.malls.malls

export default mallSlice.reducer;
