import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseHeaderBackgroundEnum, ICourse } from "@/models";
import axios from "axios";

// Define mock data
export const mockCourses: ICourse[] = [
  {
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png' ,
    id: 1,
    name: { en: "Mock Course 1", es: "Curso Simulado 1" },
    description: { en: "Description for Mock Course 1", es: "Descripción del Curso Simulado 1" },
    sections: [
      {
        id: 1,
        name: { en: "Mock Section 1" },
        units: [
          {
            id: 1,
            name: { en: "Mock Unit 1" },
            description: { en: "Description for Mock Unit 1" },
            lessons: [],
            count: 0,
            unitColor: CourseHeaderBackgroundEnum.Pink, // Corresponding to Pink in the CourseHeaderBackgroundEnum
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: { en: "Mock Course 2", es: "Curso Simulado 2" },
    description: { en: "Description for Mock Course 2", es: "Descripción del Curso Simulado 2" },
    imageUrl: 'https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png',

    sections: [
      {
        id: 2,
        name: { en: "Mock Section 2" },
        units: [
          {
            id: 2,
            name: { en: "Mock Unit 2" },
            description: { en: "Description for Mock Unit 2" },
            lessons: [],
            count: 0,
            unitColor: CourseHeaderBackgroundEnum.Pink, // Corresponding to Pink in the CourseHeaderBackgroundEnum
          },
        ],
      },
    ],
  },
];

export const fetchCourses = createAsyncThunk<ICourse[]>(
  "courses/fetchCourses",
  async () => {
    console.log('am called')
    try {
      console.log('calling')

      const response = await axios.get("http://192.168.100.8:3000/courses"); // Ensure the endpoint is correct

      // Return the data directly
      console.log('hahaha')
      return response.data; 
    } catch (err: any) {
      // In case of an error, log it and return mock data
      console.error("Error fetching courses, returning mock data:", err);
      // return mockCourses; // Return mock data instead of throwing an error
    }
  },
);
