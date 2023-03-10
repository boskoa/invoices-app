import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
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
  sortBy: ["name", "asc"],
});

export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    const response = await axios.get(CUSTOMERS_URL);
    return response.data;
  }
);

export const postNewCustomer = createAsyncThunk(
  "customers/postNewCustomer",
  async (data) => {
    const response = await axios.post(CUSTOMERS_URL, data);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (ids) => {
    for (let id of ids) {
      await axios.delete(`${CUSTOMERS_URL}/${id}`);
    }
    return ids;
  }
);

export const editCustomer = createAsyncThunk(
  "customers/editCustomer",
  async (data) => {
    const { id, updates } = data;
    const response = await axios.patch(`${CUSTOMERS_URL}/${id}`, updates);

    return { ...response.data, id };
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    changeCustomersSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        customersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postNewCustomer.fulfilled, (state, action) => {
        state.error = null;
        customersAdapter.addOne(state, action.payload);
      })
      .addCase(postNewCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        customersAdapter.removeMany(state, action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        customersAdapter.upsertOne(state, action.payload);
      })
      .addCase(editCustomer.rejected, (state, action) => {
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

export const selectSortedCustomers = createSelector(
  [selectAllCustomers, (state) => state.customers.sortBy],
  (customers, criterium) => {
    if (criterium[1] === "asc") {
      return [...customers].sort((a, b) =>
        a[criterium[0]]
          .toString()
          .localeCompare(b[criterium[0]].toString(), "en", { numeric: true })
      );
    } else if (criterium[1] === "desc") {
      return [...customers].sort((a, b) =>
        b[criterium[0]]
          .toString()
          .localeCompare(a[criterium[0]].toString(), "en", {
            numeric: true,
          })
      );
    } else {
      return customers;
    }
  }
);

export const { changeCustomersSort } = customersSlice.actions;

export default customersSlice.reducer;
