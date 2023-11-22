import { Listbox, Transition } from "@headlessui/react";
import { listOption } from "@/model";
import { ChevronDown } from "react-iconly";
import { Fragment } from "react";
import clsx from "clsx";

interface IListProps {
  variant?: "primary" | "secondary";
  containerClassName?: string;
  options: listOption[];
  selected: listOption | null;
  setSelected: (option: listOption | null) => void;
  label?: string;
  bordered?: boolean;
}

function RadioSelect({
  containerClassName,
  options,
  selected,
  setSelected,
  label,
  variant = "primary",
  bordered = true,
}: IListProps) {
  return (
    <Listbox value={selected} by="id" onChange={setSelected}>
      <div
        className={clsx(
          "relative bg-white",
          !containerClassName && "max-w-[300px] min-w-[200px]",
          containerClassName
        )}
      >
        <Listbox.Label className="text-grey-500 text-xs">{label}</Listbox.Label>
        <Listbox.Button
          className={clsx(
            "relative w-full text-start cursor-default rounded-lg min-h-[46px] ps-4 pe-10 focus:outline-none focus:border-secondary-100 text-sm overflow-x-auto",
            bordered && "border border-grey-200 focus:border-secondary-100"
          )}
        >
          <span
            className={clsx(
              "inline-flex items-center gap-x-2 truncate",
              !selected && "text-grey-400"
            )}
          >
            {!selected ? "یک گزینه را انتخاب کنید." : null}
            {selected?.label}
          </span>
          <span className="pointer-events-none absolute inset-y-0 end-2 flex items-center pr-2 text-grey-600">
            <ChevronDown aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none">
            {options?.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative flex items-center gap-x-4 cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? variant === "secondary"
                        ? "bg-secondary-100 text-secondary-900"
                        : "bg-primary-100 text-primary-900"
                      : "text-grey-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <Fragment>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full border relative",
                        selected &&
                          variant === "secondary" &&
                          "border-secondary before:absolute before:w-[80%] before:h-[80%] before:inset-[10%] before:bg-secondary before:rounded-full",
                        selected &&
                          variant === "primary" &&
                          "border-primary before:absolute before:w-[80%] before:h-[80%] before:inset-[10%] before:bg-primary before:rounded-full",
                        !selected && "border-grey-200"
                      )}
                    />
                    <span
                      className={clsx(
                        selected && "font-semibold",
                        !selected && "font-base"
                      )}
                    >
                      {option.label}
                    </span>
                  </Fragment>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export { RadioSelect };
