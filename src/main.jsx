import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { TrackingProvider } from "./Context/TrackingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TrackingProvider>
      <App />
    </TrackingProvider>
  </React.StrictMode>
);
