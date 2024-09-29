import { ICourse } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  courses: ICourse[];
}
const initialState: InitialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourses(state, action: { type: string; payload: ICourse[] }) {
      state.courses = action.payload;
    },
  },
});

export const { addCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
