import { IModule } from "@/models";

export const modulesMock: IModule[] = [
  {
    id: 1,
    name: { en: "Describe a scary hotel", es: "Módulo 1" },
    description: {
      en: "Introduction to TypeScript",
      es: "Introducción a TypeScript",
    },
    imageUrl: "https://example.com/images/module1.png",
    icon: "https://example.com/icons/module1.png",
    lessons: [
      {
        id: 1,
        name: { en: "Lesson 1", es: "Lección 1" },
        description: {
          en: "Getting started with TypeScript",
          es: "Empezando con TypeScript",
        },
        imageUrl: "https://example.com/images/lesson1.png",
        icon: "https://example.com/icons/lesson1.png",
        content: "This is a text content for the lesson.",
        challenges: [
          {
            id: 1,
            name: "Challenge 1",
            description: "This is a task challenge.",
            type: "task",
            content: "Complete the TypeScript setup.",
          },
          {
            id: 2,
            name: "Challenge 2",
            description: "This is an exam challenge.",
            type: "exam",
            content: "Answer the following questions.",
            passingScore: 70,
            questions: [
              {
                id: 1,
                questionText: "What is TypeScript?",
                options: [
                  {
                    id: 1,
                    optionText: "A superset of JavaScript",
                    isCorrect: true,
                  },
                  { id: 2, optionText: "A database", isCorrect: false },
                  { id: 3, optionText: "A CSS framework", isCorrect: false },
                ],
                correctAnswer: "A superset of JavaScript",
              },
              {
                id: 2,
                questionText: "Which company developed TypeScript?",
                options: [
                  { id: 1, optionText: "Google", isCorrect: false },
                  { id: 2, optionText: "Microsoft", isCorrect: true },
                  { id: 3, optionText: "Facebook", isCorrect: false },
                ],
                correctAnswer: "Microsoft",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: { en: "Lesson 2", es: "Lección 2" },
        description: {
          en: "TypeScript basic types",
          es: "Tipos básicos en TypeScript",
        },
        imageUrl: "https://example.com/images/lesson2.png",
        icon: "https://example.com/icons/lesson2.png",
        content: {
          type: "video",
          url: "https://example.com/videos/lesson2.mp4",
        },
        challenges: [],
      },
    ],
    count: 2,
  },
  {
    id: 2,
    name: { en: "Module 2", es: "Módulo 2" },
    description: { en: "Advanced TypeScript", es: "TypeScript Avanzado" },
    imageUrl: "https://example.com/images/module2.png",
    icon: "https://example.com/icons/module2.png",
    lessons: [
      {
        id: 3,
        name: { en: "Lesson 3", es: "Lección 3" },
        description: {
          en: "TypeScript Interfaces",
          es: "Interfaces en TypeScript",
        },
        imageUrl: "https://example.com/images/lesson3.png",
        icon: "https://example.com/icons/lesson3.png",
        content: {
          type: "text",
          url: "https://example.com/lesson3/content",
        },
        challenges: [
          {
            id: 3,
            name: "Challenge 3",
            description: "Create a TypeScript interface.",
            type: "task",
            content:
              "Define an interface for a car with properties like make, model, and year.",
          },
        ],
      },
    ],
    count: 1,
  },
];
