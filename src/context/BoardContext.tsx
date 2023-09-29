"use client";

import React, { useState, createContext } from "react";
import { boardsData } from "@/app/pages/api/data";
import {
  ISubtask,
  ITask,
  IColumn,
  IBoard,
  IBoardContextValue,
} from "./BoardInterface";
import { set } from "react-hook-form";

// Create a new context for managing the boards data
export const BoardContext = createContext<IBoardContextValue>({
  boards: [],
  selectedBoard: null,
  setSelectedBoard: () => {},
  selectedColumn: null,
  setSelectedColumn: () => {},
  addBoard: () => {},
  updateBoard: () => {},
  deleteBoard: () => {},
  addTask: () => {},
  selectedTask: null,
  setSelectedTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

// Define a provider component that wraps the children with the context provider
export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define the state for the boards data using the useState hook and initialize it with the boardsData array
  const [boards, setBoards] = useState<IBoard[]>(boardsData);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<{
    task: ITask;
    index: number;
  } | null>(null);

  // Define the functions for CRUD operations that will be passed down to the context value

  // Add a new board to the boards array
  const addBoard = (board: IBoard) => {
    setBoards([...boards, board]);
  };

  // Update and existing board in the boards array
  const updateBoard = (boardIndex: number, updateBoard: IBoard) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex] = updateBoard;
    setBoards(updatedBoards);
  };

  // Delete a board from the boards array
  const deleteBoard = (boardIndex: number) => {
    const updatedBoards = [...boards];
    updatedBoards.splice(boardIndex, 1);
    setBoards(updatedBoards);
  };

  // Add a new task to the selected board and update columns accordingly
  const addTask = (task: ITask) => {
    // Copy the boards array
    const updatedBoards = [...boards];

    // Get the index value of the selected board (0, 1, 2 , ...)
    const selectedBoardIndex = updatedBoards.findIndex(
      (board) => board.name === selectedBoard
    );

    // Get the column of the selected board (Platform Luanch, MarketingPlan,...)
    const selectedBoardToUpdate = updatedBoards[selectedBoardIndex];

    // Get the status of the new task (Todo, Doing, Done, ...)
    const newTaskStatus = task.status;

    // Find the index of the column that matches the new task status
    const columnIndexToUpdate = selectedBoardToUpdate.columns.findIndex(
      (column) => column.name === newTaskStatus
    );

    // Add the new task to the selected column
    selectedBoardToUpdate.columns[columnIndexToUpdate].tasks.push(task);

    // Update the selected board in the updatedBoards array
    updatedBoards[selectedBoardIndex] = selectedBoardToUpdate;

    // Update the boards state with the updated data
    setBoards(updatedBoards);
  };

  // Update the selected task within the boards array
  const updateTask = (prevTask: ITask, task: ITask) => {
    console.log("Update Task Function from BoardContext.tsx");

    if (!selectedTask || !selectedTask.task.subtasks) return;

    const updatedBoards = boards.map((board) => {
      if (board.name !== selectedBoard) return board;

      const oldColumnIndex = board.columns.findIndex(
        (column) => column.name === prevTask.status
      );

      const newColumnIndex = board.columns.findIndex(
        (column) => column.name === task.status
      );

      if (oldColumnIndex === -1 || newColumnIndex === -1) return board;

      const updatedColumns = [...board.columns];
      const oldColumn = updatedColumns[oldColumnIndex];
      const newColumn = updatedColumns[newColumnIndex];

      const updatedTasks = oldColumn.tasks.filter(
        (t) => t.title !== prevTask.title || t.status !== prevTask.status
      );

      oldColumn.tasks = updatedTasks;
      newColumn.tasks.push(task);

      return {
        ...board,
        columns: updatedColumns,
      };
    });

    setBoards(updatedBoards);
  };

  // Delete the selected task
  const deleteTask = (task: ITask) => {
    console.log("Delete Task Function from BoardContext.tsx");

    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((t) => t.title !== task.title),
        })),
      }))
    );
  };

  const contextValue: IBoardContextValue = {
    boards,
    selectedBoard,
    setSelectedBoard,
    selectedColumn,
    setSelectedColumn,
    addBoard,
    updateBoard,
    deleteBoard,
    addTask,
    selectedTask,
    setSelectedTask,
    updateTask,
    deleteTask,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
