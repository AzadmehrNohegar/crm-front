import { Input } from "@/components/input";
import { useState } from "react";
import { Search } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { Pagination } from "@/shared/pagination";
import { getOrderOrderList } from "@/api/order";
import { OrdersTable } from "./partials/ordersTable";
import { MobileOrdersTable } from "./partials/mobileOrdersTable";
import { getAccountAdminAccountById } from "@/api/account";

function CustomersDetailsOrdersTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

  const { account_id } = useParams();

  const { data: accountData } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
    }
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const matches = useMediaQuery("(max-width: 1280px)");

  const { data: ordersPagination, isLoading: isOrderPaginationLoading } =
    useQuery(
      [`orders-list-pagination-${account_id}`, debouncedSearch, locationSearch],
      () =>
        getOrderOrderList({
          params: {
            customer__id: accountData?.data.customer.id,
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
        }),
      {
        enabled: !!accountData,
      }
    );

  return (
    <div className="relative">
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
              isLoading={isOrderPaginationLoading}
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
              isLoading={isOrderPaginationLoading}
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

export { CustomersDetailsOrdersTab };
