import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "./courses";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
