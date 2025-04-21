import { ICourse } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCourses, fetchCourseById, mockCourses } from "./courses.effects";

interface InitialState {
  courses: ICourse[];
  loading: boolean;
  error: null | string;
  activeCourse: ICourse | null;
  activeCourseId: ICourse['id'] | null;
  activeCourseLoading: boolean;
}
const initialState: InitialState = {
  courses: mockCourses,
  loading: false,
  error: null,
  activeCourse: null,
  activeCourseId: 1,
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
      state.activeCourseId = action.payload.id;
    },
    setActiveCourseId(state, action: PayloadAction<number>) {
      state.activeCourseId = action.payload;
      // Optionally also set the active course object if it exists in the courses array
      const course = state.courses.find(course => course.id === action.payload);
      if (course) {
        state.activeCourse = course;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle fetchCourses
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
      
      // Handle fetchCourseById
      .addCase(fetchCourseById.pending, (state) => {
        state.activeCourseLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.activeCourseLoading = false;
        state.activeCourse = action.payload;
        state.activeCourseId = action.payload.id;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.activeCourseLoading = false;
        state.error = action.error.message || "Failed to fetch course";
        // If payload exists in the rejected action, use it as fallback
        if (action.payload) {
          state.activeCourse = action.payload as ICourse;
          state.activeCourseId = (action.payload as ICourse).id;
        }
      });
  },
});

export const { addCourses, setActiveCourse, setActiveCourseId } = coursesSlice.actions;
export default coursesSlice.reducer;
