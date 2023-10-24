import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  containerClassName?: string;
  label?: string;
  iconEnd?: React.ReactNode;
  block?: boolean;
}

const Input = forwardRef(
  (props: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      error,
      className,
      containerClassName,
      iconEnd,
      block = true,
      label,
      ...rest
    } = props;
    return (
      <div
        className={clsx(
          "flex items-start flex-col",
          block && " w-full",
          containerClassName
        )}
      >
        {label ? (
          <label className="label label-text">
            <span className="text-grey-500 text-xs">{label}</span>
          </label>
        ) : null}
        <div className={clsx("flex items-center relative", block && " w-full")}>
          <input
            ref={ref}
            className={clsx("h-10 sm:h-12", className)}
            {...rest}
          />
          {iconEnd ? iconEnd : null}
        </div>

        <Transition show={!!error}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <label className="label absolute">
              <span className="text-danger text-xs">{error?.message}</span>
            </label>
          </Transition.Child>
        </Transition>
      </div>
    );
  }
);

export { Input };
