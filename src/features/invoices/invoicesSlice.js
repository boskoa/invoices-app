import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const INVOICES_URL = "http://localhost:3001/api/invoices";

const invoicesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = invoicesAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllInvoices = createAsyncThunk(
  "invoices/getAllInvoices",
  async () => {
    const response = await axios.get(INVOICES_URL);
    return response.data;
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.loading = false;
        invoicesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllInvoices,
  selectIds: selectInvoiceIds,
  selectById: selectInvoiceById,
} = invoicesAdapter.getSelectors((state) => state.invoices);

export function selectInvoicesLoading(state) {
  return state.invoices.loading;
}

export function selectInvoicesError(state) {
  return state.invoices.error;
}

export default invoicesSlice.reducer;
