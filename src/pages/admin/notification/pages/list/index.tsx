import { Input } from "@/components/input";
import { Fragment, useState } from "react";
import { Filter2, Plus, Search } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { Popover, PopoverButton } from "@/components/popover";
import { Checkbox } from "@/components/checkbox";
import { getNotificationNotification } from "@/api/notification";
import { NotificationTable } from "./partials/notificationTable";
import { Pagination } from "@/shared/pagination";
import { DatePicker } from "@/components/datepicker";

function NotificationList() {
  const matches = useMediaQuery("(max-width: 1280px)");
  const { search: locationSearch } = useLocation();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: notifications, isLoading } = useQuery(
    ["notifications", debouncedSearch, locationSearch],
    () =>
      getNotificationNotification({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("date")
            ? { date: searchParams.get("date") || "" }
            : {}),
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("user_type")
            ? { user_type: searchParams.get("user_type") || "" }
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
                  label="همه"
                  containerClassName="w-fit"
                  className="checkbox-accent"
                  checked={searchParams.get("user_type") === "ALL"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("user_type", "ALL");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("is_active");
                      setSearchParams(searchParams);
                    }
                  }}
                />
                <Checkbox
                  label="حقیقی"
                  containerClassName="w-fit"
                  className="checkbox-accent"
                  checked={searchParams.get("user_type") === "REAL"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("user_type", "REAL");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("is_active");
                      setSearchParams(searchParams);
                    }
                  }}
                />
                <Checkbox
                  label="حقوقی"
                  containerClassName="w-fit"
                  className="checkbox-accent"
                  checked={searchParams.get("user_type") === "JURIDICAL"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("user_type", "JURIDICAL");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("is_active");
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
            افزودن پیام سیستم
          </Link>
        </div>
        {matches ? (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full py-5">
                  لیست پیام سیستم
                </h3>
              </div>
              {/* <MobileWalletTable
              wallet_transactions={walletTransactions?.data.results}
              isLoading={isLoading}
            /> */}
            </div>
          </div>
        ) : (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">
                لیست پیام سیستم
              </h3>
            </div>
            <NotificationTable
              notifications={notifications?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <Pagination
        count={notifications?.data.count}
        next={notifications?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={notifications?.data.prev}
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

export default NotificationList;
