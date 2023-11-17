import { getTicketTickets } from "@/api/ticket";
import { Plus } from "@/assets/icons/Plus";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { Fragment, useState } from "react";
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
  const matches = useMediaQuery("(max-width: 1280px)");

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
          ...(searchParams.get("date")
            ? { date: searchParams.get("date") || "" }
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
        <Link to="./create" className="btn btn-secondary btn-block">
          <Plus />
          تیکت پشتیبانی جدید
        </Link>
      </div>
    );

  return (
    <Fragment>
      <div className="relative">
        <div className="flex items-center w-full gap-x-4 relative justify-between">
          <Input
            name="search"
            placeholder="جست و جو..."
            containerClassName="w-fit relative hidden xl:block me-auto"
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
                  label="جدید"
                  className="checkbox-accent"
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
                  className="checkbox-accent"
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
                  className="checkbox-accent"
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
          <Link to="./create" className="btn btn-secondary">
            <Plus />
            تیکت پشتیبانی جدید
          </Link>
        </div>
        {matches ? (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-grey-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full">سفارشات</h3>
              </div>
              <MobileTicketsTable
                tickets={ticketsPagination?.data.results}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">
                لیست تیکت پشتیبانی
              </h3>
            </div>
            <TicketsTable
              tickets={ticketsPagination?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
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
    </Fragment>
  );
}

export default SupportList;
