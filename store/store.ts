import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "./courses";
import { ICourse } from "@/models";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

export interface RootState {
  courses: {
    courses: ICourse[];
  };
  // Add other slices of state here if needed
}
