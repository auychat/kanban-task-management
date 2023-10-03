import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import AddBoardModal from "../modal/AddBoardModal";
import DarkModeToggle from "../sidebar/DarkModeToggle";
import { BoardContext } from "@/context/BoardContext";

interface MobileNavBoardModalProps {
  closeMobileNavBoardModal: () => void;
}

const MobileNavBoardModal = ({
  closeMobileNavBoardModal,
}: MobileNavBoardModalProps) => {
  const { boards, selectedBoard, setSelectedBoard } = useContext(BoardContext);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);

  useEffect(() => {
    if (selectedBoard === null && boards.length > 0) {
      setSelectedBoard(boards[0].name);
    }
  }, [selectedBoard, setSelectedBoard, boards]);

  // Handle the New Board modal open
  const handleNewBoardModalOpen = () => {
    setIsNewBoardModalOpen(true);
  };

  // Handle the New Board modal close
  const handleNewBoardModalClose = () => {
    setIsNewBoardModalOpen(false);
  };

  return (
    <div className="fixed left-0 right-0 top-[64px] h-full z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-start">
      <div className="bg-white dark:bg-gray-dark w-[264px] min-h-[322px] rounded-lg flex flex-col gap-4 relative mt-4">
        {/* Menu Section */}
        <div className="flex flex-col gap-7 p-4 relative">
          <div className="flex flex-col gap-7 p-2">
            <h5 className="text-hs text-gray-light font-bold">
              ALL BOARDS ({boards.length})
            </h5>

            {boards.map((item, index) => (
              <div
                className="flex flex-row gap-4 items-center cursor-pointer group"
                key={index}
                onClick={() => {
                  setSelectedBoard(item.name);
                  closeMobileNavBoardModal();
                }}
              >
                <div
                  className={`absolute h-[48px] w-[240px] rounded-r-full z-0 left-0  ${
                    selectedBoard === item.name
                      ? "bg-purple-dark transition-color duration-300"
                      : "group-hover:bg-purple-dark group-hover:dark:bg-white opacity-10 dark:opacity-100 transition-color duration-300"
                  }`}
                ></div>

                <Image
                  src="./assets/icon-board.svg"
                  alt="board-icon"
                  width={16}
                  height={16}
                  className="w-4 h-4 z-10"
                />
                <h4
                  className={`text-gray-light text-hm font-bold z-10  ${
                    selectedBoard === item.name
                      ? "text-white"
                      : "group-hover:text-purple-dark group-hover:dark:text-purple-dark"
                  }`}
                >
                  {item.name}
                </h4>
              </div>
            ))}

            <div
              className="flex flex-row gap-4 items-center cursor-pointer"
              onClick={handleNewBoardModalOpen}
            >
              <Image
                src="./assets/icon-board.svg"
                alt="board-icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <h4 className="text-purple-dark text-hm font-bold hover:text-purple-light transition-colors duration-300">
                + Create New Board
              </h4>
            </div>
          </div>

          {/* Theme DarkMode Toggle */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 items-center justify-center">
              <DarkModeToggle />
            </div>
          </div>
          {/* Open New Board Modal */}
          {isNewBoardModalOpen && (
            <AddBoardModal closeModal={handleNewBoardModalClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavBoardModal;
