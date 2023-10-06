"use client";

import Image from "next/image";
import React, { use, useContext, useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { ThemeContext } from "@/context/ThemeContext";
import AddBoardModal from "../modal/AddBoardModal";
import { BoardContext } from "@/context/BoardContext";

const Sidebar = () => {
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);

  const { boards, selectedBoard, setSelectedBoard } = useContext(BoardContext);

  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar } = context;

  // const logoSrc =
  //   mode === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg";

  useEffect(() => {
    if (selectedBoard === null && boards.length > 0) {
      setSelectedBoard(boards[0].name);
    }
  }, [selectedBoard, setSelectedBoard, boards]);


  // Handle the New Board modal open
  const handleModalOpen = () => {
    setIsNewBoardModalOpen(true);
  };

  // Handle the New Board modal close
  const handleModalClose = () => {
    setIsNewBoardModalOpen(false);
  };

  return (
    <>
      {!hideSidebar && (
        <div className="bg-white dark:bg-gray-dark min-w-[300px] w-[300px] min-h-full flex flex-col justify-between border-1 border-blue-lightest dark:border-gray-medium sm:min-w-[261px] sm:w-[261px] md:min-w-[261px] md:w-[261px]">
          <div className="flex flex-col gap-8">
            {/* Logo Section */}
            <div className="flex p-8">
              <Image
                id="logo-img"
                priority={true} 
                src={mode === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"}
                alt="logo"
                width={152}
                height={25}
                className="w-auto h-auto"
              />
            </div>

            {/* Menu Section */}
            <div className="flex flex-col gap-7 p-8 relative">
              <h5 className="text-hs text-gray-light font-bold">
                ALL BOARDS ({boards.length})
              </h5>

              {boards.map((item, index) => (
                <div
                  className="flex flex-row gap-4 items-center cursor-pointer group"
                  key={index}
                  onClick={() => setSelectedBoard(item.name)}
                >
                  <div
                    className={`absolute h-[48px] w-[276px] rounded-r-full z-0 left-0 sm:w-[240px] md:w-[240px]  ${
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

              <div
                className="flex flex-row gap-4 items-center cursor-pointer"
                onClick={handleModalOpen}
              >
                <Image
                  src="./assets/icon-board.svg"
                  alt="board-icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <h4 className="text-purple-dark text-hm font-bold hover:text-purple-light transition-colors duration-300">
                  + Create New Board
                </h4>
              </div>
              {/* Open New Board Modal */}
              {isNewBoardModalOpen && (
                <AddBoardModal closeModal={handleModalClose} />
              )}
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
