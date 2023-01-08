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

export const postNewCustomer = createAsyncThunk(
  "invoices/postNewCustomer",
  async (data) => {
    const response = await axios.post(CUSTOMERS_URL, data);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "invoices/deleteCustomer",
  async (id) => {
    await axios.delete(`${CUSTOMERS_URL}/${id}`);
    return id;
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
      })
      .addCase(postNewCustomer.fulfilled, (state, action) => {
        customersAdapter.addOne(state, action.payload);
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        customersAdapter.removeOne(state, action.payload);
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
