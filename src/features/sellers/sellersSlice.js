import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
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
  sortBy: ["companyName", "asc"],
});

export const getAllSellers = createAsyncThunk(
  "sellers/getAllSellers",
  async () => {
    const response = await axios.get(SELLERS_URL);
    return response.data;
  }
);

export const postNewSeller = createAsyncThunk(
  "sellers/postNewSeller",
  async (data) => {
    const response = await axios.post(SELLERS_URL, data);
    return response.data;
  }
);

export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (ids) => {
    for (let id of ids) {
      await axios.delete(`${SELLERS_URL}/${id}`);
    }
    return ids;
  }
);

export const editSeller = createAsyncThunk(
  "sellers/editSeller",
  async (data) => {
    const { id, updates } = data;
    const response = await axios.patch(`${SELLERS_URL}/${id}`, updates);

    return { ...response.data, id };
  }
);

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    changeSellersSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
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
      })
      .addCase(postNewSeller.fulfilled, (state, action) => {
        state.error = null;
        sellersAdapter.addOne(state, action.payload);
      })
      .addCase(postNewSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        sellersAdapter.removeMany(state, action.payload);
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        sellersAdapter.upsertOne(state, action.payload);
      })
      .addCase(editSeller.rejected, (state, action) => {
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

export const selectSortedSellers = createSelector(
  [selectAllSellers, (state) => state.sellers.sortBy],
  (sellers, criterium) => {
    console.log("CUSTOMERS", criterium);
    if (criterium[1] === "asc") {
      return [...sellers].sort((a, b) =>
        a[criterium[0]]
          .toString()
          .localeCompare(b[criterium[0]].toString(), "en", { numeric: true })
      );
    } else if (criterium[1] === "desc") {
      return [...sellers].sort((a, b) =>
        b[criterium[0]]
          .toString()
          .localeCompare(a[criterium[0]].toString(), "en", {
            numeric: true,
          })
      );
    } else {
      return sellers;
    }
  }
);

export const { changeSellersSort } = sellersSlice.actions;

export default sellersSlice.reducer;
