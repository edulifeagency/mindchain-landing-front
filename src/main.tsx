import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClientProviders } from "./components/ClientProviders";
import TagManager from "react-gtm-module";

TagManager.initialize({ gtmId: "GTM-M7X76KJ8" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProviders>
      <App />
    </ClientProviders>
  </React.StrictMode>,
);
