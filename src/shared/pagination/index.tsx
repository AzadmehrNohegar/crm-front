import { ArrowLeft } from "@/assets/icons/ArrowLeft";
import { ArrowRight } from "@/assets/icons/ArrowRight";
import { DoubleArrowLeft } from "@/assets/icons/DoubleArrowLeft";
import { DoubleArrowRight } from "@/assets/icons/DoubleArrowRight";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

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
  containerClassName,
}: IPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={clsx(
        "flex items-center p-4 bg-white z-30 flex-wrap xl:flex-nowrap",
        isFixed &&
          "w-full xl:w-container fixed bottom-12 xl:bottom-0 inset-x-0 xl:inset-x-auto",
        !isFixed && "absolute bottom-0 w-full",
        containerClassName
      )}
    >
      <div className="flex justify-center xl:justify-normal order-3 xl:order-none text-sm items-center gap-x-2 p-2 rounded-xl basis-full xl:basis-auto">
        <button
          type="button"
          className="btn btn-sm xl:btn-md btn-square btn-ghost"
          disabled
        >
          <DoubleArrowRight />
        </button>
        <button
          type="button"
          className="btn btn-sm xl:btn-md btn-square btn-ghost"
          disabled={!prev}
          onClick={() => setPage(page - 1)}
        >
          <ArrowRight />
        </button>
        {count &&
          new Array(Math.ceil(count / perPage)).fill(null).map((_, index) => (
            <button
              key={index}
              type="button"
              className={clsx(
                "btn btn-sm xl:btn-md btn-square rounded-xl",
                !(page === index + 1) && "btn-ghost",
                page === index + 1 && "bg-secondary-50 text-secondary"
              )}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        <button
          type="button"
          className="btn btn-sm xl:btn-md btn-square btn-ghost"
          disabled={!next}
          onClick={() => setPage(page + 1)}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="btn btn-sm xl:btn-md btn-square btn-ghost"
          disabled
        >
          <DoubleArrowLeft />
        </button>
      </div>
      <div className="flex order-2 xl:order-none items-center gap-x-2 me-0 xl:me-auto">
        <span className="inline-block min-w-max">برو به</span>
        <Input
          name="page"
          className="input input-bordered max-w-[50px] text-sm"
          value={searchParams.get("page") || ""}
          onChange={(e) => {
            if (e.target.value) {
              searchParams.set("page", e.target.value);
              setSearchParams(searchParams);
            } else {
              searchParams.set("page", "1");
              setSearchParams(searchParams);
            }
          }}
        />
      </div>
      <div className="me-auto xl:me-0 flex items-center gap-x-4 basis-modified xl:basis-auto">
        <Select
          options={isEven ? [9, 18, 27] : [10, 20, 100]}
          selected={perPage}
          setSelected={setPerPage}
          isBottom
        />
        <span className="text-grey-500 text-sm inline-block min-w-[50%] max-w-full xl:max-w-full">
          نمایش {(page - 1) * perPage + 1} تا {page * perPage} مورد از {count}{" "}
          نتیجه
        </span>
      </div>
    </div>
  );
}

export { Pagination };
