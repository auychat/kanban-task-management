import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/react";

const DarkModeToggle = () => {
  // Use the useContext hook to get access to the context value.
  const context = useContext(ThemeContext);

  // Check if the context is undefinded.
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // Otherwise, return the context value.
  const { mode, toggle } = context;

  // Use a state variable to control the switch
  const [switchValue, setSwitchValue] = useState(mode === "dark");

  // Update the switchValue when the mode changes
  useEffect(() => {
    setSwitchValue(mode === "dark");
  }, [mode]);

  // Handle toggle switch
  const handleSwitchToggle = () => {
    toggle();
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-4 max-w-[251px] max-h-[48px] bg-blue-lighter dark:bg-gray-darker w-full h-full rounded-md">
      <Image
        src="./assets/icon-light-theme.svg"
        alt="sun-icon"
        width={16}
        height={16}
        className="w-4 h-4"
      />
      <Switch
        isSelected={switchValue}
        onClick={handleSwitchToggle}
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
  );
};

export default DarkModeToggle;
