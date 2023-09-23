"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { boardsData } from "@/app/pages/api/data.js";
import DarkModeToggle from "./DarkModeToggle";
import { ThemeContext } from "@/context/ThemeContext";

const Sidebar = () => {
  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const {
    mode,
    hideSidebar,
    toggleHideSidebar,
    selectedBoard,
    setSelectedBoard,
  } = context;

  const logoSrc =
    mode === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg";

  useEffect(() => {
    if (selectedBoard === null) {
      setSelectedBoard(boardsData[0].name);
    }
  }, [selectedBoard, setSelectedBoard]);

  return (
    <>
      {!hideSidebar && (
        <div className="bg-white dark:bg-gray-dark min-w-[300px] w-[300px] h-screen flex flex-col justify-between border-1 border-blue-lightest dark:border-gray-medium">
          <div className="flex flex-col gap-8">
            {/* Logo Section */}
            <div className="flex p-8">
              <Image
                src={logoSrc}
                alt="logo"
                width={152}
                height={25}
                className="w-auto h-auto"
              />
            </div>

            {/* Menu Section */}
            <div className="flex flex-col gap-7 p-8 relative">
              <h5 className="text-hs text-gray-light font-bold">
                ALL BOARDS (3)
              </h5>

              {boardsData.map((item, index) => (
                <div
                  className="flex flex-row gap-4 items-center cursor-pointer group"
                  key={index}
                  onClick={() => setSelectedBoard(item.name)}
                >
                  <div
                    className={`absolute h-[48px] w-[276px] rounded-r-full z-0 left-0  ${
                      selectedBoard === item.name
                        ? "bg-purple-dark transition-color duration-300"
                        : "group-hover:bg-purple-dark group-hover:dark:bg-white opacity-10 dark:opacity-100 transition-color duration-300"
                    }`}
                  ></div>

                  <Image
                    src="./assets/icon-board.svg"
                    alt="board-icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 z-10"
                  />
                  <h4
                    className={`text-gray-light text-hm font-bold z-10  ${
                      selectedBoard === item.name
                        ? "text-white"
                        : "group-hover:text-purple-dark group-hover:dark:text-purple-dark"
                    }`}
                  >
                    {item.name}
                  </h4>
                </div>
              ))}

              <div className="flex flex-row gap-4 items-center">
                <Image
                  src="./assets/icon-board.svg"
                  alt="board-icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <h4 className="text-purple-dark text-hm font-bold">
                  + Create New Board
                </h4>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="flex flex-col gap-6">
            {/* Theme DarkMode Toggle */}
            <div className="flex flex-row gap-4 items-center justify-center ">
              <DarkModeToggle />
            </div>

            {/* Hide Sidebar */}
            <div
              className="flex flex-row items-center gap-4 px-8 pb-12 cursor-pointer"
              onClick={toggleHideSidebar}
            >
              <Image
                src="./assets/icon-hide-sidebar.svg"
                alt="hide-icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <h4 className="text-gray-light text-hm font-bold">
                Hide Sidebar
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
