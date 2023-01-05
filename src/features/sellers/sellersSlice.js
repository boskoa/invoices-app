import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const SELLERS_URL = "http://localhost:3001/api/sellers";

const sellersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.companyName.localeCompare(b.companyName),
});

const initialState = sellersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllSellers = createAsyncThunk(
  "sellers/getAllSellers",
  async () => {
    const response = await axios.get(SELLERS_URL);
    return response.data;
  }
);

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        sellersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllSellers,
  selectIds: selectSellersIds,
  selectById: selectSellersById,
} = sellersAdapter.getSelectors((state) => state.sellers);

export function selectSellersLoading(state) {
  return state.customers.loading;
}

export function selectSellersError(state) {
  return state.customers.error;
}

export default sellersSlice.reducer;
