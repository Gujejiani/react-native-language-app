import { IUnit, CourseHeaderBackgroundEnum } from "@/models";

// Mock Data for ICourses
const modulesMock: IUnit[] = [
  {
    id: 1,
    name: { en: "Basic Syntax", es: "Sintaxis Básica" },
    description: {
      en: "Section 1, lesson 1",
      es: "Aprende la sintaxis básica y características de TypeScript.",
    },
    imageUrl: "https://example.com/module1.png",
    icon: "syntax-icon",
    count: 10,
    unitColor: CourseHeaderBackgroundEnum.Pink,
    lessons: [
      {
        id: 1,
        name: { en: "Getting Started", es: "Empezando" },
        description: {
          en: "Introduction to TypeScript basics.",
          es: "Introducción a los conceptos básicos de TypeScript.",
        },
        content:
          "Learn about TypeScript's basic syntax and how to get started.",
        challenges: [
          {
            id: 1,
            name: "Basic Question",
            description: "Answer this basic TypeScript question.",
            type: "quiz",
            content: "What is TypeScript?",
            passingScore: 80,
            question: "What is TypeScript? JJ",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "A superset of JavaScript",
                isCorrect: true,
              },
              { id: 2, optionText: "A CSS framework", isCorrect: false },
              { id: 3, optionText: "A database language", isCorrect: false },
              { id: 4, optionText: "java type checker", isCorrect: false },
            ],
          },
          {
            id: 2,
            name: "Basic Question",
            description: "Answer this basic TypeScript question.",
            type: "insert-suggestion",
            content: "What is TypeScript? kk",
            passingScore: 80,
            question: "Declare a variable of type number",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "let distance: number",
                isCorrect: true,
              },
              { id: 2, optionText: "let distance = 0;", isCorrect: false },
              { id: 3, optionText: "distance = 100;", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 2,
        name: { en: "Declare a variable of type number", es: "Empezando" },
        description: {
          en: "Introduction to TypeScript basics.",
          es: "Introducción a los conceptos básicos de TypeScript.",
        },
        content:
          "Learn about TypeScript's basic syntax and how to get started.",
        challenges: [
          {
            id: 1,
            name: "Basic Question",
            description: "Answer this basic TypeScript question.",
            type: "insert-suggestion",
            content: "What is TypeScript?",
            passingScore: 80,
            question: "What is TypeScript?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "let distance: number",
                isCorrect: true,
              },
              { id: 2, optionText: "let distance = 0;", isCorrect: false },
              { id: 3, optionText: "distance = 100;", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 3,
        name: { en: "Getting Started", es: "Empezando" },
        description: {
          en: "Introduction to TypeScript basics.",
          es: "Introducción a los conceptos básicos de TypeScript.",
        },
        content:
          "Learn about TypeScript's basic syntax and how to get started.",
        challenges: [
          {
            id: 1,
            name: "Basic Question",
            description: "Answer this basic TypeScript question.",
            type: "task",
            content: "What is TypeScript?",
            passingScore: 80,
            question: "What is TypeScript?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "A superset of JavaScript",
                isCorrect: true,
              },
              { id: 2, optionText: "A CSS framework", isCorrect: false },
              { id: 3, optionText: "A database language", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 4,
        name: { en: "Getting Started", es: "Empezando" },
        description: {
          en: "Introduction to TypeScript basics.",
          es: "Introducción a los conceptos básicos de TypeScript.",
        },
        content:
          "Learn about TypeScript's basic syntax and how to get started.",
        challenges: [
          {
            id: 1,
            name: "Basic Question",
            description: "Answer this basic TypeScript question.",
            type: "task",
            content: "What is TypeScript?",
            passingScore: 80,
            question: "What is TypeScript?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "A superset of JavaScript",
                isCorrect: true,
              },
              { id: 2, optionText: "A CSS framework", isCorrect: false },
              { id: 3, optionText: "A database language", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
    ],
  },
  {
    id: 2,
    name: { en: "Data Types", es: "Tipos de Datos" },
    description: {
      en: "Section 1, lesson 2",
      es: "Comprende el sistema de tipos de TypeScript y los tipos básicos.",
    },
    imageUrl: "https://example.com/module2.png",
    icon: "datatype-icon",
    count: 8,
    unitColor: CourseHeaderBackgroundEnum.LightBlue,
    lessons: [
      {
        id: 2,
        name: { en: "Primitive Types", es: "Tipos Primitivos" },
        description: {
          en: "Learn about primitive types in TypeScript.",
          es: "Aprende sobre los tipos primitivos en TypeScript.",
        },
        content: "Explore basic data types like string, number, and boolean.",
        challenges: [
          {
            id: 2,
            name: "Data Types Question",
            description: "Test your knowledge of TypeScript data types.",
            type: "task",
            content: "Identify the correct TypeScript data type.",
            passingScore: 80,
            question: "What type does 'let count: number = 5;' represent?",
            status: "unlocked",
            options: [
              { id: 1, optionText: "number", isCorrect: true },
              { id: 2, optionText: "string", isCorrect: false },
              { id: 3, optionText: "boolean", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 3,
        name: { en: "Primitive Types", es: "Tipos Primitivos" },
        description: {
          en: "Learn about primitive types in TypeScript.",
          es: "Aprende sobre los tipos primitivos en TypeScript.",
        },
        content: "Explore basic data types like string, number, and boolean.",
        challenges: [
          {
            id: 2,
            name: "Data Types Question",
            description: "Test your knowledge of TypeScript data types.",
            type: "task",
            content: "Identify the correct TypeScript data type.",
            passingScore: 80,
            question: "What type does 'let count: number = 5;' represent?",
            status: "unlocked",
            options: [
              { id: 1, optionText: "number", isCorrect: true },
              { id: 2, optionText: "string", isCorrect: false },
              { id: 3, optionText: "boolean", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 4,
        name: { en: "Primitive Types", es: "Tipos Primitivos" },
        description: {
          en: "Learn about primitive types in TypeScript.",
          es: "Aprende sobre los tipos primitivos en TypeScript.",
        },
        content: "Explore basic data types like string, number, and boolean.",
        challenges: [
          {
            id: 2,
            name: "Data Types Question",
            description: "Test your knowledge of TypeScript data types.",
            type: "task",
            content: "Identify the correct TypeScript data type.",
            passingScore: 80,
            question: "What type does 'let count: number = 5;' represent?",
            status: "unlocked",
            options: [
              { id: 1, optionText: "number", isCorrect: true },
              { id: 2, optionText: "string", isCorrect: false },
              { id: 3, optionText: "boolean", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 5,
        name: { en: "Primitive Types", es: "Tipos Primitivos" },
        description: {
          en: "Learn about primitive types in TypeScript.",
          es: "Aprende sobre los tipos primitivos en TypeScript.",
        },
        content: "Explore basic data types like string, number, and boolean.",
        challenges: [
          {
            id: 2,
            name: "Data Types Question",
            description: "Test your knowledge of TypeScript data types.",
            type: "task",
            content: "Identify the correct TypeScript data type.",
            passingScore: 80,
            question: "What type does 'let count: number = 5;' represent?",
            status: "unlocked",
            options: [
              { id: 1, optionText: "number", isCorrect: true },
              { id: 2, optionText: "string", isCorrect: false },
              { id: 3, optionText: "boolean", isCorrect: false },
            ],
          },
        ],
        status: "unlocked",
      },
    ],
  },
  {
    id: 3,
    name: { en: "Functions and Interfaces", es: "Funciones e Interfaces" },
    description: {
      en: "Section 1, lesson 3",
      es: "Profundiza en funciones e interfaces en TypeScript.",
    },
    imageUrl: "https://example.com/module3.png",
    icon: "functions-icon",
    count: 7,
    unitColor: CourseHeaderBackgroundEnum.LightGreen,
    lessons: [
      {
        id: 3,
        name: { en: "Functions in TypeScript", es: "Funciones en TypeScript" },
        description: {
          en: "Learn how to define and use functions.",
          es: "Aprende a definir y usar funciones.",
        },
        content:
          "Understand how to work with functions in TypeScript, including typed parameters and return types.",
        challenges: [
          {
            id: 3,
            name: "Functions Challenge",
            description: "Test your knowledge of functions in TypeScript.",
            type: "exam",
            content: "Solve these function-related problems.",
            passingScore: 70,
            question: "What is the correct way to define a function type?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "function add(a: number, b: number): number",
                isCorrect: true,
              },
              {
                id: 2,
                optionText: "add(a: string, b: string): void",
                isCorrect: false,
              },
              {
                id: 3,
                optionText: "function add(a, b) -> int",
                isCorrect: false,
              },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 10,
        name: { en: "Functions in TypeScript", es: "Funciones en TypeScript" },
        description: {
          en: "Learn how to define and use functions.",
          es: "Aprende a definir y usar funciones.",
        },
        content:
          "Understand how to work with functions in TypeScript, including typed parameters and return types.",
        challenges: [
          {
            id: 3,
            name: "Functions Challenge",
            description: "Test your knowledge of functions in TypeScript.",
            type: "exam",
            content: "Solve these function-related problems.",
            passingScore: 70,
            question: "What is the correct way to define a function type?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "function add(a: number, b: number): number",
                isCorrect: true,
              },
              {
                id: 2,
                optionText: "add(a: string, b: string): void",
                isCorrect: false,
              },
              {
                id: 3,
                optionText: "function add(a, b) -> int",
                isCorrect: false,
              },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 2,
        name: { en: "Functions in TypeScript", es: "Funciones en TypeScript" },
        description: {
          en: "Learn how to define and use functions.",
          es: "Aprende a definir y usar funciones.",
        },
        content:
          "Understand how to work with functions in TypeScript, including typed parameters and return types.",
        challenges: [
          {
            id: 3,
            name: "Functions Challenge",
            description: "Test your knowledge of functions in TypeScript.",
            type: "exam",
            content: "Solve these function-related problems.",
            passingScore: 70,
            question: "What is the correct way to define a function type?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "function add(a: number, b: number): number",
                isCorrect: true,
              },
              {
                id: 2,
                optionText: "add(a: string, b: string): void",
                isCorrect: false,
              },
              {
                id: 3,
                optionText: "function add(a, b) -> int",
                isCorrect: false,
              },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 4,
        name: { en: "Functions in TypeScript", es: "Funciones en TypeScript" },
        description: {
          en: "Learn how to define and use functions.",
          es: "Aprende a definir y usar funciones.",
        },
        content:
          "Understand how to work with functions in TypeScript, including typed parameters and return types.",
        challenges: [
          {
            id: 4,
            name: "Functions Challenge",
            description: "Test your knowledge of functions in TypeScript.",
            type: "exam",
            content: "Solve these function-related problems.",
            passingScore: 70,
            question: "What is the correct way to define a function type?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "function add(a: number, b: number): number",
                isCorrect: true,
              },
              {
                id: 2,
                optionText: "add(a: string, b: string): void",
                isCorrect: false,
              },
              {
                id: 3,
                optionText: "function add(a, b) -> int",
                isCorrect: false,
              },
            ],
          },
        ],
        status: "unlocked",
      },
      {
        id: 6,
        name: { en: "Functions in TypeScript", es: "Funciones en TypeScript" },
        description: {
          en: "Learn how to define and use functions.",
          es: "Aprende a definir y usar funciones.",
        },
        content:
          "Understand how to work with functions in TypeScript, including typed parameters and return types.",
        challenges: [
          {
            id: 3,
            name: "Functions Challenge",
            description: "Test your knowledge of functions in TypeScript.",
            type: "exam",
            content: "Solve these function-related problems.",
            passingScore: 70,
            question: "What is the correct way to define a function type?",
            status: "unlocked",
            options: [
              {
                id: 1,
                optionText: "function add(a: number, b: number): number",
                isCorrect: true,
              },
              {
                id: 2,
                optionText: "add(a: string, b: string): void",
                isCorrect: false,
              },
              {
                id: 3,
                optionText: "function add(a, b) -> int",
                isCorrect: false,
              },
            ],
          },
        ],
        status: "unlocked",
      },
    ],
  },
];

export default modulesMock;
