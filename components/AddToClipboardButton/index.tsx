"use client";

import { useState } from "react";

import ClipboardIcon from "@/components/Icons/Clipboard";
import AnimatedSpinnerIcon from "@/components/Icons/AnimatedSpinner";
import CheckmarkIcon from "@/components/Icons/Checkmark";
import ErrorIcon from "@/components/Icons/Error";

interface IProps {
  label: string;
  clipboardText: string;
}

type TStatus = "none" | "copying" | "error" | "succcess";

const renderIcon = (status: TStatus) => {
  switch (status) {
    case "copying":
      return (
        <AnimatedSpinnerIcon className="animate-spin h-5 w-5 text-white" />
      );
    case "succcess":
      return <CheckmarkIcon className="w-5 h-5 text-green-500" />;
    case "error":
      return <ErrorIcon className="w-5 h-5 text-red-500" />;
    case "none":
    default:
      return <ClipboardIcon className="w-5 h-5" />;
  }
};

const AddToClipboardButton: React.FC<IProps> = ({ label, clipboardText }) => {
  const [status, setStatus] = useState<TStatus>("none");

  const copyToClipboard = () => {
    setStatus("copying");

    navigator.clipboard
      .writeText(clipboardText)
      .then(() => {
        setStatus("succcess");
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setTimeout(() => {
          setStatus("none");
        }, 2000);
      });
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      aria-label={`${label} button`}
      className="border-2 border-gray-700 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg flex flex-row justify-around items-center focus:border-red-500 focus:outline-none"
    >
      <span className="mr-2">{label}</span>
      {renderIcon(status)}
    </button>
  );
};

AddToClipboardButton.displayName = "Components:AddToClipboardButton";

export default AddToClipboardButton;
