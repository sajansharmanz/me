"use client";

import { useRouter } from "next/navigation";

import ArrowBackIcon from "@/components/Icons/ArrowBack";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="back button"
      onClick={() => router.back()}
      className="bg-gray-700 text-gray-100 p-2 mb-4 rounded-full"
    >
      <ArrowBackIcon className="text-gray-100 w-4 h-4" />
    </button>
  );
};

BackButton.displayName = "Components:BackButton";

export default BackButton;
