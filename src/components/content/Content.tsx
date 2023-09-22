"use client";

import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const Content = () => {
  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar } = context;

  return (
    <div className="relative max-w-[1140px] h-[calc(100vh-96px)] bg-blue-lighter dark:bg-gray-darker flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-hl font-bold text-gray-light">
          This board is empty. Create a new column to get started.
        </h2>
        <Button
          radius="full"
          className="bg-purple-dark h-12 w-[164px] text-hm font-bold text-white"
        >
          +Add New Column
        </Button>
      </div>

      {/* Absolute position for the  */}
      {hideSidebar && (
        <div
          className="absolute bottom-8 left-0 cursor-pointer bg-purple-dark dark:bg-purple-light h-[48px] w-[56px] flex items-center justify-center rounded-r-full"
          onClick={toggleHideSidebar}
        >
          <Image
            src="./assets/icon-show-sidebar.svg"
            alt="show-sidebar-icon"
            width={16}
            height={16}
            className="w-[16px] h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Content;
