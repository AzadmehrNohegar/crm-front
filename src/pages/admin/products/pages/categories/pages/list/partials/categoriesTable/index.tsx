import { IS_ACTIVE, category } from "@/model";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { ChevronLeft, Delete, Edit, Swap } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { Link, useSearchParams } from "react-router-dom";
import { CategoriesDeleteDialog } from "../categoriesDeleteDialog";

interface ICategoriesTableProps {
  categories?: category[];
  isLoading: boolean;
}

function CategoriesTableRow({
  index,
  depth = 0,
  ...rest
}: category & { index: number; depth: number }) {
  const { id, is_active, name, categories } = rest;

  const [searchParams] = useSearchParams();

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isCategoriesDeleteDialogOpen, setIsCategoriesDeleteDialogOpen] =
    useState(false);

  return (
    <Fragment>
      <tr
        className={clsx(
          "text-sm transition-colors",
          categories && "cursor-pointer hover:bg-grey-50"
        )}
        onClick={() => {
          if (categories) setIsCollapseOpen((prevState) => !prevState);
        }}
      >
        <td>
          {((+searchParams.get("page")! || 1) - 1) *
            (+searchParams.get("page_size")! || 10) +
            index +
            1}
        </td>
        <td
          className={clsx(
            "w-full",
            depth === 0 && "font-semibold",
            depth > 0 && "text-grey-600"
          )}
        >
          <span className="inline-flex items-center gap-x-2">
            {[...Array(depth)].map((_item, _i) => (
              <span key={_i} className="inline-block w-10"></span>
            ))}
            {categories ? (
              <span
                className={clsx(
                  "relative top-[2px]",
                  isCollapseOpen && "-rotate-90"
                )}
              >
                <ChevronLeft />
              </span>
            ) : null}
            <span>{name}</span>
          </span>
        </td>
        <td>
          <span
            className={clsx(
              "badge",
              is_active && "bg-success-50 text-success-700",
              !is_active && "bg-grey-200 text-grey-400"
            )}
          >
            {IS_ACTIVE[`${is_active}`]}
          </span>
        </td>
        <td>
          <span className="flex items-center gap-x-4">
            <Link
              to={`./${id}`}
              className="btn btn-square btn-sm btn-ghost btn-link decoration-transparent text-grey-800"
            >
              <Edit />
            </Link>
            <button
              className="btn btn-square btn-sm btn-ghost btn-link decoration-transparent text-danger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsCategoriesDeleteDialogOpen(true);
              }}
            >
              <Delete />
            </button>
            <CategoriesDeleteDialog
              isOpen={isCategoriesDeleteDialogOpen}
              closeModal={() => setIsCategoriesDeleteDialogOpen(false)}
              category={rest}
            />
          </span>
        </td>
      </tr>
      {isCollapseOpen
        ? categories?.map((item, _index: number) => (
            <CategoriesTableRow
              depth={depth + 1}
              key={item.id}
              index={_index}
              {...item}
            />
          ))
        : null}
    </Fragment>
  );
}

function CategoriesTable({ isLoading, categories }: ICategoriesTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(categories);
  const handleSort = (val: string) => {
    if (searchParams.get("ordering") === val) {
      searchParams.set("ordering", `-${val}`);
      setSearchParams(searchParams);
    } else {
      searchParams.set("ordering", val);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-auto text-start">
        <thead className="bg-secondary-50">
          <tr>
            <th align="right">
              <span className="text-2xl font-light">#</span>
            </th>
            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                عنوان دسته‌بندی
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="id"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>

            <th align="right">
              <span className="inline-flex items-center text-sm text-grey-800">
                وضعیت
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  value="status"
                  onClick={(e) => handleSort(e.currentTarget.value)}
                >
                  <Swap />
                </button>
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          ) : null}
          {categories?.map((item, index: number) => (
            <CategoriesTableRow
              depth={0}
              key={item.id}
              index={index}
              {...item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { CategoriesTable };
