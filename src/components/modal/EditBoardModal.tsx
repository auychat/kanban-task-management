import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { BoardContext } from "@/context/BoardContext";
import { IBoard } from "@/context/BoardInterface";

interface EditBoardModalProps {
  closeEditBoardModal: () => void;
  closeEditDeleteBoardModal: () => void;
}

const EditBoardModal = ({ closeEditBoardModal, closeEditDeleteBoardModal }: EditBoardModalProps) => {
  const { boards, selectedBoard, updateBoard } = useContext(BoardContext);

  const prevBoard = boards.find((board) => board.name === selectedBoard);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IBoard>({ defaultValues: prevBoard });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  // Handle form submit
  const onSubmit: SubmitHandler<IBoard> = (data) => {
    console.log("Data submit : ", data);
    const boardIndex = boards.findIndex(
      (board) => board.name === selectedBoard
    );
    updateBoard(boardIndex, data);
    closeEditBoardModal();
    closeEditDeleteBoardModal();
  };

  // Handle add new column
  const handleAddNewColumn = () => {
    append({ name: "", tasks: [] });
  };

  const handleDeleteColumn = (index: number) => {
    remove(index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-dark w-[480px] min-h-[429px] p-8 rounded-lg flex flex-col gap-6 relative xs:w-[343px] xs:min-h-[473px] xs:px-6">
        {/* Close Modal Button */}
        <div className="absolute right-0 top-0 p-4">
          <button onClick={closeEditBoardModal}>
            <Image
              src="./assets/icon-cross.svg"
              alt="cross-icon"
              width={14}
              height={14}
            />
          </button>
        </div>

        <h2 className="text-hl font-bold dark:text-white">Edit Board</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Board Name */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="board-name"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Board Name
            </label>
            <input
              id="board-name"
              type="text"
              autoComplete="off"
              placeholder="e.g. Web Design"
              {...register("name", { required: true })}
              className={`text-bl text-black dark:text-white placeholder-opacity-25 font-medium p-4 border border-gray-light border-opacity-25 rounded-[4px] h-[40px] dark:bg-gray-dark focus:border-purple-dark focus:outline-none ${
                errors.name
                  ? "border-red border-opacity-100 focus:border-red"
                  : ""
              }`}
            />
            {errors.name && (
              <p className="text-bl font-medium text-red absolute top-8 right-4">
                Can&apos;t be empty
              </p>
            )}
          </div>

          {/* Board Columns */}
          <div className="flex flex-col gap-3 ">
            <label
              htmlFor="board-column"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Board Columns
            </label>

            {/* Column Names */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-row gap-4 justify-between"
              >
                <input
                  type="text"
                  id={`column-${index}`}
                  autoComplete="off"
                  {...register(`columns.${index}.name`)}
                  className="text-bl text-black dark:text-white placeholder-opacity-25 font-medium p-4 border border-gray-light border-opacity-25 rounded-[4px] h-[40px] w-full dark:bg-gray-dark focus:border-purple-dark focus:outline-none"
                />

                {/* Delete Column Button */}
                <button
                  type="button"
                  id={`delete-column-${index}`}
                  onClick={() => handleDeleteColumn(index)}
                >
                  <Image
                    src="./assets/icon-cross.svg"
                    alt="cross-icon"
                    width={14}
                    height={14}
                  />
                </button>
              </div>
            ))}

            <Button
              radius="full"
              onClick={handleAddNewColumn}
              className="bg-purple-dark bg-opacity-10 dark:bg-white dark:text-purple-dark hover:bg-opacity-25 h-10 w-full text-hm font-bold text-purple-dark dark:hover:text-purple-light"
            >
              +Add New Column
            </Button>
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

export default EditBoardModal;
