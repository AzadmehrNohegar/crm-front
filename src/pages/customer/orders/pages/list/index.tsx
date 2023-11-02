import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { Fragment, useState } from "react";
import { Filter2, Search, Upload } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { Pagination } from "@/shared/pagination";
import { DatePicker } from "@/components/datepicker";
import Skeleton from "react-loading-skeleton";
import { getOrderOrderList } from "@/api/order";
import { OrdersTable } from "./partials/ordersTable";

function OrdersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: ordersPagination, isLoading } = useQuery(
    ["orders-transactions", debouncedSearch, locationSearch],
    () =>
      getOrderOrderList({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("status")
            ? { status: searchParams.get("status") }
            : {}),
        },
      })
  );

  if (isLoading)
    return (
      <Fragment>
        <Skeleton height={48} />
        <Skeleton height={400} className="my-6" />
      </Fragment>
    );

  // if (!isLoading && ordersPagination?.data.results.length === 0)
  //   return (
  //     <div className="h-innerContainer flex flex-col items-center justify-center gap-y-4 max-w-3xl mx-auto">
  //       <img src="/images/orders-empty-1.png" alt="orders empty" />
  //       <span className="text-xl">هنوز سفارشی ثبت نشده است.</span>
  //     </div>
  //   );

  return (
    <div className="relative">
      <div className="flex items-center w-full gap-x-4 relative justify-between">
        <button className="btn btn-success btn-square">
          <Upload />
        </button>
        <Popover
          popoverBtn={
            <PopoverButton className="btn btn-warning btn-square text-grey-800">
              <Filter2 />
            </PopoverButton>
          }
          className="w-full top-full rounded-lg shadow-ev3 inset-x-0"
        >
          <div className="flex flex-wrap py-4 gap-x-4">
            <div className="flex flex-wrap items-start gap-x-2 gap-y-4 pe-4 border-e border-e-grey-200">
              <DatePicker
                range
                containerClassName="w-full min-w-[350px]"
                id="date"
                placeholder="تاریخ مورد نظر را انتخاب کنید."
              />
            </div>
            <div className="flex items-center gap-x-4">
              <Checkbox
                label="موفق"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "completed"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "completed");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  }
                }}
              />
              <Checkbox
                label="درحال بررسی"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "pending"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "pending");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  }
                }}
              />
              <Checkbox
                label="ناموفق"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "canceled"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "canceled");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  }
                }}
              />
            </div>
            <button
              className="btn text-primary btn-link decoration-transparent ms-auto"
              onClick={() => setSearchParams("")}
            >
              پاکسازی فیلتر
            </button>
          </div>
        </Popover>
      </div>
      <div className="my-6">
        <div className="flex items-center bg-grey-50 rounded-t-custom justify-between px-4">
          <h3 className="text-base w-full">سفارشات</h3>
          <Input
            className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
            containerClassName="my-4"
            placeholder="جست‌وجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconEnd={
              <button className="btn btn-secondary btn-square btn-sm absolute end-2 inset-y-auto">
                <Search />
              </button>
            }
          />
        </div>
        <div className="overflow-x-auto">
          <OrdersTable
            orders={ordersPagination?.data.results}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Pagination
        count={ordersPagination?.data.count}
        next={ordersPagination?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={ordersPagination?.data.prev}
        setPage={(val) => {
          searchParams.set("page", String(val));
          setSearchParams(searchParams);
        }}
        setPerPage={(val) => {
          searchParams.set("page_size", String(val));
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}

export default OrdersList;
