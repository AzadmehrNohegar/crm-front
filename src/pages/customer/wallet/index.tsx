import { getPaymentWalletTransaction } from "@/api/payment";
import { Plus } from "@/assets/icons/Plus";
import { Checkbox } from "@/components/checkbox";
import { DatePicker } from "@/components/datepicker";
import { Input } from "@/components/input";
import { Pagination } from "@/shared/pagination";
import { Fragment, useState } from "react";
import { Filter2, Search, Wallet as WalletIcon } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { CreateWalletTransactionDialog } from "./partials/createWalletTransactionDialog";
import { getAccountMyProfile } from "@/api/account";
import { WalletTable } from "./partials/walletTable";
import Skeleton from "react-loading-skeleton";
import { MobileWalletTable } from "./partials/mobileWalletTable";
import { FilterDialog } from "@/shared/filterDialog";

function Wallet() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

  const matches = useMediaQuery("(max-width: 1280px)");

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const [
    isCreateWalletTransactionDialogOpen,
    setIsCreateWalletTransactionDialogOpen,
  ] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: walletTransactions, isLoading } = useQuery(
    ["wallet-transactions", debouncedSearch, locationSearch],
    () =>
      getPaymentWalletTransaction({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("date")
            ? { date: searchParams.get("date") || "" }
            : {}),
        },
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-4 relative">
          <span className="text-sm basis-full xl:basis-auto inline-flex bg-secondary-100 items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 me-auto">
            <WalletIcon />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto xl:ms-10">
              <strong className="text-grey-800">
                {isUserProfileLoading ? (
                  <Skeleton height={16} width={56} inline />
                ) : (
                  Number(userProfile?.data.customer?.wallet).toLocaleString()
                )}{" "}
              </strong>
              تومان
            </span>
          </span>
          <button
            className="btn btn-warning btn-square text-grey-800"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <Filter2 />
          </button>

          <button
            className="ms-auto xl:ms-0 btn btn-primary"
            onClick={() => setIsCreateWalletTransactionDialogOpen(true)}
          >
            <Plus />
            افزایش موجودی
          </button>
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
              <div className="flex items-center bg-grey-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full">سوابق کیف پول</h3>
              </div>
              <MobileWalletTable
                wallet_transactions={walletTransactions?.data.results}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 mb-36 xl:mb-24">
            <div className="flex items-center bg-grey-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full">سوابق کیف پول</h3>
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
            <WalletTable
              wallet_transactions={walletTransactions?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <Pagination
        count={walletTransactions?.data.count}
        next={walletTransactions?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={walletTransactions?.data.previous}
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
      <CreateWalletTransactionDialog
        isOpen={isCreateWalletTransactionDialogOpen}
        closeModal={() => setIsCreateWalletTransactionDialogOpen(false)}
        customer={userProfile?.data.customer?.id}
      />
      <FilterDialog
        isOpen={isFilterDialogOpen}
        closeModal={() => setIsFilterDialogOpen(false)}
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
              containerClassName="w-fit"
              checked={searchParams.get("status") === "success"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("status", "success");
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
              checked={searchParams.get("status") === "failed"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("status", "failed");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("status");
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

export default Wallet;
