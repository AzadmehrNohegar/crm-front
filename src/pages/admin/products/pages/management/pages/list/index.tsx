import { getProductCategory, getProductProduct } from "@/api/product";
import { Input } from "@/components/input";
import { Fragment, useState } from "react";
import { Filter2, Plus, Search } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { Popover, PopoverButton } from "@/components/popover";
import { Pagination } from "@/shared/pagination";
import { RadioSelect } from "@/components/radioSelect";
import { category } from "@/model";
import { ManagementTable } from "./partials/managementTable";
import { ManagementSelectTypeDialog } from "./partials/managementSelectTypeDialog";
import { MobileManagementTable } from "./partials/mobileManagementTable";

function ProductsManagementList() {
  const matches = useMediaQuery("(max-width: 1280px)");

  const [
    isManagemenetSelectTypeDialogOpen,
    setIsManagemenetSelectTypeDialogOpen,
  ] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { search: locationSearch } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories } = useQuery("product-categories", () =>
    getProductCategory({
      params: {
        page_size: 20,
      },
    })
  );

  const { data: productsPagination, isLoading } = useQuery(
    ["product-pagination", debouncedSearch, locationSearch],
    () =>
      getProductProduct({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("category__id")
            ? {
                category__id: searchParams.get("category__id") || "",
              }
            : {}),
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
            containerClassName="w-fit relative me-auto order-3 xl:order-none"
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
          <Popover
            popoverBtn={
              <PopoverButton className="btn btn-warning btn-square text-grey-800">
                <Filter2 />
              </PopoverButton>
            }
            className="w-full top-full rounded-lg shadow-ev3 inset-x-0"
          >
            <div className="flex flex-wrap py-4 gap-4">
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={categories?.data.results.map((item: category) => ({
                  id: item.id,
                  label: item.name,
                }))}
                selected={{
                  id: searchParams.get("category__id") || "",
                  label:
                    searchParams.get("category__slug") ||
                    "یک دسته‌بندی را انتخاب کنید",
                }}
                setSelected={(option) => {
                  searchParams.set("category__id", option?.id as string);
                  searchParams.set("category__slug", option?.label as string);
                  setSearchParams(searchParams);
                }}
              />
              <button
                className="btn text-primary btn-link decoration-transparent ms-auto"
                onClick={() => setSearchParams("")}
              >
                پاکسازی فیلتر
              </button>
            </div>
          </Popover>
          <button
            onClick={() => setIsManagemenetSelectTypeDialogOpen(true)}
            className="btn btn-secondary ms-auto xl:ms-0"
          >
            <Plus />
            افزودن محصول جدید
          </button>
        </div>
        {matches ? (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full">لیست محصولات</h3>
              </div>
              <MobileManagementTable
                products={productsPagination?.data.results}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">لیست محصولات</h3>
            </div>
            <ManagementTable
              products={productsPagination?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <Pagination
        count={productsPagination?.data.count}
        next={productsPagination?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={productsPagination?.data.prev}
        setPage={(val) => {
          searchParams.set("page", String(val));
          setSearchParams(searchParams);
        }}
        setPerPage={(val) => {
          searchParams.set("page_size", String(val));
          searchParams.set("page", "1");
          setSearchParams(searchParams);
        }}
      />
      <ManagementSelectTypeDialog
        isOpen={isManagemenetSelectTypeDialogOpen}
        closeModal={() => setIsManagemenetSelectTypeDialogOpen(false)}
      />
    </Fragment>
  );
}

export default ProductsManagementList;
