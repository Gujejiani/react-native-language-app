import { gql } from '@apollo/client';
import { GetCourseByIdResponse, GetCourseByIdVariables } from '../schema';

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: Int!) {
    course(id: $id) {
      name {
        en
        es
      }
      sections {
        id
        name {
          en
          es
        }
        units {
          id
          name {
            en
            es
          }
          lessons {
            name {
              en
              es
            }
            id
            challenges {
              name {
                en
                es
              }
              id
              options {
                id
                optionText
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COURSES_WHOLE_INFO = gql`
  query GetCoursesWholeInfo {
    courses {
      name {
        en
        es
      }
      sections {
        id
        name {
          en
          es
        }
        units {
          id
          name {
            en
            es
          }
          lessons {
            name {
              en
              es
            }
            id
            challenges {
              name {
                en
                es
              }
              id
              options {
                id
                optionText
              }
            }
          }
        }
      }
    }
  }
`;

// Export types for this query
export type { GetCourseByIdResponse, GetCourseByIdVariables };

// Types for the GetCoursesWholeInfo query
export interface GetCoursesWholeInfoResponse {
  courses: Array<{
    name: {
      en: string;
      es: string;
    };
    sections: Array<{
      id: number;
      name: {
        en: string;
        es: string;
      };
      units: Array<{
        id: number;
        name: {
          en: string;
          es: string;
        };
        lessons: Array<{
          id: number;
          name: {
            en: string;
            es: string;
          };
          challenges: Array<{
            id: number;
            name: {
              en: string;
              es: string;
            };
            options: Array<{
              id: number;
              optionText: string;
            }>;
          }>;
        }>;
      }>;
    }>;
  }>;
} 