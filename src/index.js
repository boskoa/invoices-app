import React from "react";
import ReactDOM from "react-dom/client";
import AllProviders from "./AllProviders";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AllProviders>
      <App />
    </AllProviders>
  </React.StrictMode>
);
