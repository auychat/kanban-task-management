import Image from "next/image";
import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { Button } from "@nextui-org/button";
import { BoardContext } from "@/context/BoardContext";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ISubtask, ITask } from "@/context/BoardInterface";

interface EditTaskModalProps {
  closeEditTaskModal: () => void;
  closeTaskDetailModal: () => void;
}

const EditTaskModal = ({
  closeEditTaskModal,
  closeTaskDetailModal,
}: EditTaskModalProps) => {

  const { boards, selectedBoard, selectedTask, updateTask } =
    useContext(BoardContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ITask>({ defaultValues: selectedTask?.task });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  // console.log(watch("subtasks"));

  // Handle form submit
  const onSubmit: SubmitHandler<ITask> = (data) => {
    console.log(data);
    updateTask(data);
    closeEditTaskModal();
  };

  // Handle add new subtask
  const handleAddNewSubtask = () => {
    append({ title: "", isCompleted: false });
  };

  // Handle delete subtask
  const handleDeleteSubtask = (index: number) => {
    if (index !== 0) {
      remove(index);
    }
  };

  // Only selected board's columns
  const selectedBoardColumns = boards.find(
    (board) => board.name === selectedBoard
  )?.columns;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-dark w-[480px] min-h-[429px] p-8 rounded-lg flex flex-col gap-4 relative">
        {/* Close Modal Button */}
        <div className="absolute right-0 top-0 p-4">
          <button type="button" onClick={closeEditTaskModal}>
            <Image
              src="./assets/icon-cross.svg"
              alt="cross-icon"
              width={14}
              height={14}
            />
          </button>
        </div>
        <h2 className="text-hl font-bold dark:text-white">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="task-title"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Title
            </label>
            <input
              id="task-title"
              type="text"
              autoComplete="off"
              placeholder="e.g. Take a break"
              {...register("title", { required: true })}
              className={`text-bl text-black dark:text-white placeholder-opacity-25 font-medium p-4 border border-gray-light border-opacity-25 rounded-[4px] h-[40px] dark:bg-gray-dark focus:border-purple-dark focus:outline-none ${
                errors.title
                  ? "border-red border-opacity-100 focus:border-red"
                  : ""
              }`}
            />
            {errors.title && (
              <p className="text-bl font-medium text-red absolute top-8 right-4">
                Can&apos;t be empty
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="task-description"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: false })}
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              className="text-bl text-black dark:text-white placeholder-opacity-25 whitespace-pre-wrap font-medium resize-none p-4 border border-gray-light border-opacity-25 rounded-[4px] min-h-[112px] max-w-[416px] w-full dark:bg-gray-dark focus:border-purple-dark focus:outline-none"
            />
          </div>

          {/* Subtasks */}
          <div className="flex flex-col gap-3 relative">
            <label
              htmlFor="subtasks"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Subtasks
            </label>

            {/* Subtask Values */}
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-row gap-4 justify-between">
                <input
                  type="text"
                  id={`subtask-${index}`}
                  autoComplete="off"
                  placeholder={
                    index === 0
                      ? "e.g. Make coffee"
                      : index === 1
                      ? "e.g. Drink coffee & smile"
                      : ""
                  }
                  {...register(`subtasks.${index}.title`, {
                    required: index === 0,
                  })}
                  className={`text-bl text-black dark:text-white placeholder-opacity-25 font-medium p-4 border border-gray-light border-opacity-25 rounded-[4px] h-[40px] w-full dark:bg-gray-dark focus:border-purple-dark focus:outline-none ${
                    errors.subtasks && index === 0
                      ? "border-red border-opacity-100 focus:border-red"
                      : ""
                  }`}
                />
                {errors.subtasks && index === 0 && (
                  <p className="text-bl font-medium text-red absolute top-9 right-10">
                    Can&apos;t be empty
                  </p>
                )}

                {/* Delete Button */}
                <button
                  id={`delete-subtask-${index}`}
                  type="button"
                  onClick={() => handleDeleteSubtask(index)}
                >
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill={`${
                        errors.subtasks && index === 0 ? "red" : "#828FA3"
                      }`}
                      fillRule="evenodd"
                    >
                      <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                      <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                    </g>
                  </svg>
                </button>
              </div>
            ))}

            <Button
              radius="full"
              type="button"
              onClick={() => handleAddNewSubtask()}
              className="bg-purple-dark bg-opacity-10 dark:bg-white dark:text-purple-dark hover:bg-opacity-25 h-10 w-full text-hm font-bold text-purple-dark dark:hover:text-purple-light"
            >
              +Add New Subtask
            </Button>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3 relative group">
            <label
              htmlFor="status"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Status
            </label>
            <select
              id="priority"
              {...register("status", { required: true })}
              className="text-bl text-black dark:text-white font-medium px-4 border border-gray-light border-opacity-25 rounded-[4px] h-10 w-full dark:bg-gray-dark focus:border-purple-dark focus:outline-none appearance-none cursor-pointer"
            >
              {selectedBoardColumns?.map((column, index) => (
                <option
                  key={index}
                  value={column.name}
                  className="text-bl font-medium dark:bg-gray-darker bg-white dark:text-white"
                >
                  {column.name}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-7 p-4 cursor-pointer pointer-events-none">
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
          </div>

          <Button
            radius="full"
            type="submit"
            className="bg-purple-dark hover:bg-purple-light h-10 w-full text-hm font-bold text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
