"use client";

import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const Topbar = () => {
  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar } = context;
  const logoSrc =
    mode === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg";

  return (
    <div className="max-h-[96px] max-w-[1140px] h-full w-screen border-1 border-l-0 border-blue-lightest dark:border-gray-medium bg-white dark:bg-gray-dark flex flex-row justify-between items-center p-6">
      <div className="flex flex-row gap-8 items-center">
        {/* Logo Section */}
        <>
          {hideSidebar && (
            <div className="flex p-8">
              <Image
                src={logoSrc}
                alt="logo"
                width={152}
                height={25}
                className="w-auto h-auto"
              />
            </div>
          )}
        </>
        <h1 className="text-hxl font-bold dark:text-white">Platform Launch</h1>
      </div>
      <div className="flex flex-row gap-6">
        <Button
          radius="full"
          className="bg-purple-dark opacity-25 h-12 w-[164px] text-hm font-bold text-white"
        >
          +Add New Task
        </Button>

        <div className="flex items-center">
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
