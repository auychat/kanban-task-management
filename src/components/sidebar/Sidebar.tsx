"use client";

import Image from "next/image";
import React from "react";
import { boardsData } from "@/app/pages/api/data.js";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/react";
const Sidebar = () => {
  return (
    <div className="bg-white max-w-[300px] h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        {/* Logo Section */}
        <div className="flex p-8">
          <Image
            src="/assets/logo-dark.svg"
            alt="logo"
            width={152}
            height={25}
            className="w-auto h-auto"
          />
        </div>

        {/* Menu Section */}
        <div className="flex flex-col gap-7 p-8">
          <h5 className="text-hs text-gray-light font-bold">ALL BOARDS (3)</h5>

          <div className="flex flex-row gap-4 items-center">
            <Image
              src="./assets/icon-board.svg"
              alt="board-icon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <h4 className="text-gray-light text-hm font-bold">
              {boardsData[0].name}
            </h4>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <Image
              src="./assets/icon-board.svg"
              alt="board-icon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <h4 className="text-purple-dark text-hm font-bold">
              + Create New Board
            </h4>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col gap-6">
        {/* Theme Toggle */}
        <div className="flex flex-row gap-4 items-center justify-center ">
          <div className="flex flex-row items-center justify-center gap-4 p-4 max-w-[251px] max-h-[48px] bg-blue-lighter w-full h-full rounded-md">
            <Image
              src="./assets/icon-light-theme.svg"
              alt="moon-icon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <Switch
              classNames={{
                base: cn("max-w-[40px]"),
                wrapper:
                  "w-[40px] h-[20px] bg-purple-dark group-data-[selected=true]:bg-purple-dark",
                thumb: cn("w-[14px] h-[14px] bg-white"),
              }}
            />
            <Image
              src="./assets/icon-dark-theme.svg"
              alt="moon-icon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>
        </div>

        {/* Hide Sidebar */}
        <div className="flex flex-row items-center gap-4 px-8 pb-12">
          <Image
            src="./assets/icon-hide-sidebar.svg"
            alt="hide-icon"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <h4 className="text-gray-light text-hm font-bold">Hide Sidebar</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
