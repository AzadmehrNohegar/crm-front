import { getTicketTickets } from "@/api/ticket";
import { Plus } from "@/assets/icons/Plus";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { useState } from "react";
import { Filter2, Search } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { TicketsTable } from "./partials/ticketsTable";
import { Pagination } from "@/shared/pagination";
import { DatePicker } from "@/components/datepicker";

function SupportList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

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
        },
      })
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
      <div className="my-6">
        <div className="flex items-center bg-grey-50 rounded-t-custom justify-between px-4">
          <h3 className="text-base w-full">سوابق کیف پول</h3>
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
          <TicketsTable
            tickets={ticketsPagination?.data.results}
            isLoading={isLoading}
          />
        </div>
      </div>
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
