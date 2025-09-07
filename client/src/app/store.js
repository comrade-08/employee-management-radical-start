// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice.js";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
