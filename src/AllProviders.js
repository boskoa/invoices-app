import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import store from "./app/store";
import { getAllCustomers } from "./features/customers/customersSlice";
import { getAllInvoices } from "./features/invoices/invoicesSlice";
import { getAllSellers } from "./features/sellers/sellersSlice";
import { darkTheme, lightTheme } from "./themes";
import { selectCurrentTheme } from "./features/settings/settingsSlice";

store.dispatch(getAllInvoices());
store.dispatch(getAllCustomers());
store.dispatch(getAllSellers());

function AllProviders({ children }) {
  const theme = useSelector(selectCurrentTheme);

  return (
    <ThemeProvider
      theme={theme === "light" ? lightTheme : darkTheme}
      enableColorScheme
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AllProviders;
