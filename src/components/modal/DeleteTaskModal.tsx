import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { BoardContext } from "@/context/BoardContext";

interface DeleteTaskModalProps {
  closeDeleteTaskModal: () => void;
  confirmDeleteTask: () => void;
}

const DeleteTaskModal = ({
  closeDeleteTaskModal,
  confirmDeleteTask,
}: DeleteTaskModalProps) => {

  const { selectedTask } = useContext(BoardContext);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-dark w-[480px] h-[229px] p-8 rounded-lg flex flex-col gap-6 relative xs:w-[343px] xs:h-[284px] xs:p-6">
        <h2 className="text-hl font-bold text-red">Delete this task?</h2>
        <p className="text-bl text-gray-light font-medium">
          Are you sure you want to delete the &apos;{selectedTask?.task.title}&apos; task
          and its subtasks? This action cannot be reversed.
        </p>

        <div className="flex flex-row gap-4 xs:flex-col">
          <Button
            radius="full"
            onClick={confirmDeleteTask}
            className="bg-red hover:bg-red-light h-10 w-[200px] text-hm font-bold text-white xs:w-full"
          >
            Delete
          </Button>

          <Button
            radius="full"
            onClick={closeDeleteTaskModal}
            className="bg-purple-dark bg-opacity-10 hover:bg-opacity-25 dark:bg-white dark:hover:bg-white h-10 w-[200px] text-hm font-bold text-purple-dark xs:w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
