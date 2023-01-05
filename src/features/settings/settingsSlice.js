import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = settingsSlice.actions;

export const selectCurrentTheme = (state) => state.settings.theme;

export default settingsSlice.reducer;
