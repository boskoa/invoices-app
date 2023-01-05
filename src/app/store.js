import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/invoicesSlice";
import customersReducer from "../features/customers/customersSlice";
import sellersReducer from "../features/sellers/sellersSlice";
import settingsReducer from "../features/settings/settingsSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    customers: customersReducer,
    sellers: sellersReducer,
    settings: settingsReducer,
  },
});

export default store;
