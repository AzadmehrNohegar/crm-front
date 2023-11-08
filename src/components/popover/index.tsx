import React, { ForwardedRef, Fragment, forwardRef } from "react";
import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import clsx from "clsx";

interface IPopoverProps {
  className?: string;
  popoverBtn: React.ReactElement;
  popoverClassName?: string;
  children?: React.ReactNode;
  orientation?: "left" | "right";
}

export const PopoverButton = forwardRef(
  (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <HeadlessPopover.Button as="button" ref={ref} {...props}>
      {props.children}
    </HeadlessPopover.Button>
  )
);

function Popover({
  className,
  children,
  popoverBtn,
  popoverClassName,
  orientation = "left",
}: IPopoverProps) {
  return (
    <HeadlessPopover className={clsx(popoverClassName)}>
      {popoverBtn}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HeadlessPopover.Panel
          className={clsx(
            className,
            "absolute z-40 mt-3 transform px-4 bg-white shadow-hue",
            orientation === "left" && "left-0 sm:left-6 origin-top-left",
            orientation === "right" && "right-0 sm:right-6 origin-top-right"
          )}
        >
          {children}
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  );
}

export { Popover };
