import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { WordleProvider } from "@/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WordleProvider>
      <App />
    </WordleProvider>
  </React.StrictMode>
);
