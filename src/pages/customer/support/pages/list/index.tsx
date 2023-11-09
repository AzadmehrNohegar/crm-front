import { getTicketTickets } from "@/api/ticket";
import { Plus } from "@/assets/icons/Plus";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { useState } from "react";
import { Filter2, Search } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { TicketsTable } from "./partials/ticketsTable";
import { Pagination } from "@/shared/pagination";
import { DatePicker } from "@/components/datepicker";
import { MobileTicketsTable } from "./partials/mobileTicketsTable";

function SupportList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();
  const matches = useMediaQuery("(max-width: 768px)");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: ticketsPagination, isLoading } = useQuery(
    ["tickets-transactions", debouncedSearch, locationSearch],
    () =>
      getTicketTickets({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("status")
            ? { status: searchParams.get("status") || "" }
            : {}),
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("created_at")
            ? { created_at: searchParams.get("created_at") || "" }
            : {}),
        },
      })
  );

  if (
    !isLoading &&
    ticketsPagination?.data.results.length === 0 &&
    searchParams.toString() === ""
  )
    return (
      <div className="h-innerContainer flex flex-col items-center justify-center gap-y-4 max-w-3xl mx-auto">
        <img src="/images/support-empty-1.png" alt="support empty" />
        <span className="text-xl">هنوز تیکت پشتیبانی‌ای ثبت نشده است.</span>
        <Link to="./create" className="btn btn-primary btn-block">
          <Plus />
          تیکت پشتیبانی جدید
        </Link>
      </div>
    );

  return (
    <div className="relative">
      <div className="flex items-center w-full gap-x-4 relative justify-between">
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
                value={searchParams.get("created_at") || ""}
                onChange={(val) => {
                  searchParams.set(
                    "created_at",
                    new Date((val?.valueOf() as number) || "").toISOString()
                  );
                  setSearchParams(searchParams);
                }}
                containerClassName="w-full min-w-[350px]"
                id="date"
                placeholder="تاریخ مورد نظر را انتخاب کنید."
              />
            </div>
            <div className="flex items-center gap-x-4 flex-wrap sm:flex-nowrap gap-y-2">
              <span className="font-semibold basis-full sm:basis-auto">
                وضعیت:
              </span>
              <Checkbox
                label="جدید"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "new"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "new");
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
                checked={searchParams.get("status") === "processing"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "processing");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  }
                }}
              />
              <Checkbox
                label="بسته شده"
                containerClassName="w-fit"
                checked={searchParams.get("status") === "closed"}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    searchParams.set("status", "closed");
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
        <Link to="./create" className="btn btn-primary">
          <Plus />
          تیکت پشتیبانی جدید
        </Link>
      </div>
      {matches ? (
        <div className="mt-6 mb-36">
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
            <div className="flex items-center bg-grey-50 rounded-t-custom justify-between p-4 sm:py-0">
              <h3 className="text-sm sm:text-base w-full">سفارشات</h3>
            </div>
            <MobileTicketsTable
              tickets={ticketsPagination?.data.results}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-36">
          <div className="flex items-center bg-grey-50 rounded-t-custom justify-between px-4">
            <h3 className="text-base w-full">لیست تیکت پشتیبانی</h3>
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
          <TicketsTable
            tickets={ticketsPagination?.data.results}
            isLoading={isLoading}
          />
        </div>
      )}
      <Pagination
        count={ticketsPagination?.data.count}
        next={ticketsPagination?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={ticketsPagination?.data.prev}
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

export default SupportList;
