import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { useState } from "react";
import { Filter2, Search, Upload } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { Pagination } from "@/shared/pagination";
import { DatePicker } from "@/components/datepicker";
import { getOrderOrderList } from "@/api/order";
import { OrdersTable } from "./partials/ordersTable";
import { MobileOrdersTable } from "./partials/mobileOrdersTable";
import { Plus } from "@/assets/icons/Plus";

function OrdersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const matches = useMediaQuery("(max-width: 1280px)");

  const { data: ordersPagination, isLoading } = useQuery(
    ["orders-list-pagination", debouncedSearch, locationSearch],
    () =>
      getOrderOrderList({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("status")
            ? { status: searchParams.get("status") }
            : {}),
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("date")
            ? {
                date: searchParams.get("date") || "",
              }
            : {}),
        },
      })
  );

  return (
    <div className="relative">
      <div className="flex items-center w-full gap-x-4 relative">
        <button className="btn btn-success btn-square me-auto">
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
          <div className="flex flex-wrap py-4 gap-4">
            <div className="flex flex-wrap items-start gap-x-2 gap-y-4 pe-4 border-e border-e-grey-200">
              <DatePicker
                value={new Date(searchParams.get("date") || "")}
                onChange={(val) => {
                  searchParams.set(
                    "date",
                    new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      calendar: "gregory",
                      numberingSystem: "latn",
                    })
                      .format(new Date((val?.valueOf() as number) || ""))
                      .replace(/\//g, "-")
                  );
                  setSearchParams(searchParams);
                }}
                containerClassName="w-full min-w-[350px]"
                id="date"
                placeholder="تاریخ مورد نظر را انتخاب کنید."
              />
            </div>
            <div className="flex items-center gap-x-4 flex-wrap xl:flex-nowrap gap-y-2">
              <span className="font-semibold basis-full xl:basis-auto">
                وضعیت:
              </span>
              <Checkbox
                label="موفق"
                className="checkbox-accent"
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
                className="checkbox-accent"
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
                label="نیاز به پرداخت"
                className="checkbox-accent"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "need_payment"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "need_payment");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  }
                }}
              />
              <Checkbox
                label="ناموفق"
                className="checkbox-accent"
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
        <Link to="create" className="btn btn-secondary">
          <Plus />
          ایجاد سفارش جدید
        </Link>
      </div>
      {matches ? (
        <div className="mt-6 mb-36 xl:mb-24">
          <Input
            className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
            containerClassName="my-4"
            placeholder="جست‌وجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconEnd={
              <button className="btn btn-secondary btn-square btn-sm absolute end-1 inset-y-auto">
                <Search size="small" />
              </button>
            }
          />
          <div className="rounded-custom border border-grey-200">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full">سفارشات</h3>
            </div>
            <MobileOrdersTable
              orders={ordersPagination?.data.results}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-36 xl:mb-24">
          <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between px-4">
            <h3 className="text-base w-full">سفارشات</h3>
            <Input
              className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
              containerClassName="my-4"
              placeholder="جست‌وجو"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              iconEnd={
                <button className="btn btn-secondary btn-square btn-sm absolute end-1 inset-y-auto">
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
      )}

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
          searchParams.set("page", "1");
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}

export default OrdersList;
