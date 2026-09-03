import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClientProviders } from "./components/ClientProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProviders>
      <App />
    </ClientProviders>
  </React.StrictMode>,
);
