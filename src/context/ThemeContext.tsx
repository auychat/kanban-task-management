"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
type ThemeContextType = {
  mode: string;
  toggle: () => void;
  hideSidebar: boolean;
  toggleHideSidebar: () => void;
};

// Create the context with the default value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState("light");
  const [hideSidebar, setHideSidebar] = useState(false);

  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (mode === "light") document.body.classList.remove("dark");
    else document.body.classList.add("dark");
  }, [mode]);

  // Function to toggle hideSidebar
  const toggleHideSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle, hideSidebar, toggleHideSidebar }}>
      {children}
    </ThemeContext.Provider>
  );
};
