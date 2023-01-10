import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  sorter: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeSorter: (state, action) => {
      state.sorter = action.payload;
    },
  },
});

export function selectCurrentTheme(state) {
  return state.settings.theme;
}

export function selectCurrentSorter(state) {
  return state.settings.sorter;
}

export const { changeTheme, changeSorter } = settingsSlice.actions;

export default settingsSlice.reducer;
