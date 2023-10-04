"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
type ThemeContextType = {
  mode: string;
  toggle: () => void;
  hideSidebar: boolean;
  toggleHideSidebar: () => void;
  selectedBoard: string | null;
  setSelectedBoard: (board: string | null) => void;
  screenSizeWidth: number | undefined;
};

// Create the context with the default value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState("light");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [screenSizeWidth, setScreenSizeWidth] = useState<number | undefined>(
    undefined
  );

  // Function to load the theme mode and hideSidebar from localStorage
  useEffect(() => {
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("themeMode") : null;

    const storedHideSidebar =
      typeof window !== "undefined"
        ? localStorage.getItem("hideSidebar")
        : null;

    // Theme part
    if (storedMode) {
      setMode(storedMode);
    } else {
      // If no mode is stored, default to "light" and store it in localStorage
      localStorage.setItem("themeMode", "light");
    }

    if (screenSizeWidth !== undefined) {
      if (screenSizeWidth < 480) {
        setHideSidebar(true);
      } else if (storedHideSidebar !== null) {
        setHideSidebar(storedHideSidebar === "true");
      }
    }
  }, [screenSizeWidth],);

  // Function to toggle the theme mode
  const toggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);

    localStorage.setItem("themeMode", newMode);

    if (newMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // Function to manage the theme mode when it changes
  useEffect(() => {
    // Ensure that the body class matches the current theme mode
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode]);

  // Function to toggle hideSidebar
  const toggleHideSidebar = () => {
    setHideSidebar((prev) => {
      const newValue = !prev;
      localStorage.setItem("hideSidebar", newValue.toString());
      return newValue;
    });
  };

  // Function to set the screen size width
  useEffect(() => {
    setScreenSizeWidth(window.innerWidth);

    const handleResize = () => {
      setScreenSizeWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle,
        hideSidebar,
        toggleHideSidebar,
        selectedBoard,
        setSelectedBoard,
        screenSizeWidth: screenSizeWidth,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
