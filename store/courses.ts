import { ICourse } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, mockCourses } from "./courses.effects";

interface InitialState {
  courses: ICourse[];
  loading: boolean;
  error: null | string;
}
const initialState: InitialState = {
  courses: mockCourses,
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourses(state, action: { type: string; payload: ICourse[] }) {
      state.courses = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
        // state.courses = action.payload
      });
  },
});

export const { addCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
