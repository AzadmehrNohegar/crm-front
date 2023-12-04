import { getProductCategory } from "@/api/product";
import { Input } from "@/components/input";
import { Fragment, useState } from "react";
import { Filter2, Plus, Search } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { CategoriesTable } from "./partials/categoriesTable";
import { Checkbox } from "@/components/checkbox";
import { MobileCategoriesTable } from "./partials/mobileCategoriesTable";
import { FilterDialog } from "@/shared/filterDialog";

function ProductsCategoriesList() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const matches = useMediaQuery("(max-width: 1280px)");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories, isLoading } = useQuery(
    ["product-categories", debouncedSearch],
    () =>
      getProductCategory({
        params: {
          page_size: 20,
          ...(matches ? {} : { return_parents: true }),
          search: debouncedSearch,
        },
      })
  );

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-4 relative">
          <Input
            name="search"
            placeholder="جست و جو..."
            containerClassName="w-fit relative me-auto order-4 xl:order-none"
            className="input input-bordered w-96"
            block={false}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearch("")}
            iconEnd={
              <button
                type="button"
                className="absolute end-2 inset-y-auto btn btn-secondary btn-sm"
              >
                پیدا کن
                <Search />
              </button>
            }
          />
          <button
            className="btn btn-warning btn-square text-grey-800"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <Filter2 />
          </button>
          <Link to="./create" className="btn btn-secondary ms-auto xl:ms-0">
            <Plus />
            افزودن دسته‌بندی جدید
          </Link>
        </div>
        {matches ? (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full">
                  لیست دسته‌بندی محصولات
                </h3>
              </div>
              <MobileCategoriesTable
                categories={categories?.data.results}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">
                لیست دسته‌بندی محصولات
              </h3>
            </div>
            <CategoriesTable
              categories={categories?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <FilterDialog
        isOpen={isFilterDialogOpen}
        closeModal={() => setIsFilterDialogOpen(false)}
      >
        <div className="flex flex-wrap py-4 gap-4">
          <div className="flex items-center gap-x-4 flex-wrap xl:flex-nowrap gap-y-2">
            <span className="font-semibold basis-full xl:basis-auto">
              وضعیت:
            </span>
            <Checkbox
              label="فعال"
              containerClassName="w-fit"
              className="checkbox-accent"
              checked={searchParams.get("is_active") === "true"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("is_active", "true");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("is_active");
                  setSearchParams(searchParams);
                }
              }}
            />
            <Checkbox
              label="غیرفعال"
              containerClassName="w-fit"
              className="checkbox-accent"
              checked={searchParams.get("is_active") === "false"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("is_active", "false");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("is_active");
                  setSearchParams(searchParams);
                }
              }}
            />
          </div>
        </div>
      </FilterDialog>
    </Fragment>
  );
}

export default ProductsCategoriesList;
