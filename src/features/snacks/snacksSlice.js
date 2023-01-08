import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const snacksSlice = createSlice({
  name: "snacks",
  initialState,
  reducers: {
    removeSnack: (state) => {
      state.data.open = false;
    },
    sendSnack: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectSnacks = (state) => state.snacks.data;

export const { removeSnack, sendSnack } = snacksSlice.actions;

export default snacksSlice.reducer;
