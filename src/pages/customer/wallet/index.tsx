import { getPaymentWalletTransaction } from "@/api/payment";
import { Plus } from "@/assets/icons/Plus";
import { Checkbox } from "@/components/checkbox";
import { DatePicker } from "@/components/datepicker";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { Pagination } from "@/shared/pagination";
import { Fragment, useState } from "react";
import { Filter2, Search, Wallet as WalletIcon } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { CreateWalletTransactionDialog } from "./partials/createWalletTransactionDialog";
import { getAccountMyProfile } from "@/api/account";
import { WalletTable } from "./partials/walletTable";
import Skeleton from "react-loading-skeleton";

function Wallet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

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
          ...(searchParams.get("created_date")
            ? { created_date: searchParams.get("created_date") || "" }
            : {}),
        },
      })
  );

  return (
    <Fragment>
      <div className="relative">
        <div className="flex items-center w-full gap-x-4 relative">
          <span className="text-sm inline-flex bg-secondary-100 items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 me-auto">
            <WalletIcon />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto sm:ms-10">
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
                  value={searchParams.get("created_date") || ""}
                  onChange={(val) => {
                    searchParams.set(
                      "created_date",
                      new Date((val?.valueOf() as number) || "").toISOString()
                    );
                    setSearchParams(searchParams);
                  }}
                  containerClassName="w-full min-w-[350px]"
                  id="date"
                  placeholder="تاریخ مورد نظر را انتخاب کنید."
                />
              </div>
              <div className="flex items-center gap-x-4">
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
              <button
                className="btn text-primary btn-link decoration-transparent ms-auto"
                onClick={() => setSearchParams("")}
              >
                پاکسازی فیلتر
              </button>
            </div>
          </Popover>
          <button
            className="btn btn-primary"
            onClick={() => setIsCreateWalletTransactionDialogOpen(true)}
          >
            <Plus />
            افزایش موجودی
          </button>
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
          <WalletTable
            wallet_transactions={walletTransactions?.data.results}
            isLoading={isLoading}
          />
        </div>
        <Pagination
          count={walletTransactions?.data.count}
          next={walletTransactions?.data.next}
          page={+searchParams.get("page")! || 1}
          perPage={+searchParams.get("page_size")! || 10}
          prev={walletTransactions?.data.prev}
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
      <CreateWalletTransactionDialog
        isOpen={isCreateWalletTransactionDialogOpen}
        closeModal={() => setIsCreateWalletTransactionDialogOpen(false)}
        customer={userProfile?.data.customer?.id}
      />
    </Fragment>
  );
}

export default Wallet;
