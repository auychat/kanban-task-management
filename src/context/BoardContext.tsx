"use client";

import React, { useState, createContext } from "react";
import { boardsData } from "@/app/pages/api/data";

interface IBoard {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}
[];

interface IBoardContextValue {
  boards: IBoard[];
  selectedBoard: string | null;
  setSelectedBoard: (boardName: string) => void;
  addBoard: (board: IBoard) => void;
  updateBoard: (boardIndex: number, updateBoard: IBoard) => void;
  deleteBoard: (boardIndex: number) => void;
}

// Create a new context for managing the boards data
export const BoardContext = createContext<IBoardContextValue>({
  boards: [],
  selectedBoard: null,
  setSelectedBoard: () => {},
  addBoard: () => {},
  updateBoard: () => {},
  deleteBoard: () => {},
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

  return (
    <BoardContext.Provider
      value={{
        boards,
        selectedBoard,
        setSelectedBoard,
        addBoard,
        updateBoard,
        deleteBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
