import React, { ReactNode, useContext, useState } from "react";
import {
  CustomThemeContext,
  initialTheme,
  ThemeInterface,
} from "./themeContext";
import { ThemeType } from "@/models";

// Props for the Provider
interface ThemeProviderProps {
  children: ReactNode;
  onThemeChange?: (theme: ThemeType) => void; // Optional callback
}

// Custom type for the context
interface CustomThemeContextType {
  theme: ThemeType;
  setTheme: () => void;
}

// Provider Component
export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  onThemeChange,
}) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme.theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    if (onThemeChange) {
      onThemeChange(theme === "dark" ? "light" : "dark"); // Call the callback when theme changes
    }
  };

  return (
    <CustomThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useCustomThemeContext = (): CustomThemeContextType => {
  const context = useContext(CustomThemeContext);

  if (context === undefined) {
    throw new Error(
      "useCustomThemeContext must be used within a CustomThemeProvider",
    );
  }

  return context;
};
