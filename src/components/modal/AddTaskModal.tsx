import React from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";

interface AddTaskModalProps {
  closeTaskModal: () => void;
}

const AddTaskModal = ({ closeTaskModal }: AddTaskModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-darker w-[480px] h-[429px] p-8 rounded-lg flex flex-col gap-4 relative">
        {/* Close Modal Button */}
        <div className="absolute right-0 top-0 p-2">
          <button onClick={closeTaskModal}>
            <Image
              src="./assets/icon-cross.svg"
              alt="cross-icon"
              width={14}
              height={14}
            />
          </button>
        </div>

        <h2 className="text-hl font-bold dark:text-white">Add New Task</h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="task-title"
            className="text-bm font-bold text-gray-light dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="task-title"
            placeholder="e.g. Take coffee break"
            className="text-bl text-black opacity-25 font-medium p-4 border border-gray-light rouded-md h-[40px] dark:bg-gray-darker"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label
            htmlFor="task-description"
            className="text-bm font-bold text-gray-light dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="column-1"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
              recharge the batteries a little."
            className="text-bl text-black opacity-25 font-medium p-4 border border-gray-light rouded-md h-[40px] dark:bg-gray-darker"
          />
        </div>

        <Button
          radius="full"
          className="bg-purple-light dark:bg-white dark:text-purple-dark hover:bg-purple-dark h-12 w-full text-hm font-bold text-purple-dark hover:text-white dark:hover:text-purple-light"
        >
          +Add New Subtask
        </Button>
        <Button
          radius="full"
          className="bg-purple-dark hover:bg-purple-light h-12 w-full text-hm font-bold text-white"
        >
          Create Task
        </Button>
      </div>
    </div>
  );
};

export default AddTaskModal;
