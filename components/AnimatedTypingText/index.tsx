"use client";

import { useEffect, useRef, useState } from "react";

const values: React.ReactNode[] = [
  <span
    key="JavaScript Developer"
    className="animate-typing block whitespace-nowrap overflow-hidden text-yellow-500"
  >
    JavaScript Developer
  </span>,

  <span
    key="TypeScript Developer"
    className="animate-typing block whitespace-nowrap overflow-hidden text-blue-500"
  >
    TypeScript Developer
  </span>,

  <span
    key="Fullstack Developer"
    className="animate-typing block whitespace-nowrap overflow-hidden text-green-500"
  >
    Fullstack Developer
  </span>,
];

const AnimatedTypingText: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<React.ReactNode>(values[0]);

  useEffect(() => {
    const interval = setTimeout(() => {
      const totalValues = values.length - 1;
      const currentIndex = values.indexOf(currentValue);

      if (currentIndex < totalValues) {
        setCurrentValue(values[currentIndex + 1]);
      } else {
        setCurrentValue(values[0]);
      }
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [currentValue]);

  return (
    <h1 className="capitalize font-bold text-2xl md:text-4xl">
      {currentValue}
    </h1>
  );
};

AnimatedTypingText.displayName = "Components:AnimatedTypingText";

export default AnimatedTypingText;
