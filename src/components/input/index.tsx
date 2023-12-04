import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef, useId } from "react";
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
      id,
      ...rest
    } = props;

    const inputId = useId();

    return (
      <div
        className={clsx(
          "flex items-start flex-col",
          block && " w-full",
          containerClassName
        )}
      >
        {label ? (
          <label htmlFor={id || inputId} className="label label-text">
            <span className="text-grey-500 text-xs">{label}</span>
          </label>
        ) : null}
        <div className={clsx("flex items-center relative", block && " w-full")}>
          <input
            id={id || inputId}
            ref={ref}
            className={clsx(
              className,
              "focus:outline-none transition-colors",
              error && "focus:bg-info-50 border-danger",
              !error && "focus:bg-info-50 focus:border-info"
            )}
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
