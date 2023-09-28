# Simple Animated Accordion With TypeScript, React And Tailwind

Accordions are very useful when you want to toggle between hiding and showing a large amount of content.

Although, there are a bunch of libraries/frameworks that offer solutions out of the box, learning to create your own is a great way to learn various fundamentals about React such as creating components, compound component pattern, styling components and more.

Before we get started, I'm going to assume you already have a React project setup and are ready to start making components, I mean why else would you be reading right?!

Anyways, let's get started.

The structure of our component

- Accordion
  - Accordion Provider
    - Accordion Item
      - Accordion Trigger
      - Accordion Content

Start by creating a new Accordion folder inside your components folder. Then create an index.tsx file. We will be utilising this one file going forward.

## Accordion Provider

The Accordion Provider will be a wrapper component that handles toggling of Accordion Item components, and keeping track of which one is open.

For the Provider we will be making use of React Context for the state management, and toggling.

Firstly, we need to create the interface that represents the Context.

```javascript
interface IAccordionContext {
  currentValue: string;
  onToggle: (value: string) => void;
}
```

Now lets setup the Accordion Context.

```javascript
const AccordionContext =
  createContext <
  IAccordionContext >
  {
    currentValue: "",
    onToggle: (_value) => {},
  };
```

Now that we have a default Context setup, we need to create the Provider component.

Let's start by creating an interface for our new Provider.

```javascript
interface IAccordionProvider {
  children: React.ReactNode;
}
```

Now we have our interface setup, lets setup the Provider component.

```javascript
const AccordionProvider: React.FC<IAccordionProvider> = ({ children }) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  const onToggle = (value: string) => {
    currentValue === value ? setCurrentValue("") : setCurrentValue(value);
  }
}

AccordionProvider.displayName = "Components:Accordion:Provider";
```

That's our Provider component done!

We want an easy way to consume our Context in other components, so lets create a custom hook for this.

```javascript
const useAccordionContext = () => useContext(AccordionContext);
```

## Accordion Item

Now that we have our Provider component setup, we can move onto making our Accordion Item component. This is a wrapper component for the Accordion Trigger and Accordion Content.

_**Quick note**_

Before we get started on this component, the state that each Accordion Item can be in is either, "open" or "closed". We will be managing this state on each Accordion Item itself. In order to improve readability, we will track the state using a string instead of a boolean. Therefore, we will create the following type.

```javascript
type TToggleState = "open" | "closed";
```

Now that we have that out of the way, lets get started creating the Accordion Item component.

Firstly, let's create the interface for each Accordion Item.

```javascript
interface IAccordionItem {
  children: JSX.Element[];
  value: string;
  className?: string;
}
```

Why we use `JSX.Element` here for children instead of `React.ReactNode` will become apparent shortly.

Now the component itself.

```javascript
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
```

We will need to style the Accordion Trigger and the Accordion Content specifically based on whether the Accordion Item is in an "open" or "closed" state. Therefore, we need to pass the current `toggleState` of each specific Accordion Item to its children. As we won't be able to 'lift the state' in this scenario, we make use of the [Children.map](https://react.dev/reference/react/Children#children-map) and [cloneElement](https://react.dev/reference/react/cloneElement) to take the child passed in, clone it, append the extra state we need to pass.

## Accordion Trigger

With the Accordion Item setup, let's look at the Accordion Trigger. This is the component that will display to the user when the Accordion Item is in a "closed" state, and clicking it will trigger a toggle.

Firstly, as usual, let's create the required interface

```javascript
interface IAccordionTrigger {
  children: string;
  toggleState?: TToggleState;
  className?: string;
}
```

The children will be a string as in our case, as the Accordion Trigger will be a title for the Accordion Item.

We mark the `toggleState` here optional as when we use the component in our code, we don't want this something we have to handle, as the Accordion Item will do this.

```javascript
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
```

## Accordion Content

The Accordion Content should be pretty self explanatory, so let's jump straight in and create it.

As usual, let's first setup the interface.

```javascript
interface IAccordionContent {
  children?: React.ReactNode;
  toggleState?: TToggleState;
}
```

And then the component itself.

```javascript
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
```

**_Quick note_**

When using Accordion's you will notice that the have a smooth transition when they expand/collapse. In order to do this we need to animate the height property of the element.

You will see in the code that the initial height of the content is `0px`, and we have setup a transition if any properties change. In order to animate the height property usually you would have to know what this is going to be beforehand, but we can't in our case, as we don't know what content each Accordion Item will display.

This is where our element refs and `useEffect` come into play. What this is doing is, when the `toggleState` of our Accordion Item changes, it checks what the height of the content inside the `span` is, and sets the Accordion Content `div` to this height. Calculating the height of the content dynamically like this ensures that our transition effect works as intended.

## Accordion

Now we have all the components required for the Accordion setup, its time to make the overall component that we can use in our code.

As mentioned at the start of this write up, we will be making use of the Compound Component Pattern.

Huh? What does that mean?

Compound components are a pattern in which components are used together such that they share an implicit state that lets them communicate with each other in the background.

Therefore, rather treating each component as if its separate, such as.

```javascript
<Accordion>
  <AccordionItem>
    <AccodionTrigger>
      Trigger title
    </AccordionTrigger>
    <AccordionContent>
      Content
    <AccordionContent>
  </AccordionItem>
</Accordion>
```

We can setup them up so they are related to the component they belong too.

```javascript
<Accordion>
  <Accordion.Item>...</Accordion.Item>
</Accordion>
```

Firstly, we'll setup a couple of interfaces.

```
interface IAccordionComposition {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}
```

The first interface is how we go about achieving our Compound Component Pattern. We will be adding our Accordion related components we built earlier to the Accordion component itself. The second interface is the props of the Accordion component itself.

Now let's setup the component.

```
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
```

And we're done!

_An example of how to use our new Accordion Component_

```
<Accordion className="w-full">
    <Accordion.Item
      value="item1"
      className="border border-gray-300 rounded-lg w-full mb-2 p-4 cursor-pointer focus-within:ring-red-500 focus-within:ring-1 focus-within:ring-inset focus-within:border-red-500"
    >
      <Accordion.Trigger className="before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:w-full before:h-full">
        I'm the trigger
      </Accordion.Trigger>
      <Accordion.Content>
        I'm the content
      </Accordion.Content>
    </Accordion.Item>
</Accordion>
```

Full code:

```
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

```
