import { getAccountAdminAccount } from "@/api/account";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { CustomersTable } from "./partials/customersTable";
import { Pagination } from "@/shared/pagination";
import { Checkbox } from "@/components/checkbox";
import { Filter2, Search } from "react-iconly";
import { Input } from "@/components/input";
import { Plus } from "@/assets/icons/Plus";
import { MobileCustomersTable } from "./partials/mobileCustomersTable";
import { FilterDialog } from "@/shared/filterDialog";

function CustomersList() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const matches = useMediaQuery("(max-width: 1280px)");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { search: locationSearch } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: accountPagination, isLoading } = useQuery(
    ["account-pagination", debouncedSearch, locationSearch],
    () =>
      getAccountAdminAccount({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("is_verified")
            ? { ordering: searchParams.get("is_verified") || "" }
            : {}),
          ...(searchParams.get("account__contract_type")
            ? {
                account__contract_type:
                  searchParams.get("account__contract_type") || "",
              }
            : {}),
        },
      }),
    {
      keepPreviousData: true,
    }
  );
  return (
    <Fragment>
      <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-4 relative justify-between">
        <Input
          name="search"
          placeholder="جست و جو..."
          containerClassName="w-fit relative order-4 xl:order-none me-auto"
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

        <Link to="create" className="btn btn-secondary ms-auto xl:ms-0">
          <Plus />
          افزودن کاربر جدید
        </Link>
      </div>
      <div className="mt-6 mb-36 xl:mb-24 text-start relative border rounded-custom xl:border-none">
        <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between">
          <h3 className="text-sm xl:text-base w-full p-5">لیست کاربران</h3>
        </div>
        {matches ? (
          <MobileCustomersTable
            accounts={accountPagination?.data.results}
            isLoading={isLoading}
          />
        ) : (
          <CustomersTable
            accounts={accountPagination?.data.results}
            isLoading={isLoading}
          />
        )}
        <Pagination
          count={accountPagination?.data.count}
          next={accountPagination?.data.next}
          page={+searchParams.get("page")! || 1}
          perPage={+searchParams.get("page_size")! || 10}
          prev={accountPagination?.data.previous}
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
      </div>
      <FilterDialog
        isOpen={isFilterDialogOpen}
        closeModal={() => setIsFilterDialogOpen(false)}
      >
        <div className="flex flex-wrap py-4 gap-4">
          <div className="flex items-center gap-x-4 flex-wrap xl:flex-nowrap gap-y-2">
            <span className="font-semibold basis-full xl:basis-auto">
              نوع کاربر:
            </span>
            <Checkbox
              label="حقیقی"
              className="checkbox-accent"
              containerClassName="w-fit"
              checked={searchParams.get("account__contract_type") === "REAL"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("account__contract_type", "REAL");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("account__contract_type");
                  setSearchParams(searchParams);
                }
              }}
            />
            <Checkbox
              label="حقوقی"
              className="checkbox-accent"
              containerClassName="w-fit"
              checked={
                searchParams.get("account__contract_type") === "JURIDICAL"
              }
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("account__contract_type", "JURIDICAL");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("account__contract_type");
                  setSearchParams(searchParams);
                }
              }}
            />
          </div>
          <div className="flex items-center gap-x-4 flex-wrap xl:flex-nowrap gap-y-2">
            <span className="font-semibold basis-full xl:basis-auto">
              وضعیت:
            </span>
            <Checkbox
              label="تایید شده"
              className="checkbox-accent"
              containerClassName="w-fit"
              checked={searchParams.get("is_verified") === "true"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("is_verified", "true");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("is_verified");
                  setSearchParams(searchParams);
                }
              }}
            />
            <Checkbox
              label="در انتظار تایید"
              className="checkbox-accent"
              containerClassName="w-fit"
              checked={searchParams.get("is_verified") === "false"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("is_verified", "false");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("is_verified");
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

export default CustomersList;
