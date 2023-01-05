import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProviders from "./AllProviders";
import store from "./app/store";
import HomePage from "./components/HomePage";
import MyAppBar from "./components/MyAppBar";

const LazyInvoices = lazy(() => import("./features/invoices/Invoices"));
const LazySellers = lazy(() => import("./features/sellers/Sellers"));
const LazyCustomers = lazy(() => import("./features/customers/Customers"));

function App() {
  console.log("STORE FROM APP", store.getState());
  return (
    <Box sx={{ minWidth: "220px" }}>
      <AllProviders>
        <MyAppBar />
        <Router>
          <Routes>
            <Route
              path="/invoices"
              element={
                <Suspense fallback="Loading...">
                  {/*} ubaciti spiner*/}
                  <LazyInvoices />
                </Suspense>
              }
            />
            <Route
              path="/sellers"
              element={
                <Suspense fallback="Loading...">
                  {/*} ubaciti spiner*/}
                  <LazySellers />
                </Suspense>
              }
            />
            <Route
              path="/customers"
              element={
                <Suspense fallback="Loading...">
                  {/*} ubaciti spiner*/}
                  <LazyCustomers />
                </Suspense>
              }
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </AllProviders>
    </Box>
  );
}

export default App;
