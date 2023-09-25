"use client";

import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import EditBoardModal from "../modal/EditBoardModal";
import { BoardContext } from "@/context/BoardContext";

interface IColumn {
  name: string;
  columns: string[];
}

const Content = () => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);

  // Board context
  const { boards, selectedBoard } = useContext(BoardContext);

  // Theme context
  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar } = context;

  // Handle the edit board modal open
  const handleEditBoardModalOpen = () => {
    setIsEditBoardModalOpen(true);
  };

  // Handle the edit board modal close
  const handleEditBoardModalClose = () => {
    setIsEditBoardModalOpen(false);
  };

  // Get the current board
  const currentBoard = boards.find((board) => board.name === selectedBoard);

  const randomColorbyIndex = (index: number) => {
    const colors = [
      "#49C4E5",
      "#8471F2",
      "#67E2AE",
      "#F2C94C",
      "#F2994A",
      "#EB5757",
      "#F2F2F2",
      "#333333",
    ];
    return colors[index];
  };

  return (
    <>
      {/* IF HAVE VALUES */}

      <div className="flex flex-row gap-6 h-full bg-blue-lighter dark:bg-gray-darker p-6">
        {currentBoard?.columns.map((column, index) => (
          <div className="flex flex-col gap-6 w-[280px]" key={index}>
            {/* Column name */}
            <div className="relative flex items-center">
              <div
                className="absolute w-[15px] h-[15px] rounded-full"
                style={{ backgroundColor: randomColorbyIndex(index) }}
              ></div>
              <h5 className=" text-hs pl-6 font-bold text-gray-light">
                {/* Color before column name */}
                {column.name.toLocaleUpperCase()} {"("}
                {column.tasks.length}
                {")"}
              </h5>
            </div>
            {column.tasks.map((task, index) => (
              <div
                className="flex flex-col gap-2 min-h-[88px] bg-white dark:bg-gray-dark shadow-lg dark:shadow-sm dark:shadow-gray-dark rounded-md py-6 px-3.5"
                key={index}
              >
                <h3 className="text-hm font-bold dark:text-white">
                  {task.title}
                </h3>
                <p className="text-bm text-gray-light font-bold">
                  {
                    task.subtasks.filter((subtask) => subtask.isCompleted)
                      .length
                  }{" "}
                  of {task.subtasks.length} substasks
                </p>
              </div>
            ))}
          </div>
        ))}

        {/* + New column */}
        <div className="flex flex-col gap-6 w-[280px] mt-[38px]">
          <div className="flex flex-col items-center justify-center gap-2 min-h-[814px] bg-blue-lightest dark:bg-gradient-to-r from-gray-darker to-gray-dark dark:bg-opacity-25 shadow-lg dark:shadow-sm dark:shadow-gray-dark rounded-md py-6 px-3.5">
            <h1 className="text-hxl font-bold  text-center text-gray-light">
              + New Column
            </h1>
          </div>
        </div>
      </div>

      {/* IF NO ANY COLUMNS */}
      {currentBoard?.columns.length === 0 && (
        <div className="relative max-w-[1140px] h-[calc(100vh-96px)] bg-blue-lighter dark:bg-gray-darker flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-hl font-bold text-gray-light">
              This board is empty. Create a new column to get started.
            </h2>
            <Button
              radius="full"
              onClick={handleEditBoardModalOpen}
              className="bg-purple-dark hover:bg-purple-light h-12 w-[164px] text-hm font-bold text-white"
            >
              +Add New Column
            </Button>
          </div>

          {/* Open edit board modal */}
          {isEditBoardModalOpen && (
            <EditBoardModal closeEditBoardModal={handleEditBoardModalClose} />
          )}

          {/* Absolute position for the  */}
          {hideSidebar && (
            <div
              className="absolute bottom-8 left-0 cursor-pointer bg-purple-dark hover:bg-purple-light h-[48px] w-[56px] flex items-center justify-center rounded-r-full"
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
      )}
    </>
  );
};

export default Content;
