import { Provider } from "react-redux";
import store from "./app/store";
import { getAllCustomers } from "./features/customers/customersSlice";
import { getAllInvoices } from "./features/invoices/invoicesSlice";
import { getAllSellers } from "./features/sellers/sellersSlice";

store.dispatch(getAllInvoices());
store.dispatch(getAllCustomers());
store.dispatch(getAllSellers());

function AllProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AllProviders;
