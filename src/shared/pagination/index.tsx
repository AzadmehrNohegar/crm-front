import { ArrowLeft } from "@/assets/icons/ArrowLeft";
import { ArrowRight } from "@/assets/icons/ArrowRight";
import { DoubleArrowLeft } from "@/assets/icons/DoubleArrowLeft";
import { DoubleArrowRight } from "@/assets/icons/DoubleArrowRight";
import { Select } from "@/components/select";
import clsx from "clsx";

interface IPaginationProps {
  page: number;
  perPage: number;
  count: number;
  setPage: (val: number) => void;
  setPerPage: (val: number) => void;
  next: string | null;
  prev: string | null;
  isFixed?: boolean;
  containerClassName?: string;
  isEven?: boolean;
}

function Pagination({
  count,
  next,
  page,
  perPage,
  prev,
  setPage,
  setPerPage,
  isFixed = true,
  isEven = false,
}: IPaginationProps) {
  return (
    <div
      className={clsx(
        "flex items-center py-4 bg-white z-30",
        isFixed && "w-container fixed bottom-0",
        !isFixed && "absolute bottom-0 w-full"
      )}
    >
      <div className="flex text-sm items-center gap-x-2 p-2 rounded-xl">
        <button className="btn btn-md btn-square btn-ghost" disabled>
          <DoubleArrowRight />
        </button>
        <button
          className="btn btn-md btn-square btn-ghost"
          disabled={!prev}
          onClick={() => setPage(page - 1)}
        >
          <ArrowRight />
        </button>
        {count &&
          new Array(Math.ceil(count / perPage)).fill(null).map((_, index) => (
            <button
              key={index}
              className={clsx(
                "btn btn-md btn-square rounded-xl",
                !(page === index + 1) && "btn-ghost",
                page === index + 1 && "bg-secondary-50 text-secondary"
              )}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        <button
          className="btn btn-md btn-square btn-ghost"
          disabled={!next}
          onClick={() => setPage(page + 1)}
        >
          <ArrowLeft />
        </button>
        <button className="btn btn-md btn-square btn-ghost" disabled>
          <DoubleArrowLeft />
        </button>
      </div>
      <div className="ms-auto flex items-center gap-x-4">
        <Select
          options={isEven ? [9, 18, 27] : [10, 20, 100]}
          selected={perPage}
          setSelected={setPerPage}
          isBottom
        />
        <span className="text-grey-500 text-sm">
          نمایش {(page - 1) * perPage + 1} تا {page * perPage} مورد از {count}{" "}
          نتیجه
        </span>
      </div>
    </div>
  );
}

export { Pagination };
