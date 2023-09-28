import React from "react";
import { Button } from "@nextui-org/button";

interface DeleteBoardModalProps {
  closeDeleteBoardModal: () => void;
  // confirmDelteTask: () => void;
}

const DeleteBoardModal = ({
  closeDeleteBoardModal,
  // confirmDelteBoard,
}: DeleteBoardModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-darker w-[480px] h-[229px] p-8 rounded-lg flex flex-col gap-6 relative">
        <h2 className="text-hl font-bold text-red">Delete this board?</h2>
        <p className="text-bl text-gray-light font-medium">
          Are you sure you want to delete the &apos;Platform Launch&apos; board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>

        <div className="flex flex-row gap-4">
          <Button
            radius="full"
            // onClick={confirmDelteTask}
            className="bg-red hover:bg-red-light h-10 w-[200px] text-hm font-bold text-white"
          >
            Delete
          </Button>

          <Button
            radius="full"
            onClick={closeDeleteBoardModal}
            className="bg-purple-dark bg-opacity-10 hover:bg-opacity-25 dark:bg-white dark:hover:bg-white h-10 w-[200px] text-hm font-bold text-purple-dark"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
