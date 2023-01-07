import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/invoicesSlice";
import customersReducer from "../features/customers/customersSlice";
import sellersReducer from "../features/sellers/sellersSlice";
import settingsReducer from "../features/settings/settingsSlice";
import snacksReducer from "../features/snacks/snacksSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    customers: customersReducer,
    sellers: sellersReducer,
    settings: settingsReducer,
    snacks: snacksReducer,
  },
});

export default store;
