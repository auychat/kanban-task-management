import React from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";

interface EditBoardModalProps {
  closeEditBoardModal: () => void;
}

const EditBoardModal = ({ closeEditBoardModal }: EditBoardModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-darker w-[480px] h-[429px] p-8 rounded-lg flex flex-col gap-4 relative">
        {/* Close Modal Button */}
        <div className="absolute right-0 top-0 p-2">
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
        <form action="">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="board-name"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Board Name
            </label>
            <input
              type="text"
              id="board-name"
              placeholder="e.g. Web Design"
              className="text-bl text-black opacity-25 font-medium p-4 border border-gray-light rouded-md h-[40px] dark:bg-gray-darker"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="Columns"
              className="text-bm font-bold text-gray-light dark:text-white"
            >
              Board Columns
            </label>
            <input
              type="text"
              id="column-1"
              placeholder="Todo"
              className="text-bl text-black opacity-25 font-medium p-4 border border-gray-light rouded-md h-[40px] dark:bg-gray-darker"
            />
            <input
              type="text"
              id="column-2"
              placeholder="Doing"
              className="text-bl text-black opacity-25 font-medium p-4 border border-gray-light rouded-md h-[40px] dark:bg-gray-darker"
            />
          </div>
        </form>

        <Button
          radius="full"
          className="bg-purple-light dark:bg-white dark:text-purple-dark hover:bg-purple-dark h-12 w-full text-hm font-bold text-purple-dark hover:text-white dark:hover:text-purple-light"
        >
          +Add New Column
        </Button>
        <Button
          radius="full"
          className="bg-purple-dark hover:bg-purple-light h-12 w-full text-hm font-bold text-white"
        >
          Save Change
        </Button>
      </div>
    </div>
  );
};

export default EditBoardModal;
