"use client";

import { createContext, useState, useEffect, ReactNode, } from "react";

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
  const [sreenSizeWidth, setSreenSizeWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // Load the theme mode from localStorage when the component mounts
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("themeMode") : null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      // If no mode is stored, default to "light" and store it in localStorage
      localStorage.setItem("themeMode", "light");
    }
  }, []);

  const toggle = () => {
    // setMode((prev) => (prev === "light" ? "dark" : "light"));
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);

    localStorage.setItem("themeMode", newMode);

    if (newMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

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
    setHideSidebar((prev) => !prev);
  };

  // Function to set the screen size width
  useEffect(() => {
    setSreenSizeWidth(window.innerWidth);

    const handleResize = () => {
      setSreenSizeWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sreenSizeWidth]);

  useEffect(() => {
    if (sreenSizeWidth && sreenSizeWidth < 513) {
      setHideSidebar(true);
    } else {
      setHideSidebar(false);
    }
  }, [sreenSizeWidth, setHideSidebar]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle,
        hideSidebar,
        toggleHideSidebar,
        selectedBoard,
        setSelectedBoard,
        screenSizeWidth: sreenSizeWidth,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
