// GraphQL Schema Types

export interface LocalizedString {
  en: string;
  es: string;
}

export interface ChallengeOption {
  id: number;
  optionText: string;
}

export interface Challenge {
  id: number;
  name: LocalizedString;
  options: ChallengeOption[];
}

export interface Lesson {
  id: number;
  name: LocalizedString;
  challenges: Challenge[];
}

export interface Unit {
  id: number;
  name: LocalizedString;
  lessons: Lesson[];
}

export interface Section {
  id: number;
  name: LocalizedString;
  units: Unit[];
}

export interface Course {
  name: LocalizedString;
  sections: Section[];
}

// GraphQL Query Response Types
export interface GetCourseByIdResponse {
  course: Course;
}

export interface GetCourseByIdVariables {
  id: number;
} 