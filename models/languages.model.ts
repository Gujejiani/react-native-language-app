export interface ILanguages {
    languages: ILanguage[];
}

interface ILanguage {
    id: number;
    name: LocalizedString;
    description: LocalizedString;
    imageUrl?: string;
    icon?: string;
    modules: IModule[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface IModule {
    id: number;
    name: LocalizedString;
    description: LocalizedString;
    imageUrl?: string;
    icon?: string;
    lessons: ILesson[];
    count: number;
}

interface ILesson {
    id: number;
    name: LocalizedString;
    description: LocalizedString;
    imageUrl?: string;
    icon?: string;
    content: string | MultimediaContent;
    challenges: IChallenge[]; // Unified concept for tasks and exams
}

interface IChallenge {
    id: number;
    name: string;
    description: string;
    type: 'task' | 'exam'; // Type of challenge
    content: string | MultimediaContent; // Content or instructions
    passingScore?: number; // Optional, only for 'exam' type challenges
    questions?: IQuestion[]; // Optional, only for 'exam' type challenges
}

interface IQuestion {
    id: number;
    questionText: string;
    options: IOption[]; // Possible answers for multiple-choice questions
    correctAnswer: string; // The correct answer
}

interface IOption {
    id: number;
    optionText: string; // Text of the answer option
    isCorrect: boolean; // Indicates if this option is the correct one
}

interface MultimediaContent {
    type: 'text' | 'video' | 'audio';
    url: string;
}

interface LocalizedString {
    en: string;
    es?: string;
    // add other languages as needed
}
