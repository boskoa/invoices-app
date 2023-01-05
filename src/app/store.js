import { configureStore } from "@reduxjs/toolkit";
import invoices from "../features/invoices/invoicesSlice";
import customers from "../features/customers/customersSlice";
import sellers from "../features/sellers/sellersSlice";

const store = configureStore({
  reducer: {
    invoices,
    customers,
    sellers,
  },
});

export default store;
