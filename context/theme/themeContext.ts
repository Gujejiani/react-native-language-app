import { ThemeType } from "@/models";
import { createContext } from "react";

// Define the Theme Interface
export interface ThemeInterface {
  theme: ThemeType;
  setTheme: () => void;
}

// Set initial theme and toggle function
export const initialTheme: ThemeInterface = {
  theme: "light",
  setTheme: () => {},
};

// Create the Context
export const CustomThemeContext = createContext<ThemeInterface>(initialTheme);
