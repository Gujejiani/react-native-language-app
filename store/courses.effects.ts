import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICourse } from "@/models";
import axios from "axios";

export const fetchCourses = createAsyncThunk<ICourse[]>(
  "courses/fetchCourses",
  async () => {
    try {
      const response = await axios.get("http://192.168.100.8:3000/courses"); // Ensure the endpoint is correct

      // Return the data directly
      return response.data; // Return the data directly, which is an array of courses
    } catch (err: any) {
      // Add typing to the error
      console.error("Error fetching courses:", err);
      throw new Error(err.response?.data?.message || "Failed to fetch courses"); // Throw an error to reject the thunk
    }
  },
);
