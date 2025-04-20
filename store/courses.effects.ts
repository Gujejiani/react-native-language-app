import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseHeaderBackgroundEnum, ICourse } from "@/models";
import axios from "axios";
import { client } from "@/utils/graphql/client";
import { GET_COURSE_BY_ID, GET_COURSES_WHOLE_INFO, GetCourseByIdResponse, GetCoursesWholeInfoResponse } from "@/utils/graphql/queries/course";

// Define mock data
export const mockCourses: ICourse[] = [
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/027/127/463/original/javascript-logo-javascript-icon-transparent-free-png.png",
    id: 1,
    name: { en: "Mock Course 1", es: "Curso Simulado 1" },
    description: {
      en: "Description for Mock Course 1",
      es: "Descripción del Curso Simulado 1",
    },
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
    description: {
      en: "Description for Mock Course 2",
      es: "Descripción del Curso Simulado 2",
    },
    imageUrl:
      "https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png",

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.query<GetCoursesWholeInfoResponse>({
        query: GET_COURSES_WHOLE_INFO
      });

      // Transform the GraphQL response to match your ICourse interface
      const transformedCourses: ICourse[] = response.data.courses.map((course, index) => ({
        id: index + 1, // Generate an ID if not provided by API
        name: course.name,
        description: { en: "", es: "" }, // Default description
        sections: course.sections.map((section) => ({
          id: section.id,
          name: section.name,
          units: section.units.map((unit) => ({
            id: unit.id,
            name: unit.name,
            description: { en: "", es: "" },
            lessons: unit.lessons.map((lesson) => ({
              id: lesson.id,
              name: lesson.name,
              description: { en: "", es: "" },
              content: "",
              status: "unlocked",
              challenges: lesson.challenges.map((challenge) => ({
                id: challenge.id,
                name: challenge.name.en, // Use English name as default
                description: "Challenge from API",
                type: "quiz", // Default type
                content: "",
                question: "",
                status: "unlocked",
                options: challenge.options.map(option => ({
                  id: option.id,
                  optionText: option.optionText,
                  isCorrect: false // Default, to be updated with real data
                }))
              }))
            })),
            count: unit.lessons.length,
            unitColor: CourseHeaderBackgroundEnum.Pink
          }))
        }))
      }));

    
      return transformedCourses;
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      return rejectWithValue(mockCourses);
    }
  },
);

export const fetchCourseById = createAsyncThunk<ICourse, number>(
  "courses/fetchCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await client.query<GetCourseByIdResponse>({
        query: GET_COURSE_BY_ID,
        variables: { id }
      });

      const course = response.data.course;
      
      // Transform GraphQL response to match ICourse interface
      const transformedCourse: ICourse = {
        id,
        name: course.name,
        description: { en: "", es: "" },
        sections: course.sections.map((section) => ({
          id: section.id,
          name: section.name,
          units: section.units.map((unit) => ({
            id: unit.id,
            name: unit.name,
            description: { en: "", es: "" },
            lessons: unit.lessons.map((lesson) => ({
              id: lesson.id,
              name: lesson.name,
              description: { en: "", es: "" },
              content: "",
              status: "unlocked",
              challenges: lesson.challenges.map((challenge) => ({
                id: challenge.id,
                name: challenge.name.en, // Use English name as the default name
                description: "Challenge from API", // Default description
                type: "quiz", // Default type
                content: "",
                question: "",
                status: "unlocked",
                options: challenge.options.map(option => ({
                  id: option.id,
                  optionText: option.optionText,
                  isCorrect: false // Default, to be updated with real data
                }))
              }))
            })),
            count: unit.lessons.length,
            unitColor: CourseHeaderBackgroundEnum.Pink
          }))
        }))
      };

      return transformedCourse;
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      // Instead of returning mock data, properly use rejectWithValue
      const fallbackCourse = mockCourses.find(course => course.id === id) || mockCourses[0];
      return rejectWithValue(fallbackCourse);
    }
  }
);
