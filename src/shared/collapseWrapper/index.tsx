import { Minus } from "@/assets/icons/Minus";
import { Plus } from "@/assets/icons/Plus";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

interface ICollapseWrapperProps {
  title: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

function CollapseWrapper({
  title,
  containerClassName,
  className,
  children,
}: ICollapseWrapperProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={containerClassName}>
      <button
        type="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="text-sm border border-grey-200 relative start-4 flex items-center gap-x-2 px-4 py-3 rounded-lg bg-white z-10 my-4 w-fit"
      >
        {isOpen && <Minus />}
        {!isOpen && <Plus />}
        <span>{title}</span>
      </button>
      <Transition show={isOpen}>
        <div
          className={clsx(
            "border-grey-200 rounded-[20px] border pt-10 px-4 pb-4 relative -top-10",
            className
          )}
        >
          {children}
        </div>
      </Transition>
    </div>
  );
}

export { CollapseWrapper };
