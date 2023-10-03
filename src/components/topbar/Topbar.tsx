"use client";

import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import AddTaskModal from "../modal/AddTaskModal";
import { BoardContext } from "@/context/BoardContext";
import EditBoardModal from "../modal/EditBoardModal";
import DeleteBoardModal from "../modal/DeleteBoardModal";

const Topbar = () => {
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isEditDeleteBoardModalOpen, setIsEditDeleteBoardModalOpen] =
    useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);

  const { boards, selectedBoard, setSelectedBoard, deleteBoard } =
    useContext(BoardContext);

  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar } = context;
  const logoSrc =
    mode === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg";

  // Handle the modal open
  const handleTaskModalOpen = () => {
    setTaskModalOpen(true);
  };

  // Handle the modal close
  const handleTaskModalClose = () => {
    setTaskModalOpen(false);
  };

  // Handle List Icon Click
  const handleListIconClick = () => {
    setIsEditDeleteBoardModalOpen(!isEditDeleteBoardModalOpen);
  };

  // Handle the edit board modal open
  const handleEditBoardModalOpen = () => {
    setIsEditBoardModalOpen(true);
  };

  // Handle the edit board modal close
  const handleEditBoardModalClose = () => {
    setIsEditBoardModalOpen(false);
    handleListIconClick();
  };

  // Handle the delete board confirmation modal open
  const handleDeleteBoardModalOpen = () => {
    setIsDeleteBoardModalOpen(true);
  };

  // Handle the delete board confirmation modal close
  const handleDeleteBoardModalClose = () => {
    setIsDeleteBoardModalOpen(false);
    handleListIconClick();
  };

  const handleDeleteBoard = () => {
    // Check if the selected task exists
    if (selectedBoard) {
      deleteBoard(selectedBoard);
      handleDeleteBoardModalClose();
      handleListIconClick();
    }
  };

  return (
    <div className="relative max-h-[96px] max-w-[1240px] h-full w-screen border-1 border-l-0 border-blue-lightest dark:border-gray-medium bg-white dark:bg-gray-dark flex flex-row justify-between items-center p-6">
      <div className="flex flex-row gap-8 items-center">
        {/* Logo Section */}
        <>
          {hideSidebar && (
            <div className="flex pr-8">
              <div className="absolute border-r border-blue-lightest dark:border-gray-medium min-h-[96px] h-full top-0 left-[210px] z-10"></div>
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
        <h1 className="text-hxl font-bold dark:text-white">{selectedBoard}</h1>
      </div>
      <div className="flex flex-row gap-6">
        <Button
          radius="full"
          className={`bg-purple-dark h-12 w-[164px] text-hm font-bold text-white ${
            boards.find((board) => board.name === selectedBoard)?.columns
              .length === 0
              ? "opacity-25 cursor-default"
              : "opacity-100"
          } `}
          // onClick={handleTaskModalOpen}
          onClick={
            boards.find((board) => board.name === selectedBoard)?.columns
              .length === 0
              ? undefined
              : handleTaskModalOpen
          }
        >
          +Add New Task
        </Button>

        {/* List Icon */}
        <div
          className="flex items-center cursor-pointer pl-4 relative"
          onClick={handleListIconClick}
        >
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </div>

        {/* Open Edit Delete Board Modal */}
        {isEditDeleteBoardModalOpen && (
          <div className="absolute w-[192px] h-[94px] p-4 flex flex-col justify-between bg-white dark:bg-gray-darker shadow-md rounded-md top-[85px] right-[24px] z-50">
            <button
              type="button"
              onClick={handleEditBoardModalOpen}
              className="text-bl text-gray-light font-medium hover:font-bold cursor-pointer"
            >
              Edit Board
            </button>
            <button
              type="button"
              className="text-bl text-red font-medium hover:font-bold cursor-pointer"
              onClick={handleDeleteBoardModalOpen}
            >
              Delete Board
            </button>
          </div>
        )}

        {/* Open Edit Board Modal */}
        {isEditBoardModalOpen && (
          <EditBoardModal
            closeEditBoardModal={handleEditBoardModalClose}
            closeEditDeleteBoardModal={handleListIconClick}
          />
        )}

        {/* Open Delete Board Modal Confirmation */}
        {isDeleteBoardModalOpen && (
          <DeleteBoardModal
            closeDeleteBoardModal={handleDeleteBoardModalClose}
            confirmDeleteBoard={handleDeleteBoard}
          />
        )}
      </div>

      {/* Open task modal */}
      {isTaskModalOpen && (
        <AddTaskModal closeTaskModal={handleTaskModalClose} />
      )}
    </div>
  );
};

export default Topbar;
