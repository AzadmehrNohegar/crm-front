import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { ChevronDown } from "react-iconly";

interface ISelectProps {
  selected: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: (val: any) => void;
  options: string[] | number[];
  isBottom?: boolean;
  className?: string;
}

function Select({
  selected,
  setSelected,
  options,
  isBottom = false,
  className,
}: ISelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div
        className={clsx(
          "relative",
          !className && " max-w-[200px] min-w-[120px]",
          className
        )}
      >
        <Listbox.Button className="relative w-full text-start cursor-default rounded-lg border border-gray-200 py-3 ps-4 pe-10 focus:outline-none h-full min-h-[50px]">
          <span className="block truncate">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 end-1 flex items-center pr-2 text-grey-600">
            <ChevronDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx(
              "absolute mt-1 max-h-60 w-full z-30 overflow-auto rounded-md bg-grey-50 py-1 text-base shadow-lg focus:outline-none",
              isBottom && " bottom-full"
            )}
          >
            {options.map((option: string | number, optionIdx: number) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary-100 text-primary-900" : "text-grey-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export { Select };
