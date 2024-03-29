import {
  useState,
  createContext,
  useContext,
  Fragment,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  ButtonHTMLAttributes,
} from "react";
import { InertiaLinkProps } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import BetterLink from "./Buttons/BetterLink";

const DropDownContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }: PropsWithChildren) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <button
        className="div-style"
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      >
        {children}
      </button>

      {open && (
        <div
          role="button"
          className="div-style fixed inset-0 z-40 h-[100vh] w-full cursor-default"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  children,
}: PropsWithChildren<{
  align?: "left" | "right";
  width?: "48";
  contentClasses?: string;
}>) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          role="button"
          className={`div-style absolute z-50 mt-2 cursor-default rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div
            className={
              `rounded-md ring-1 ring-blue-600 ring-opacity-5 ` + contentClasses
            }
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({
  className = "",
  children,
  ...props
}: InertiaLinkProps) => {
  return (
    <BetterLink
      {...props}
      className={
        "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white " +
        (props?.disabled === true ? "cursor-not-allowed opacity-50  " : "") +
        className
      }
    >
      {children}
    </BetterLink>
  );
};

const DropdownButton = ({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white " +
        className
      }
    >
      {children}
    </button>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;
export default Dropdown;
