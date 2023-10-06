"use client";

import React, { useEffect, useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import EditBoardModal from "../modal/EditBoardModal";
import { BoardContext } from "@/context/BoardContext";
import TaskDetailModal from "../modal/TaskDetailModal";
import { ITask, IBoard } from "@/context/BoardInterface";
import AddBoardModal from "../modal/AddBoardModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const Content = () => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isTaskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [isEditDeleteBoardModalOpen, setIsEditDeleteBoardModalOpen] =
    useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);

  // Board context
  const {
    boards,
    selectedBoard,
    setSelectedColumn,
    selectedTask,
    setSelectedTask,
    updateTaskStatusDuringDragAndDrop,
  } = useContext(BoardContext);

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

  // Handle List Icon Click for open edit board modal
  const handleListIconClick = () => {
    setIsEditDeleteBoardModalOpen(!isEditDeleteBoardModalOpen);
  };

  // Handle the edit board modal close
  const handleEditBoardModalClose = () => {
    setIsEditBoardModalOpen(false);
  };

  // Handle task detail modal open and set the selected task and column
  const handleTaskDetailModalOpen = (task: ITask, index: number) => {
    setSelectedTask({ task, index });

    setSelectedColumn(
      boards
        .find((board) => board.name === selectedBoard)
        ?.columns.find((column) => column.tasks.includes(task))?.name ?? null
    );
    setTaskDetailModalOpen(true);
  };

  // Handle task detail modal close
  const handleTaskDetailModalClose = () => {
    setTaskDetailModalOpen(false);
  };

  // Handle the New Board modal open
  const handleNewBoardModalOpen = () => {
    setIsNewBoardModalOpen(true);
  };

  // Handle the New Board modal close
  const handleNewBoardModalClose = () => {
    setIsNewBoardModalOpen(false);
  };

  // Get the current board
  const [currentBoard, setCurrentBoard] = useState<IBoard>();

  useEffect(() => {
    const board = boards.find((board) => board.name === selectedBoard);
    setCurrentBoard(board);
  }, [boards, selectedBoard, selectedTask]);

  // Handle the drag and drop
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there is no destination, return (the task is not moved)
    if (!destination) {
      return;
    }

    // If the destination is the same as the source, return (the task is not moved)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the column where the task is moved to (destination)
    const column = currentBoard?.columns.find(
      (column) => column.id === destination.droppableId
    );

    // Find the task that is moved (draggableId)
    const task = currentBoard?.columns
      .find((column) => column.id === source.droppableId)
      ?.tasks.find((task) => task.id === draggableId);

    // Remove the task from the source column (source)
    const sourceColumn = currentBoard?.columns.find(
      (column) => column.id === source.droppableId
    );
    sourceColumn?.tasks.splice(source.index, 1);

    // Add the task to the destination column
    column?.tasks.splice(destination.index, 0, task!);

    // Find the status based on destination.dropableId
    const newStatus = currentBoard?.columns.find(
      (column) => column.id === destination.droppableId
    )?.name;

    // Update the task status
    const updatedTask = { ...task!, status: newStatus! };
    // Update the task status in the boards state
    updateTaskStatusDuringDragAndDrop(task!.id, updatedTask.status);

    // Update the current board
    const updatedBoard = {
      ...currentBoard!,
      columns: currentBoard!.columns.map((col) =>
        col.id === column?.id ? column : col
      ),
    };
    setCurrentBoard(updatedBoard);
  };

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
      <div
        className={`${
          boards.length === 0
            ? "hidden"
            : currentBoard?.columns.length === 0
            ? "hidden"
            : "relative flex flex-row flex-wrap xl:flex-nowrap gap-6 h-full bg-blue-lighter dark:bg-gray-darker p-6 xs:px-4 xs:flex-col xs:gap-10 xs:min-h-[970px] xs:h-full"
        }`}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Column items */}
          {currentBoard?.columns.map((column, index) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  key={index}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-6 min-w-[280px] max-w-[280px] xs:min-w-[280px] xs:max-w-full sm:max-w-auto"
                >
                  {/* Column name */}
                  <div className="relative flex items-center">
                    <div
                      className="absolute w-[15px] h-[15px] rounded-full"
                      style={{ backgroundColor: randomColorbyIndex(index) }}
                    ></div>
                    <h3 className="text-hs pl-6 font-bold text-gray-light">
                      {/* Color before column name */}
                      {column.name.toLocaleUpperCase()} {"("}
                      {column.tasks ? column.tasks.length : 0}
                      {")"}
                    </h3>
                  </div>

                  {/* Column tasks */}
                  {column.tasks &&
                    column.tasks.map((task, index) => (
                      // Task item
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col gap-2 min-h-[88px] bg-white dark:bg-gray-dark shadow-lg dark:shadow-sm dark:shadow-gray-dark rounded-md py-6 px-3.5 cursor-pointer"
                            onClick={() =>
                              handleTaskDetailModalOpen(task, index)
                            }
                          >
                            <h3 className="text-hm font-bold dark:text-white">
                              {task.title}
                            </h3>
                            <p className="text-bm text-gray-light font-bold">
                              {
                                task.subtasks.filter(
                                  (subtask) => subtask.isCompleted
                                ).length
                              }{" "}
                              of {task.subtasks.length} substasks
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        {/* Open TaskDetailModal */}
        {isTaskDetailModalOpen && (
          <TaskDetailModal closeTaskDetailModal={handleTaskDetailModalClose} />
        )}

        {/* + New column */}
        {currentBoard?.columns.length === 0 ? (
          <div className="hidden"></div>
        ) : (
          <div className="flex flex-col  gap-6 max-w-[280px] mt-[38px] xs:hidden sm:hidden md:hidden lg:hidden">
            <div className="flex flex-col items-center justify-center gap-2 min-h-[814px] bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA] from-opacity-100 to-opacity-50 dark:from-gray-dark dark:to-gray-dark dark:from-opacity-100 dark:to-opacity-50 via-opacity-50 dark:opacity-25 shadow-lg dark:shadow-sm dark:shadow-gray-dark rounded-md py-6 px-3.5">
              <h1
                className="text-hxl font-bold text-center text-gray-light p-4 cursor-pointer"
                onClick={handleEditBoardModalOpen}
              >
                + New Column
              </h1>
            </div>

            {/* Open Edit Board Modal */}
            {isEditBoardModalOpen && (
              <EditBoardModal
                closeEditBoardModal={handleEditBoardModalClose}
                closeEditDeleteBoardModal={handleListIconClick}
              />
            )}
          </div>
        )}

        {/* Absolute position for the toggle icon when hideSidebar is true */}
        {hideSidebar && (
          <div
            className="absolute bottom-8 left-0 cursor-pointer bg-purple-dark hover:bg-purple-light h-[48px] w-[56px] flex items-center justify-center rounded-r-full xs:hidden"
            onClick={toggleHideSidebar}
          >
            <div className="relative w-4 h-4">
              <Image
                src="./assets/icon-show-sidebar.svg"
                alt="show-sidebar-icon"
                fill={true}
                // width={16}
                // height={16}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* IF NO ANY COLUMNS */}
      {(currentBoard?.columns.length === 0 || boards.length === 0) && (
        <div className="relative h-full w-full bg-blue-lighter dark:bg-gray-darker flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-6 xs:w-[343px]">
            <h2 className="text-hl font-bold text-gray-light xs:text-center">
              This board is empty. Create a new{" "}
              {boards.length === 0 ? " boards " : " column "} to get started.
            </h2>
            <Button
              radius="full"
              onClick={
                boards.length === 0
                  ? handleNewBoardModalOpen
                  : handleEditBoardModalOpen
              }
              className="bg-purple-dark hover:bg-purple-light h-12 w-[164px] text-hm font-bold text-white xs:w-[174px]"
            >
              {boards.length === 0 ? "+ Add New Board" : "+ Add New Column"}
            </Button>

            {/* Open New Board Modal */}
            {isNewBoardModalOpen && (
              <AddBoardModal closeModal={handleNewBoardModalClose} />
            )}
          </div>

          {/* Open edit board modal */}
          {isEditBoardModalOpen && (
            <EditBoardModal
              closeEditBoardModal={handleEditBoardModalClose}
              closeEditDeleteBoardModal={handleListIconClick}
            />
          )}

          {/* Absolute position for the toggle icon when hideSidebar is true */}
          {hideSidebar && (
            <div
              className="absolute bottom-8 left-0 cursor-pointer bg-purple-dark hover:bg-purple-light h-[48px] w-[56px] flex items-center justify-center rounded-r-full xs:hidden"
              onClick={toggleHideSidebar}
            >
            <div className="relative w-4 h-4">
              <Image
                src="./assets/icon-show-sidebar.svg"
                alt="show-sidebar-icon"
                fill={true}
                // width={16}
                // height={16}
                className="w-full h-auto object-contain"
              />
            </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Content;
