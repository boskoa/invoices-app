import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const INVOICES_URL = "http://localhost:3001/api/invoices";

const invoicesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date > a.date,
});

const initialState = invoicesAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllInvoices = createAsyncThunk(
  "invoices/getAllInvoices",
  async () => {
    const response = await axios.get(
      `${INVOICES_URL}?_expand=seller&_expand=customer`
    );
    return response.data;
  }
);

export const postNewInvoice = createAsyncThunk(
  "invoices/postNewInvoice",
  async (data) => {
    const newInvoice = {
      id: data.id,
      date: data.date,
      amount: data.amount,
      customerId: data.customerId,
      sellerId: data.sellerId,
    };
    const response = await axios.post(INVOICES_URL, newInvoice);

    return {
      ...response.data,
      customer: data.customer,
      seller: data.seller,
    };
  }
);

export const editInvoice = createAsyncThunk(
  "invoices/editInvoice",
  async (data) => {
    const { id, updates } = data;
    const toUpdate = {
      date: updates.date,
      amount: updates.amount,
      customerId: updates.customerId,
      sellerId: updates.sellerId,
    };
    const response = await axios.patch(`${INVOICES_URL}/${id}`, toUpdate);

    return {
      ...response.data,
      customer: updates.customer,
      seller: updates.seller,
    };
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id) => {
    await axios.delete(`${INVOICES_URL}/${id}`);
    return id;
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
        const invoices = action.payload.map((i) => ({
          id: i.id,
          date: i.date,
          amount: i.amount,
          customerId: i.customerId,
          sellerId: i.sellerId,
          customer: `${i.customer.name} ${i.customer.surname}`,
          seller: i.seller.companyName,
        }));
        invoicesAdapter.upsertMany(state, invoices);
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postNewInvoice.fulfilled, (state, action) => {
        state.loading = false;
        const invoice = {
          id: action.payload.id,
          date: action.payload.date,
          amount: action.payload.amount,
          customerId: action.payload.customerId,
          sellerId: action.payload.sellerId,
          customer: `${action.payload.customer.name} ${action.payload.customer.surname}`,
          seller: action.payload.seller.companyName,
        };
        invoicesAdapter.addOne(state, invoice);
      })
      .addCase(postNewInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.loading = false;
        const updates = {
          id: action.payload.id,
          date: action.payload.date,
          amount: action.payload.amount,
          customerId: action.payload.customerId,
          sellerId: action.payload.sellerId,
          customer: `${action.payload.customer.name} ${action.payload.customer.surname}`,
          seller: action.payload.seller.companyName,
        };
        invoicesAdapter.upsertOne(state, updates);
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.loading = false;
        invoicesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
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
