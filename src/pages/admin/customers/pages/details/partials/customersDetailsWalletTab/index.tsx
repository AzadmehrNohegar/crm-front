import { getAccountAdminAccountById } from "@/api/account";
import { getPaymentWalletTransaction } from "@/api/payment";
import { Input } from "@/components/input";
import { useState } from "react";
import { Search, Wallet } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { MobileWalletTabTable } from "./partials/mobileWalletTabTable";
import { WalletTabTable } from "./partials/walletTabTable";
import { Pagination } from "@/shared/pagination";

function CustomersDetailsWalletTab() {
  const { account_id } = useParams();
  const { search: locationSearch } = useLocation();
  const matches = useMediaQuery("(max-width: 1280px)");

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: accountData, isLoading } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
    }
  );

  const { data: walletTransactions, isLoading: isWalletTransactionsLoading } =
    useQuery(
      ["wallet-transactions", debouncedSearch, locationSearch],
      () =>
        getPaymentWalletTransaction({
          params: {
            customer__id: accountData?.data.customer.id,
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
        enabled: !!accountData,
      }
    );

  return (
    <div className="flex flex-col gap-y-4 relative">
      <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-4 relative">
        <span className="text-sm basis-full xl:basis-auto inline-flex bg-secondary-100 items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 me-auto">
          <Wallet />
          موجودی کیف پول
          <span className="inline-flex items-center gap-x-2 ms-auto xl:ms-10">
            <strong className="text-grey-800">
              {isLoading ? (
                <Skeleton height={16} width={56} inline />
              ) : (
                Number(accountData?.data.customer?.wallet).toLocaleString()
              )}{" "}
            </strong>
            تومان
          </span>
        </span>
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
              <h3 className="text-sm xl:text-base w-full">سوابق کیف پول</h3>
            </div>
            <MobileWalletTabTable
              wallet_transactions={walletTransactions?.data.results}
              isLoading={isWalletTransactionsLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-36 xl:mb-24">
          <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
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
          <WalletTabTable
            wallet_transactions={walletTransactions?.data.results}
            isLoading={isWalletTransactionsLoading}
          />
        </div>
      )}
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
          searchParams.set("page", "1");
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}

export { CustomersDetailsWalletTab };
