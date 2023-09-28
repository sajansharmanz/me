import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Accordion Context
interface IAccordionContext {
  currentValue: string;
  onToggle: (value: string) => void;
}

const AccordionContext = createContext<IAccordionContext>({
  currentValue: "",
  onToggle: (_value) => {},
});

interface IAccordionProvider {
  children: React.ReactNode;
}

const AccordionProvider: React.FC<IAccordionProvider> = ({ children }) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  const onToggle = (value: string) => {
    currentValue === value ? setCurrentValue("") : setCurrentValue(value);
  };

  return (
    <AccordionContext.Provider value={{ currentValue, onToggle }}>
      {children}
    </AccordionContext.Provider>
  );
};

AccordionProvider.displayName = "Components:Accordion:Provider";

const useAccordionContext = () => useContext(AccordionContext);

type TToggleState = "open" | "closed";

// Accordion Item
interface IAccordionItem {
  children: JSX.Element[];
  value: string;
  className?: string;
}

const AccordionItem: React.FC<IAccordionItem> = ({
  children,
  value,
  className,
}) => {
  const { onToggle, currentValue } = useAccordionContext();
  const toggleState: TToggleState = currentValue === value ? "open" : "closed";

  return (
    <div
      onClick={() => onToggle(value)}
      data-state={toggleState}
      className={`relative ${className}`}
    >
      {Children.map(children, (child) => cloneElement(child, { toggleState }))}
    </div>
  );
};

AccordionItem.displayName = "Components:Accordion:Item";

// Accordion Trigger
interface IAccordionTrigger {
  children: string;
  toggleState?: TToggleState;
  className?: string;
}

const AccordionTrigger: React.FC<IAccordionTrigger> = ({
  children,
  toggleState,
  className,
}) => {
  return (
    <button
      type="button"
      className={`w-full flex flex-row justify-between items-center focus:outline-none ${
        className ?? ""
      }`}
      data-state={toggleState}
    >
      <span className="hover:underline">{children}</span>
      <span>{toggleState === "open" ? "-" : "+"}</span>
    </button>
  );
};

AccordionTrigger.displayName = "Components:Accordion:Trigger";

// Accordion Content
interface IAccordionContent {
  children?: React.ReactNode;
  toggleState?: TToggleState;
}

const AccordionContent: React.FC<IAccordionContent> = ({
  children,
  toggleState,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && spanRef.current) {
      if (toggleState === "open") {
        containerRef.current.style.height = `${spanRef.current
          .getBoundingClientRect()
          .height.toString()}px`;
      } else {
        containerRef.current.style.height = "0px";
      }
    }
  }, [toggleState]);

  return (
    <div
      ref={containerRef}
      data-state={toggleState}
      className="w-full h-0 transition-all duration-300 ease-in-out overflow-hidden"
    >
      <span ref={spanRef}>{children}</span>
    </div>
  );
};

AccordionContent.displayName = "Components:Accordion:Content";

// Accordion
interface IAccordionComposition {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

const Accordion: React.FC<AccordionProps> & IAccordionComposition = ({
  children,
  className,
}) => {
  return (
    <AccordionProvider>
      <div className={className ?? ""}>{children}</div>
    </AccordionProvider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

Accordion.displayName = "Components:Accordion";
export default Accordion;
