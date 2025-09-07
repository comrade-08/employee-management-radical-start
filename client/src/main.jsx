import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/react-hot-toast/dist/"
import "react-calendar/dist/Calendar.css";
import "./css/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
