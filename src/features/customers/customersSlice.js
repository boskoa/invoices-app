import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const CUSTOMERS_URL = "http://localhost:3001/api/customers";

const customersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.surname.localeCompare(b.surname),
});

const initialState = customersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    const response = await axios.get(CUSTOMERS_URL);
    return response.data;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        customersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllCustomers,
  selectIds: selectCustomerIds,
  selectById: selectCustomerById,
} = customersAdapter.getSelectors((state) => state.customers);

export function selectCustomersLoading(state) {
  return state.customers.loading;
}

export function selectCustomersError(state) {
  return state.customers.error;
}

export default customersSlice.reducer;
