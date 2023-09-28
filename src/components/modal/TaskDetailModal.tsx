import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { BoardContext } from "@/context/BoardContext";
import DeleteTaskModal from "./DeleteTaskModal";

interface TaskDetailModalProps {
  closeTaskDetailModal: () => void;
  selectedTask: {
    task: ITask;
    index: number;
  } | null;
  setSelectedTask: (
    task: {
      task: ITask;
      index: number;
    } | null
  ) => void;
}

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

const TaskDetailModal = ({
  closeTaskDetailModal,
  selectedTask,
  setSelectedTask,
}: TaskDetailModalProps) => {
  const { boards, selectedBoard } = useContext(BoardContext);
  const [selectedStatus, setSelectedStatus] = useState(
    selectedTask?.task.status
  );
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const selectedBoardColumns = boards.find(
    (board) => board.name === selectedBoard
  )?.columns;

  // Create a reference to the modal div element
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside of the modal
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      // Check if modalRef exists and if the click occurred outside the modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        // Close the modal if the click is outside
        closeTaskDetailModal();
      }
    },
    [closeTaskDetailModal]
  );

  // Add a click event listener when the modal is opened
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Handle List Icon Click
  const handleListIconClick = () => {
    setIsEditTaskModalOpen(!isEditTaskModalOpen);
  };

  // Handle Subtask Checkbox Click
  const handleSubtaskClick = (index: number) => {
    // Check if the selected task exists and if it has subtasks
    if (!selectedTask || !selectedTask.task.subtasks) {
      return;
    }

    const updatedSubtasks = [...selectedTask?.task.subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSelectedTask({
      ...selectedTask,
      task: {
        ...selectedTask?.task,
        subtasks: updatedSubtasks,
      },
    });
  };

  // Handle Delete Task Modal Open
  const handleDeleteTaskModalOpen = () => {
    setIsDeleteTaskModalOpen(true);
  };

  // Handle Delete Task Modal Close
  const handleDeleteTaskModalClose = () => {
    setIsDeleteTaskModalOpen(false);
  };

  // Handle Delete Task
  const handleDeleteTask = () => {
    // Check if the selected task exists
    if (!selectedTask || !selectedBoardColumns) {
      return;
    }

    const updatedTasks = [selectedTask.index];
    console.log("updatedTasks", updatedTasks);
    console.log("selectedTasks", selectedTask);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white dark:bg-gray-darker w-[480px] min-h-[429px] p-8 rounded-lg flex flex-col gap-6 relative"
        ref={modalRef}
      >
        {/* Task Content */}
        {/* Task Title */}
        <div className="flex flex-row justify-between">
          <h2 className="text-hl font-bold dark:text-white">
            {selectedTask?.task.title}
          </h2>

          {/* List Icon */}
          <div
            className="flex items-center cursor-pointer pl-4 relative"
            onClick={handleListIconClick}
          >
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </div>

          {/* Open Edit Delete Task Modal */}
          {isEditTaskModalOpen && (
            <div className="absolute w-[192px] h-[94px] p-4 flex flex-col justify-between bg-white shadow-md rounded-md top-[80px] right-[-61px]">
              <p
                className="text-bl text-gray-light font-medium hover:font-bold cursor-pointer"
              >
                Edit Task
              </p>
              <p
                className="text-bl text-red font-medium hover:font-bold cursor-pointer"
                onClick={handleDeleteTaskModalOpen}
              >
                Delete Task
              </p>
            </div>
          )}

          {/* Open Delete Task Modal Confirmation */}
          {isDeleteTaskModalOpen && (
            <DeleteTaskModal
              closeDeleteTaskModal={handleDeleteTaskModalClose}
              confirmDelteTask={handleDeleteTask}
            />
          )}
        </div>

        {/* Task Description */}
        <p className="text-bl text-gray-light font-medium">
          {selectedTask?.task.description}
        </p>

        {/* Subtasks */}
        <div className="flex flex-col gap-4">
          <p className="text-bm text-gray-light font-bold">
            Subtasks{" ( "}
            {
              selectedTask?.task.subtasks.filter(
                (subtask) => subtask.isCompleted
              ).length
            }{" "}
            of {selectedTask?.task.subtasks.length}
            {" )"}
          </p>
          <ul className="flex flex-col gap-2">
            {selectedTask?.task.subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-blue-lighter hover:bg-purple-dark hover:bg-opacity-25 px-3 min-h-10 rounded-[4px] cursor-pointer"
                onClick={() => handleSubtaskClick(index)}
              >
                {/* Custom Check box */}
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  className="hidden"
                  id={`checkbox-${index}`}
                  onChange={() => handleSubtaskClick(index)}
                />
                <label
                  htmlFor={`checkbox-${index}`}
                  className="relative cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 bg-white border border-none dark:border-gray-darker rounded-[2px] transition-all duration-100 transform ${
                      subtask.isCompleted ? "scale-110" : "scale-100"
                    } hover:scale-110`}
                  ></div>
                  {/* Custom checkmark */}
                  <div
                    className={`absolute flex items-center justify-center top-0 left-0 w-4 h-4 bg-purple-dark rounded-[2px] opacity-0 transition-all duration-100 scale-0 ${
                      subtask.isCompleted ? "scale-100 opacity-100" : ""
                    } hover:scale-100`}
                  >
                    <svg
                      width="10"
                      height="8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="#FFF"
                        strokeWidth="2"
                        fill="none"
                        d="m1.276 3.066 2.756 2.756 5-5"
                      />
                    </svg>
                  </div>
                </label>

                <span
                  className={`text-bm font-bold text-black text-opacity-50 hover:text-opacity-100 py-3 ${
                    subtask.isCompleted ? "line-through" : ""
                  }`}
                >
                  {subtask.title}
                </span>
              </div>
            ))}
          </ul>
        </div>

        {/* Task Status */}
        <div className="relative flex flex-col gap-2">
          <p className="text-bm text-gray-light font-bold">Current Status</p>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="text-bl text-black dark:text-white font-medium px-4 border border-gray-light border-opacity-25 rounded-[4px] h-10 w-full dark:bg-gray-darker focus:border-purple-dark focus:outline-none appearance-none cursor-pointer"
          >
            {selectedBoardColumns?.map((column, index) => (
              <option value={column.name} key={index} className="text-red p-10">
                {column.name}
              </option>
            ))}
          </select>

          {/* Custom Icon Chevron down */}
          <div className="absolute top-10 right-4">
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
      </div>
    </div>
  );
};

export default TaskDetailModal;
