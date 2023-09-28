"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";

import HomeIcon from "@/components/Icons/Home";
import ListIcon from "@/components/Icons/List";
import SendIcon from "@/components/Icons/Send";

interface IButtonData {
  path: string;
  Icon: React.FC<{ className?: string }>;
}

const BUTTON_DATA: IButtonData[] = [
  {
    path: "/",
    Icon: HomeIcon,
  },
  {
    path: "/blog",
    Icon: ListIcon,
  },
  {
    path: "/#contact-me",
    Icon: SendIcon,
  },
];

const FloatingActionButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col justify-center items-center">
      <div
        className={classNames(
          "trasition-opacity ease-in-out duration-200 relative",
          {
            "opacity-0": !open,
            "opacity-100": open,
          },
        )}
      >
        {BUTTON_DATA.map(({ path, Icon }, index) => (
          <button
            key={index}
            aria-label={`button to visit ${path}`}
            type="button"
            onClick={() => {
              router.push(path);
              setOpen(false);
            }}
            className={classNames(
              "absolute mb-2 bg-gray-700 text-gray-100 rounded-full p-4 transition-all ease-linear duration-300 delay-200 left-1/2 -translate-x-1/2 hover:ring-2 hover:ring-red-500 hover:ring-inset focus:ring-2 focus:ring-red-500 focus:ring-inset cursor-pointer",
              {
                "bottom-32": open && index === 2,
                "bottom-16": open && index === 1,
                "bottom-0": !open || (open && index === 0),
              },
            )}
          >
            {<Icon className="w-4 h-4" />}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Menu button"
        onClick={() => setOpen(!open)}
        className={classNames(
          "bg-gray-700 text-gray-100 rounded-full transition-all ease-in-out duration-200",
          {
            "p-2": open,
            "p-4": !open,
          },
        )}
      >
        <div className="w-4 h-4 overflow-hidden flex flex-col justify-center items-center">
          <div className="relative">
            <span
              className={classNames(
                "block w-4 h-1 bg-gray-100 transition-all ease-in-out duration-200",
                {
                  "-rotate-45": open,
                  "rotate-0": !open,
                },
              )}
            />
            <span
              className={classNames(
                "block w-4 h-1 bg-gray-100  absolute top-1/2 -translate-y-1/2 transition-all ease-in-out duration-200",
                {
                  "rotate-45": open,
                  "rotate-90": !open,
                },
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

FloatingActionButton.displayName = "Components:FloatingActionButton";

export default FloatingActionButton;
