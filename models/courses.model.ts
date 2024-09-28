export interface ICourses {
  languages: ICourse[];
}

export interface ICourse {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  imageUrl?: string;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;
  sections: ISection[];
}

export interface ISection {
  id: number;
  name: LocalizedString;
  units: IUnit[];
}

export interface IUnit {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  modules: IModule[];
}

export interface IModule {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  imageUrl?: string;
  icon?: string;
  lessons: ILesson[];
  count: number;
  moduleColor: CourseBackground;
}

export interface ILesson {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  imageUrl?: string;
  icon?: string;
  content: string | MultimediaContent;
  challenges: IChallenge[]; // Unified concept for tasks and exams

  status: LessonStatus;
}

export type LessonStatus = "locked" | "unlocked" | "completed";

export interface IChallenge {
  id: number;
  name: string;
  description: string;
  type: "task" | "exam" | "quiz" | "insert-suggestion";
  content: string | MultimediaContent;
  passingScore?: number;
  question: string;
  status: ChallengeStatus;

  options: IOption[];
}

export type ChallengeStatus = "locked" | "unlocked" | "completed";

export interface IOption {
  id: number;
  optionText: string; // Text of the answer option
  isCorrect: boolean; // Indicates if this option is the correct one
}

interface MultimediaContent {
  type: "text" | "video" | "audio";
  url: string;
}

interface LocalizedString {
  en: string;
  es?: string;
  // add other languages as needed
}

export type CourseBackground = CourseHeaderBackgroundEnum;

export enum CourseHeaderBackgroundEnum {
  Pink = "#D81B60",
  LightBlue = "#1E3A8A",
  LightGreen = "#2F855A",
  LightCoral = "#C53030",
  Purple = "#6B46C1",
  Orange = "#D97706",
  Teal = "#2C7A7B",
}
