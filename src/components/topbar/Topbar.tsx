"use client";

import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import AddTaskModal from "../modal/AddTaskModal";
import { BoardContext } from "@/context/BoardContext";
import EditBoardModal from "../modal/EditBoardModal";
import DeleteBoardModal from "../modal/DeleteBoardModal";
import MobileNavBoardModal from "./MobileNavBoardModal";

const Topbar = () => {
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isEditDeleteBoardModalOpen, setIsEditDeleteBoardModalOpen] =
    useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  const [isNavBoardModalOpen, setIsNavBoardModalOpen] = useState(false);

  const { boards, selectedBoard, setSelectedBoard, deleteBoard } =
    useContext(BoardContext);

  const context = useContext(ThemeContext);
  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, hideSidebar, toggleHideSidebar, screenSizeWidth } = context;
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

  const handleMobileNavBoardModalOpen = () => {
    setIsNavBoardModalOpen(true);
  };

  const handleMobileNavBoardModalClose = () => {
    setIsNavBoardModalOpen(false);
  };

  return (
    <div className="relative max-h-[96px] h-full w-full border-1 border-l-0 border-blue-lightest dark:border-gray-medium bg-white dark:bg-gray-dark flex flex-row justify-between items-center p-6 xs:max-w-[480px] xs:h-[64px] xs:p-4 sm:max-w-[768px] sm:h-[80px] sm:py-7 sm:px-6 md:max-w-[1024px] md:h-[80px] md:py-7 md:px-6">
      <div className="flex flex-row gap-8 items-center xs:gap-4 sm:gap-4">
        {/* Logo Section */}
        <>
          {hideSidebar && (
            <div className="flex pr-8 xs:pr-0">
              <div className="absolute border-r border-blue-lightest dark:border-gray-medium min-h-[96px] h-full top-0 left-[210px] z-10 xs:hidden sm:min-h-[79px] md:min-h-[79px]"></div>

              {screenSizeWidth! < 480 ? (
                // Mobile Logo
                <Image
                  src="./assets/logo-mobile.svg"
                  alt="mobile-logo"
                  width={152}
                  height={25}
                  className="w-auto h-auto"
                />
              ) : (
                <Image
                  src={logoSrc}
                  alt="logo"
                  width={152}
                  height={25}
                  className="w-auto h-auto"
                />
              )}
            </div>
          )}
        </>
        {/* For Mobile Devices */}
        <div className="flex flex-row items-center justify-center ">
          <h1 className="text-hxl font-bold dark:text-white xs:text-hl sm:text-[20px]">
            {selectedBoard}
          </h1>
          {/* Chevron Icon Up and Down */}
          <div className="xs:block sm:hidden md:hidden lg:hidden xl:hidden">
            {isNavBoardModalOpen ? (
              <Image
                src="./assets/icon-chevron-up.svg"
                alt="chevron-icon-up"
                width={152}
                height={25}
                onClick={handleMobileNavBoardModalClose}
                className="w-auto h-auto p-2 cursor-pointer"
              />
            ) : (
              <Image
                src="./assets/icon-chevron-down.svg"
                alt="chevron-icon-down"
                width={152}
                height={25}
                onClick={handleMobileNavBoardModalOpen}
                className="w-auto h-auto p-2 cursor-pointer"
              />
            )}

            {/* Open MobileNavBoardModal */}
            {isNavBoardModalOpen && <MobileNavBoardModal closeMobileNavBoardModal={handleMobileNavBoardModalClose} />}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 xs:gap-0 sm:gap-0 md:gap-0">
        <Button
          radius="full"
          className={`bg-purple-dark h-12 w-[164px] text-hm font-bold text-white xs:h-[32px] xs:w-[48px] xs:min-w-unit-1 xs:px-0 ${
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
          {/* + Icon */}
          {screenSizeWidth! < 480 ? (
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          ) : (
            "+Add New Task"
          )}
        </Button>

        {/* List Icon */}
        <div
          className="flex items-center cursor-pointer pl-4 relative sm:pl-6 md:pl-6"
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
          <div className="absolute w-[192px] h-[94px] p-4 flex flex-col justify-between bg-white dark:bg-gray-darker shadow-md rounded-md top-[85px] right-[24px] z-50 xs:w-[120px] xs:h-[80px] xs:top-[65px] xs:right-[0px] xs:p-2">
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
