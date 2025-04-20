import { ICourse } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, fetchCourseById, mockCourses } from "./courses.effects";

interface InitialState {
  courses: ICourse[];
  loading: boolean;
  error: null | string;
  activeCourse: ICourse | null;
  activeCourseLoading: boolean;
}
const initialState: InitialState = {
  courses: mockCourses,
  loading: false,
  error: null,
  activeCourse: null,
  activeCourseLoading: false,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourses(state, action: { type: string; payload: ICourse[] }) {
      state.courses = action.payload;
    },
    setActiveCourse(state, action: { type: string; payload: ICourse }) {
      state.activeCourse = action.payload;
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
        console.log(action);
        state.loading = false;
        state.courses = [];
        state.error = action.error.message || "Failed to fetch courses";
        if (mockCourses.length) {
          state.courses = mockCourses;
        }
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.activeCourseLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.activeCourseLoading = false;
        state.activeCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.activeCourseLoading = false;
        state.error = action.error.message || "Failed to fetch course";
        if (action.payload) {
          state.activeCourse = action.payload as ICourse;
        }
      });
  },
});

export const { addCourses, setActiveCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
