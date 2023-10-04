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
import {v4 as uuidv4} from 'uuid';

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
  updateTask: () => {},
  selectedTask: null,
  setSelectedTask: () => {},
  updateTaskStatus: () => {},
  deleteTask: () => {},
});

// Define a provider component that wraps the children with the context provider
export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Add a unique id to each task and column
  const boardsDataWithTaskIds: IBoard[] = boardsData.map((board) => ({
    ...board,
    columns: board.columns.map((column, cIndex) => ({
      ...column,
      id: cIndex.toString(),
      tasks: column.tasks.map((task) => ({
        ...task,
        id: uuidv4(),
      })),
    })),
  }));

  // Define the state for the boards data using the useState hook and initialize it with the boardsData array
  const [boards, setBoards] = useState<IBoard[]>(boardsDataWithTaskIds);
  // console.log("boards", boards)

  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<{
    task: ITask;
    index: number;
  } | null>(null);

  // Define the functions for CRUD operations that will be passed down to the context value

  // Add a new board to the boards array
  const addBoard = (addBoardData: IBoard) => {
    const newBoard: IBoard = {
      name: addBoardData.name,
      columns: addBoardData.columns.map((column, index) => ({
        id: index.toString(),
        name: column.name,
        tasks: [],
      })),
    }

    setBoards([...boards, newBoard]);
    setSelectedBoard(newBoard.name);
  };

  // Update and existing board in the boards array
  const updateBoard = (boardIndex: number, updateBoard: IBoard) => {
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards];
      newBoards[boardIndex] = updateBoard;
      return newBoards;
    });
  };

  // Delete a board from the boards array
  const deleteBoard = (boardName: string) => {
    const boardIndex = boards.findIndex((board) => board.name === boardName);
    if (boardIndex !== -1) {
      const updatedBoards = [...boards];
      updatedBoards.splice(boardIndex, 1);
      setBoards(updatedBoards);

      // Check if there are remaining boards
      if (updatedBoards.length > 0) {
        // If there are remaining boards, set the selected board to the next one
        const nextBoardIndex = boardIndex === 0 ? 0 : boardIndex - 1;
        setSelectedBoard(updatedBoards[nextBoardIndex].name);
      } else {
        // If there are no remaining boards, set the selected board to null
        setSelectedBoard(null);
      }
    }
  };

  // Add a new task to the selected board and update columns accordingly
  const addTask = (task: ITask) => {
    // Generate a unique id for the new task
    const taskId = uuidv4();

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
    selectedBoardToUpdate.columns[columnIndexToUpdate].tasks.push({
      ...task,
      id: taskId,
    });

    // Update the selected board in the updatedBoards array
    updatedBoards[selectedBoardIndex] = selectedBoardToUpdate;

    // Update the boards state with the updated data
    setBoards(updatedBoards);
  };

  // Update the selected task within the boards array
  const updateTask = (task: ITask) => {
    const updatedBoards = boards.map((board) => {
      if (board.name !== selectedBoard) return board;

      const columnIndex = board.columns.findIndex(
        (column) => column.name === task.status
      );

      if (columnIndex === -1) return board;

      const updatedColumns = [...board.columns];
      const column = updatedColumns[columnIndex];

      const taskIndex = column.tasks.findIndex(
        (t) => t.title === task.title && t.status === task.status
      );

      if (taskIndex === -1) return board;

      column.tasks[taskIndex] = task;

      return {
        ...board,
        columns: updatedColumns,
      };
    });

    setBoards(updatedBoards);
  };

  // Update the selected task within the boards array
  const updateTaskStatus = (prevTask: ITask, task: ITask) => {
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
    updateTask,
    selectedTask,
    setSelectedTask,
    updateTaskStatus,
    deleteTask,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
