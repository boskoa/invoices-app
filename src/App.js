import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AllProviders from "./AllProviders";
import HomePage from "./components/HomePage";
import PageContainer from "./components/PageContainer";
import MyAppBar from "./components/MyAppBar";
import NavBar from "./components/NavBar";
import Snack from "./components/Snack";
import Loading from "./components/Loading";

const LazyInvoices = lazy(() => import("./features/invoices/Invoices"));
const LazySellers = lazy(() => import("./features/sellers/Sellers"));
const LazyCustomers = lazy(() => import("./features/customers/Customers"));

function App() {
  return (
    <Box sx={{ minWidth: "220px" }}>
      <AllProviders>
        <Router>
          <MyAppBar />
          <NavBar />
          <PageContainer>
            <Routes>
              <Route
                path="/invoices"
                element={
                  <Suspense fallback={<Loading />}>
                    {/*} ubaciti spiner*/}
                    <LazyInvoices />
                  </Suspense>
                }
              >
                <Route
                  path=":id"
                  element={
                    <Suspense fallback={<Loading />}>
                      {/*} ubaciti spiner*/}
                      <LazyInvoices />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/sellers"
                element={
                  <Suspense fallback={<Loading />}>
                    {/*} ubaciti spiner*/}
                    <LazySellers />
                  </Suspense>
                }
              >
                <Route
                  path=":id"
                  element={
                    <Suspense fallback={<Loading />}>
                      {/*} ubaciti spiner*/}
                      <LazySellers />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/customers"
                element={
                  <Suspense fallback={<Loading />}>
                    {/*} ubaciti spiner*/}
                    <LazyCustomers />
                  </Suspense>
                }
              >
                <Route
                  path=":id"
                  element={
                    <Suspense fallback={<Loading />}>
                      {/*} ubaciti spiner*/}
                      <LazyCustomers />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Snack />
          </PageContainer>
        </Router>
      </AllProviders>
    </Box>
  );
}

export default App;
