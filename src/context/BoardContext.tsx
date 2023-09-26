"use client";

import React, { useState, createContext } from "react";
import { boardsData } from "@/app/pages/api/data";

interface ISubtask {
  title: string;
  isCompleted: boolean;
}

interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
}

interface IColumn {
  name: string;
  tasks: ITask[];
}

interface IBoard {
  name: string;
  columns: IColumn[];
}

interface IBoardContextValue {
  boards: IBoard[];
  selectedBoard: string | null;
  setSelectedBoard: (boardName: string | null) => void;
  addBoard: (board: IBoard) => void;
  updateBoard: (boardIndex: number, updateBoard: IBoard) => void;
  deleteBoard: (boardIndex: number) => void;
  addTask: (task: ITask) => void;
}

// Create a new context for managing the boards data
export const BoardContext = createContext<IBoardContextValue>({
  boards: [],
  selectedBoard: null,
  setSelectedBoard: () => {},
  addBoard: () => {},
  updateBoard: () => {},
  deleteBoard: () => {},
  addTask: () => {},
});

// Define a provider component that wraps the children with the context provider
export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define the state for the boards data using the useState hook and initialize it with the boardsData array
  const [boards, setBoards] = useState<IBoard[]>(boardsData);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  // // Define the functions for CRUD operations that will be passed down to the context value
  const addBoard = (board: IBoard) => {
    setBoards([...boards, board]);
  };

  const updateBoard = (boardIndex: number, updateBoard: IBoard) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex] = updateBoard;
    setBoards(updatedBoards);
  };

  const deleteBoard = (boardIndex: number) => {
    const updatedBoards = [...boards];
    updatedBoards.splice(boardIndex, 1);
    setBoards(updatedBoards);
  };

  // Add a new task to the selected board
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

  const contextValue: IBoardContextValue = {
    boards,
    selectedBoard,
    setSelectedBoard,
    addBoard,
    updateBoard,
    deleteBoard,
    addTask,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
