"use client";

import Accordion from "@/components/Accordion";

interface IAccordionData {
  trigger: string;
  content: React.ReactNode;
}

const DATA: IAccordionData[] = [
  {
    trigger: "API Development",
    content: (
      <span className="font-light">
        Digital bridges that allow your applications to seamlessly communicate,
        access data, and enhance functionality with other systems or services.
      </span>
    ),
  },
  {
    trigger: "Web App Development",
    content: (
      <span className="font-light">
        Web interfaces for online tools, services or platforms.
      </span>
    ),
  },
  {
    trigger: "Mobile App Development",
    content: (
      <span className="font-light">
        Cross platform mobile apps for online tools, services or platforms.
      </span>
    ),
  },
];

const HomePageAccordion: React.FC = () => {
  return (
    <Accordion className="w-full">
      {DATA.map(({ trigger, content }, index) => (
        <Accordion.Item
          key={index}
          value={index.toString()}
          className="border border-gray-300 rounded-lg w-full mb-2 p-4 cursor-pointer focus-within:ring-red-500 focus-within:ring-1 focus-within:ring-inset focus-within:border-red-500"
        >
          <Accordion.Trigger className="before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:w-full before:h-full">
            {trigger}
          </Accordion.Trigger>
          <Accordion.Content>{content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

HomePageAccordion.displayName = "Components:Accordion";

export default HomePageAccordion;
